<?php

namespace Database\Seeders;

use App\Models\Salas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SalasTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sala = new Salas;
        $sala->id = 101;
        $sala->nombre_sala = '101';

    }
}
