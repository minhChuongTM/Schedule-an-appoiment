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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // Người nhận
            $table->foreignId('sender_id')->nullable()->constrained('users')->nullOnDelete(); // Người gửi (null = system)
            $table->foreignId('appointment_id')->nullable()->constrained('appointments')->cascadeOnDelete();
            $table->enum('type', ['appointment_request', 'appointment_confirmed', 'appointment_cancelled', 'system', 'other'])->default('other');
            $table->string('title');
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->json('action_data')->nullable(); // (vd: lưu confirm appointment)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
