<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\GallonController;
use App\Http\Controllers\ReportController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main gallon scan interface (public access)
Route::get('/', [GallonController::class, 'index'])->name('home');
Route::post('/gallon', [GallonController::class, 'store'])->name('gallon.store');
Route::put('/gallon', [GallonController::class, 'update'])->name('gallon.update');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Admin routes with prefix
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('employees', EmployeeController::class);
        Route::resource('reports', ReportController::class)->only(['index', 'store']);
        Route::get('reports/download', [ReportController::class, 'store'])->name('reports.download');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
