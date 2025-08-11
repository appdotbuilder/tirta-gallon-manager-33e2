<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\WithdrawalReportService;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    /**
     * Display a listing of the reports.
     */
    public function index()
    {
        return response()->json(['message' => 'Reports index']);
    }

    /**
     * Download withdrawal history report.
     */
    public function store(Request $request, WithdrawalReportService $reportService)
    {
        $filters = $request->only(['start_date', 'end_date']);
        $withdrawals = $reportService->getWithdrawalHistory($filters);

        return $reportService->generateCsvReport($withdrawals);
    }
}