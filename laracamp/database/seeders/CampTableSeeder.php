<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\camp;

class CampTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $camps = [
            [
                'title' => 'Master Class',
                'slug' => 'mater-class',
                'price' => '280',
                'created_at' => date('Y-m-d H:i:s', time()),
                'deleted_at' => date('Y-m-d H:i:s', time()),
            ],
            [
                'title' => 'Basic Crypto',
                'slug' => 'basic-crypto',
                'price' => '140',
                'created_at' => date('Y-m-d H:i:s', time()),
                'deleted_at' => date('Y-m-d H:i:s', time())

            ]
        ];

        Camp::insert ($camps);
    }
}
