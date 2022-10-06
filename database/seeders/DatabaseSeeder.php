<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->hasPost(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Ferdy',
        //     'username' => 'ferdi24',
        // ]);

        // $users->each(function ($user) {
        //     \App\Models\User::factory(10)->create(['id_user' => $user->id]);
        // });

        // $post = Post::factory(5)->create();

        Comment::factory(5)->hasPost(5)->hasUser(5)->create();
    }
}
