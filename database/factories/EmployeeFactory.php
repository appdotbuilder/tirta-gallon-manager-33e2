<?php

namespace Database\Factories;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<Employee>
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $grade = $this->faker->randomElement(['G7', 'G8', 'G9', 'G10', 'G11', 'G12', 'G13']);
        
        return [
            'barcode_tag' => $this->faker->unique()->numerify('BC######'),
            'employee_id' => $this->faker->unique()->numerify('EMP####'),
            'name' => $this->faker->name(),
            'department' => $this->faker->randomElement([
                'Human Resources',
                'Finance',
                'Marketing',
                'Operations',
                'IT',
                'Production',
                'Quality Assurance',
            ]),
            'grade' => $grade,
            'location' => $this->faker->randomElement([
                'Jakarta Office',
                'Surabaya Plant',
                'Bandung Facility',
                'Medan Branch',
                'Semarang Office',
            ]),
            'monthly_quota' => Employee::calculateQuotaByGrade($grade),
            'current_taken_gallons' => $this->faker->numberBetween(0, 10),
            'last_quota_reset' => $this->faker->optional()->dateTimeBetween('-1 month', 'now'),
        ];
    }
}