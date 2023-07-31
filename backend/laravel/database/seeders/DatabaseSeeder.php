<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //\App\Models\Client::factory(100)->create();
         \App\Models\User::factory(1)->create();
        // \App\Models\Affiliate::factory(100)->create();
        // \App\Models\Property::factory(100)->create();
        // \App\Models\PropertyPayment::factory(100)->create();
        // \App\Models\Project::factory(100)->create();
        // \App\Models\Payment::factory(100)->create();
        // $this->call([
        //     StockFileSeeder::class,
        //     TagsSeeder::class,
        //     StockFilePathTagSeeder::class,
        //     ChallengesSeeder::class,
        //     ChallengeEntriesSeeder::class,
        //     AlbumSeeder::class,
        //     AlbumFileLinkSeeder::class

        // ]);

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
