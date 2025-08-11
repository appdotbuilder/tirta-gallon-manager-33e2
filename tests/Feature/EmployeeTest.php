<?php

use App\Models\Employee;
use App\Models\User;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('employee can be created', function () {
    $employee = Employee::factory()->create([
        'name' => 'John Doe',
        'grade' => 'G8',
        'monthly_quota' => 24,
    ]);

    $this->assertDatabaseHas('employees', [
        'name' => 'John Doe',
        'grade' => 'G8',  
        'monthly_quota' => 24,
    ]);
});

test('quota calculation based on grade', function () {
    expect(Employee::calculateQuotaByGrade('G7'))->toBe(24);
    expect(Employee::calculateQuotaByGrade('G8'))->toBe(24);
    expect(Employee::calculateQuotaByGrade('G9'))->toBe(12);
    expect(Employee::calculateQuotaByGrade('G10'))->toBe(10);
    expect(Employee::calculateQuotaByGrade('G11'))->toBe(7);
    expect(Employee::calculateQuotaByGrade('G12'))->toBe(7);
    expect(Employee::calculateQuotaByGrade('G13'))->toBe(7);
});

test('employee can withdraw gallons', function () {
    $employee = Employee::factory()->create([
        'monthly_quota' => 24,
        'current_taken_gallons' => 0,
        'last_quota_reset' => now()->startOfMonth(),
    ]);

    $result = $employee->withdrawGallons(5);

    expect($result)->toBeTrue();
    expect($employee->fresh()->current_taken_gallons)->toBe(5);
    $this->assertDatabaseHas('withdrawal_history', [
        'employee_id' => $employee->id,
        'gallons_withdrawn' => 5,
    ]);
});

test('employee cannot withdraw more than quota', function () {
    $employee = Employee::factory()->create([
        'monthly_quota' => 10,
        'current_taken_gallons' => 8,
        'last_quota_reset' => now()->startOfMonth(),
    ]);

    $result = $employee->withdrawGallons(5);

    expect($result)->toBeFalse();
    expect($employee->fresh()->current_taken_gallons)->toBe(8);
});

test('admin can view employee list', function () {
    $user = User::factory()->create();
    Employee::factory()->count(5)->create();

    $response = $this->actingAs($user)->get(route('admin.employees.index'));

    $response->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->component('admin/employees/index')
            ->has('employees.data', 5)
        );
});

test('admin can create employee', function () {
    $user = User::factory()->create();

    $employeeData = [
        'barcode_tag' => 'BC123456',
        'employee_id' => 'EMP001',
        'name' => 'Jane Doe',
        'department' => 'IT',
        'grade' => 'G8',
        'location' => 'Jakarta Office',
    ];

    $response = $this->actingAs($user)
        ->post(route('admin.employees.store'), $employeeData);

    $response->assertRedirect();
    $this->assertDatabaseHas('employees', [
        'name' => 'Jane Doe',
        'grade' => 'G8',
        'monthly_quota' => 24,
    ]);
});