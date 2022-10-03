<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PostPublicController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [PostController::class, 'public'])->name('home');
Route::get('/detail-post/{post}', [CommentController::class, 'show'])->name('post.detail');

// Route::get('/', [PostController::class, 'public']);

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/dashboard', DashboardController::class)->name('dashboard');

    Route::resource('post', PostController::class);
    Route::post('/detail-post/comment', [CommentController::class, 'store'])->name('comment.store');
    Route::post('comment/delete/{comment}', [CommentController::class, 'destroy'])->name('comment.destroy');
});

require __DIR__ . '/auth.php';
