<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Dashboard', [
            'post_count' => Post::where('id_user', 'like', auth()->user()->id)->count(),
            'comment_count' => Comment::where('id_user', 'like', auth()->user()->id)->count(),
        ]);
    }
}
