<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use App\Models\WithdrawalHistory;
use App\Services\WithdrawalReportService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the employees.
     */
    public function index()
    {
        $employees = Employee::latest()->paginate(10);
        
        return Inertia::render('admin/employees/index', [
            'employees' => $employees,
        ]);
    }

    /**
     * Show the form for creating a new employee.
     */
    public function create()
    {
        return Inertia::render('admin/employees/create');
    }

    /**
     * Store a newly created employee.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $data = $request->validated();
        
        // Calculate monthly quota based on grade
        $data['monthly_quota'] = Employee::calculateQuotaByGrade($data['grade']);
        
        $employee = Employee::create($data);

        return redirect()->route('admin.employees.show', $employee)
            ->with('success', 'Employee created successfully.');
    }

    /**
     * Display the specified employee.
     */
    public function show(Employee $employee)
    {
        $employee->load(['withdrawalHistory' => function ($query) {
            $query->latest()->take(10);
        }]);

        return Inertia::render('admin/employees/show', [
            'employee' => $employee,
            'recentWithdrawals' => $employee->withdrawalHistory,
            'qrCodeUrl' => $employee->qr_code_url,
        ]);
    }

    /**
     * Show the form for editing the specified employee.
     */
    public function edit(Employee $employee)
    {
        return Inertia::render('admin/employees/edit', [
            'employee' => $employee,
        ]);
    }

    /**
     * Update the specified employee.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $data = $request->validated();
        
        // Recalculate monthly quota if grade changed
        if (isset($data['grade']) && $data['grade'] !== $employee->grade) {
            $data['monthly_quota'] = Employee::calculateQuotaByGrade($data['grade']);
        }
        
        $employee->update($data);

        return redirect()->route('admin.employees.show', $employee)
            ->with('success', 'Employee updated successfully.');
    }

    /**
     * Remove the specified employee.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return redirect()->route('admin.employees.index')
            ->with('success', 'Employee deleted successfully.');
    }


}