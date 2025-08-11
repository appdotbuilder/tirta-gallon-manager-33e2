<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\WithdrawalHistory;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WithdrawalHistory>
 */
class WithdrawalHistoryFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<WithdrawalHistory>
     */
    protected $model = WithdrawalHistory::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'employee_id' => Employee::factory(),
            'gallons_withdrawn' => $this->faker->numberBetween(1, 5),
            'withdrawal_date_time' => $this->faker->dateTimeBetween('-3 months', 'now'),
        ];
    }
}