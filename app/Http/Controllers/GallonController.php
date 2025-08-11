<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GallonController extends Controller
{
    /**
     * Display the gallon scan interface.
     */
    public function index(Request $request)
    {
        // If lookup parameter is provided, automatically look up the employee
        if ($request->has('lookup') && $request->lookup) {
            $identifier = $request->lookup;
            
            // Try to find employee by barcode_tag or employee_id
            $employee = Employee::where('barcode_tag', $identifier)
                ->orWhere('employee_id', $identifier)
                ->first();

            if ($employee) {
                // Reset quota if needed
                $employee->resetQuotaIfNeeded();

                return Inertia::render('gallon-scan', [
                    'employee' => [
                        'id' => $employee->id,
                        'employee_id' => $employee->employee_id,
                        'name' => $employee->name,
                        'department' => $employee->department,
                        'grade' => $employee->grade,
                        'location' => $employee->location,
                        'monthly_quota' => $employee->monthly_quota,
                        'current_taken_gallons' => $employee->current_taken_gallons,
                        'remaining_quota' => $employee->remaining_quota,
                    ],
                ]);
            } else {
                return Inertia::render('gallon-scan', [
                    'error' => 'Employee not found. Please check the barcode or employee ID.',
                    'initialIdentifier' => $identifier,
                ]);
            }
        }
        
        return Inertia::render('gallon-scan');
    }

    /**
     * Store employee lookup data.
     */
    public function store(Request $request)
    {
        $request->validate([
            'identifier' => 'required|string',
        ]);

        $identifier = $request->identifier;
        
        // Try to find employee by barcode_tag or employee_id
        $employee = Employee::where('barcode_tag', $identifier)
            ->orWhere('employee_id', $identifier)
            ->first();

        if (!$employee) {
            return Inertia::render('gallon-scan', [
                'error' => 'Employee not found. Please check the barcode or employee ID.',
            ]);
        }

        // Reset quota if needed
        $employee->resetQuotaIfNeeded();

        return Inertia::render('gallon-scan', [
            'employee' => [
                'id' => $employee->id,
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'department' => $employee->department,
                'grade' => $employee->grade,
                'location' => $employee->location,
                'monthly_quota' => $employee->monthly_quota,
                'current_taken_gallons' => $employee->current_taken_gallons,
                'remaining_quota' => $employee->remaining_quota,
            ],
        ]);
    }

    /**
     * Update gallon withdrawal.
     */
    public function update(Request $request, $id = null)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'gallons' => 'required|integer|min:1',
        ]);

        $employee = Employee::findOrFail($request->employee_id);
        $gallons = $request->gallons;

        // Try to withdraw gallons
        if (!$employee->withdrawGallons($gallons)) {
            return Inertia::render('gallon-scan', [
                'employee' => [
                    'id' => $employee->id,
                    'employee_id' => $employee->employee_id,
                    'name' => $employee->name,
                    'department' => $employee->department,
                    'grade' => $employee->grade,
                    'location' => $employee->location,
                    'monthly_quota' => $employee->monthly_quota,
                    'current_taken_gallons' => $employee->current_taken_gallons,
                    'remaining_quota' => $employee->remaining_quota,
                ],
                'error' => 'Insufficient quota. Requested gallons exceed remaining quota.',
            ]);
        }

        // Refresh employee data after withdrawal
        $employee->refresh();

        return Inertia::render('gallon-scan', [
            'success' => "Successfully withdrew {$gallons} gallon(s). Remaining quota: {$employee->remaining_quota}",
            'employee' => [
                'id' => $employee->id,
                'employee_id' => $employee->employee_id,
                'name' => $employee->name,
                'department' => $employee->department,
                'grade' => $employee->grade,
                'location' => $employee->location,
                'monthly_quota' => $employee->monthly_quota,
                'current_taken_gallons' => $employee->current_taken_gallons,
                'remaining_quota' => $employee->remaining_quota,
            ],
        ]);
    }
}