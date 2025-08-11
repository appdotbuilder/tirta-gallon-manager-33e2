<?php

namespace Database\Seeders;

use App\Models\Employee;
use App\Models\WithdrawalHistory;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create 20 employees
        Employee::factory()
            ->count(20)
            ->create()
            ->each(function (Employee $employee) {
                // Create 3-8 withdrawal records for each employee
                WithdrawalHistory::factory()
                    ->count(random_int(3, 8))
                    ->create([
                        'employee_id' => $employee->id,
                    ]);
            });

        // Create a specific test employee
        $testEmployee = Employee::create([
            'barcode_tag' => 'TEST001',
            'employee_id' => 'EMP001',
            'name' => 'John Doe',
            'department' => 'IT',
            'grade' => 'G8',
            'location' => 'Jakarta Office',
            'monthly_quota' => Employee::calculateQuotaByGrade('G8'),
            'current_taken_gallons' => 5,
            'last_quota_reset' => now()->startOfMonth(),
        ]);

        // Create some withdrawal history for test employee
        WithdrawalHistory::create([
            'employee_id' => $testEmployee->id,
            'gallons_withdrawn' => 3,
            'withdrawal_date_time' => now()->subDays(5),
        ]);

        WithdrawalHistory::create([
            'employee_id' => $testEmployee->id,
            'gallons_withdrawn' => 2,
            'withdrawal_date_time' => now()->subDays(2),
        ]);
    }
}