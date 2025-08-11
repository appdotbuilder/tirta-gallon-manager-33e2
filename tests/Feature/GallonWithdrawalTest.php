<?php

use App\Models\Employee;

uses(Illuminate\Foundation\Testing\RefreshDatabase::class);

test('gallon scan page loads', function () {
    $response = $this->get('/');

    $response->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->component('gallon-scan')
        );
});

test('employee lookup by barcode', function () {
    $employee = Employee::factory()->create([
        'barcode_tag' => 'BC123456',
        'name' => 'John Doe',
    ]);

    $response = $this->post(route('gallon.store'), [
        'identifier' => 'BC123456',
    ]);

    $response->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->component('gallon-scan')
            ->has('employee')
            ->where('employee.name', 'John Doe')
        );
});

test('employee lookup by employee id', function () {
    $employee = Employee::factory()->create([
        'employee_id' => 'EMP001',
        'name' => 'Jane Doe',
    ]);

    $response = $this->post(route('gallon.store'), [
        'identifier' => 'EMP001',
    ]);

    $response->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->component('gallon-scan')
            ->has('employee')
            ->where('employee.name', 'Jane Doe')
        );
});

test('employee lookup fails for invalid identifier', function () {
    $response = $this->post(route('gallon.store'), [
        'identifier' => 'INVALID123',
    ]);

    $response->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->component('gallon-scan')
            ->has('error')
            ->where('error', 'Employee not found. Please check the barcode or employee ID.')
        );
});

test('successful gallon withdrawal', function () {
    $employee = Employee::factory()->create([
        'monthly_quota' => 24,
        'current_taken_gallons' => 5,
        'last_quota_reset' => now()->startOfMonth(),
    ]);

    $response = $this->put(route('gallon.update'), [
        'employee_id' => $employee->id,
        'gallons' => 3,
    ]);

    $response->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->component('gallon-scan')
            ->has('success')
            ->has('employee')
            ->where('employee.current_taken_gallons', 8)
        );

    $this->assertDatabaseHas('withdrawal_history', [
        'employee_id' => $employee->id,
        'gallons_withdrawn' => 3,
    ]);
});

test('withdrawal fails when exceeding quota', function () {
    $employee = Employee::factory()->create([
        'monthly_quota' => 10,
        'current_taken_gallons' => 8,
        'last_quota_reset' => now()->startOfMonth(),
    ]);

    $response = $this->put(route('gallon.update'), [
        'employee_id' => $employee->id,
        'gallons' => 5,
    ]);

    $response->assertOk()
        ->assertInertia(fn ($assert) => $assert
            ->component('gallon-scan')
            ->has('error')
            ->where('error', 'Insufficient quota. Requested gallons exceed remaining quota.')
        );

    expect($employee->fresh()->current_taken_gallons)->toBe(8);
});