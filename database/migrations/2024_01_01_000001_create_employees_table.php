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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('barcode_tag')->unique()->comment('Unique barcode for scanning');
            $table->string('employee_id')->unique()->comment('Employee ID for manual input');
            $table->string('name');
            $table->string('department');
            $table->enum('grade', ['G7', 'G8', 'G9', 'G10', 'G11', 'G12', 'G13'])->comment('Employee grade determining quota');
            $table->string('location');
            $table->integer('monthly_quota')->comment('Monthly gallon quota based on grade');
            $table->integer('current_taken_gallons')->default(0)->comment('Current month taken gallons');
            $table->date('last_quota_reset')->nullable()->comment('Last time quota was reset');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('barcode_tag');
            $table->index('employee_id');
            $table->index('grade');
            $table->index('current_taken_gallons');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};