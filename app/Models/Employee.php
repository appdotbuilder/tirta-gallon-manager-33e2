<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * App\Models\Employee
 *
 * @property int $id
 * @property string $barcode_tag
 * @property string $employee_id
 * @property string $name
 * @property string $department
 * @property string $grade
 * @property string $location
 * @property int $monthly_quota
 * @property int $current_taken_gallons
 * @property \Illuminate\Support\Carbon|null $last_quota_reset
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\WithdrawalHistory> $withdrawalHistory
 * @property-read int|null $withdrawal_history_count
 * @property-read int $remaining_quota
 * @property-read string $qr_code_url
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Employee newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee query()
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereBarcodeTag($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereDepartment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereGrade($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereMonthlyQuota($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereCurrentTakenGallons($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereLastQuotaReset($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Employee whereUpdatedAt($value)
 * @method static \Database\Factories\EmployeeFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Employee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'barcode_tag',
        'employee_id',
        'name',
        'department',
        'grade',
        'location',
        'monthly_quota',
        'current_taken_gallons',
        'last_quota_reset',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'last_quota_reset' => 'date',
        'monthly_quota' => 'integer',
        'current_taken_gallons' => 'integer',
    ];

    /**
     * Get the withdrawal history for this employee.
     */
    public function withdrawalHistory(): HasMany
    {
        return $this->hasMany(WithdrawalHistory::class);
    }

    /**
     * Get the remaining quota for this employee.
     */
    public function getRemainingQuotaAttribute(): int
    {
        return $this->monthly_quota - $this->current_taken_gallons;
    }

    /**
     * Get the QR code URL for this employee.
     */
    public function getQrCodeUrlAttribute(): string
    {
        return 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' . urlencode($this->barcode_tag);
    }

    /**
     * Calculate monthly quota based on grade.
     *
     * @param string $grade
     * @return int
     */
    public static function calculateQuotaByGrade(string $grade): int
    {
        return match ($grade) {
            'G7', 'G8' => 24,
            'G9' => 12,
            'G10' => 10,
            'G11', 'G12', 'G13' => 7,
            default => 0,
        };
    }

    /**
     * Reset quota if needed (monthly reset).
     */
    public function resetQuotaIfNeeded(): bool
    {
        $now = Carbon::now();
        $lastReset = $this->last_quota_reset;
        
        // If never reset or last reset was in a previous month
        if (!$lastReset || $lastReset->format('Y-m') !== $now->format('Y-m')) {
            $this->current_taken_gallons = 0;
            $this->last_quota_reset = $now;
            $this->save();
            return true;
        }
        
        return false;
    }

    /**
     * Withdraw gallons if quota allows.
     *
     * @param int $gallons
     * @return bool
     */
    public function withdrawGallons(int $gallons): bool
    {
        // Reset quota if needed
        $this->resetQuotaIfNeeded();
        
        if ($this->current_taken_gallons + $gallons > $this->monthly_quota) {
            return false;
        }
        
        $this->current_taken_gallons += $gallons;
        $this->save();
        
        // Log the withdrawal
        WithdrawalHistory::create([
            'employee_id' => $this->id,
            'gallons_withdrawn' => $gallons,
            'withdrawal_date_time' => now(),
        ]);
        
        return true;
    }
}