<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\WithdrawalHistory
 *
 * @property int $id
 * @property int $employee_id
 * @property int $gallons_withdrawn
 * @property \Illuminate\Support\Carbon $withdrawal_date_time
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Employee $employee
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalHistory query()
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalHistory whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalHistory whereGallonsWithdrawn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalHistory whereWithdrawalDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalHistory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WithdrawalHistory whereUpdatedAt($value)
 * @method static \Database\Factories\WithdrawalHistoryFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class WithdrawalHistory extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'withdrawal_history';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'employee_id',
        'gallons_withdrawn',
        'withdrawal_date_time',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'withdrawal_date_time' => 'datetime',
        'gallons_withdrawn' => 'integer',
        'employee_id' => 'integer',
    ];

    /**
     * Get the employee that owns this withdrawal record.
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }
}