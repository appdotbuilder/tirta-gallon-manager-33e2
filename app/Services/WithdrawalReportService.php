<?php

namespace App\Services;

use App\Models\WithdrawalHistory;
use Illuminate\Http\Response;
use Illuminate\Support\Collection;

class WithdrawalReportService
{
    /**
     * Generate withdrawal history CSV report.
     *
     * @param Collection $withdrawals
     * @return Response
     */
    public function generateCsvReport(Collection $withdrawals): Response
    {
        $csv = "Withdrawal ID,Employee ID,Employee Name,Department,Grade,Location,Gallons Withdrawn,Withdrawal Date,Withdrawal Time\n";
        
        foreach ($withdrawals as $withdrawal) {
            $csv .= implode(',', [
                $withdrawal->id,
                '"' . $withdrawal->employee->employee_id . '"',
                '"' . $withdrawal->employee->name . '"',
                '"' . $withdrawal->employee->department . '"',
                $withdrawal->employee->grade,
                '"' . $withdrawal->employee->location . '"',
                $withdrawal->gallons_withdrawn,
                $withdrawal->withdrawal_date_time->format('Y-m-d'),
                $withdrawal->withdrawal_date_time->format('H:i:s'),
            ]) . "\n";
        }
        
        $filename = 'withdrawal_history_' . now()->format('Y_m_d_His') . '.csv';
        
        return response($csv, 200, [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }

    /**
     * Get withdrawal history with filters.
     *
     * @param array $filters
     * @return Collection
     */
    public function getWithdrawalHistory(array $filters = []): Collection
    {
        $query = WithdrawalHistory::with('employee')
            ->orderBy('withdrawal_date_time', 'desc');

        if (!empty($filters['start_date'])) {
            $query->whereDate('withdrawal_date_time', '>=', $filters['start_date']);
        }
        
        if (!empty($filters['end_date'])) {
            $query->whereDate('withdrawal_date_time', '<=', $filters['end_date']);
        }

        return $query->get();
    }
}