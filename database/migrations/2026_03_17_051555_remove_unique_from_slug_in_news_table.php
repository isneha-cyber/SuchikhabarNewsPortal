<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->dropUnique(['slug']); // removes unique index
             $table->index('slug'); 
        });
    }

    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            $table->unique('slug'); // rollback (add back unique)
        });
    }
};