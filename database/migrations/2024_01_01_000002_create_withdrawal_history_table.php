<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('withdrawal_history', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained('employees')->onDelete('cascade');
            $table->integer('gallons_withdrawn')->comment('Number of gallons withdrawn');
            $table->timestamp('withdrawal_date_time')->comment('When the withdrawal occurred');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('employee_id');
            $table->index('withdrawal_date_time');
            $table->index(['employee_id', 'withdrawal_date_time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdrawal_history');
    }
};