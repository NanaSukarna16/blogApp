<?php

namespace App\Providers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        // Disable mass asignment untuk semua tabel
        Model::unguard();

        $oneHour = now()->addHour();
        cache()->remember('post.count', $oneHour, fn () => Post::count());
        cache()->remember('comment.count', $oneHour, fn () => Comment::count());
    }
}
