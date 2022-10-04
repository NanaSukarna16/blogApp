<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function __construct()
    {
        // $this->middleware('is_maker')->only('destroy');
    }
    public function index()
    {
        return Inertia::render('Post/Index', [
            'post' => Post::where('id_user', auth()->user()->id)->with('user')->paginate(8),
        ]);
    }

    public function public()
    {
        return Inertia::render('Welcome', [
            'post' => Post::with('user')->paginate(9),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Post/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => ['required', 'min:3', 'max:255'],
            'konten' => ['required', 'min:10'],
        ]);


        Post::create($validated + ['id_user' => auth()->id()]);

        return redirect(route('post.index'))->with('flash', [
            'type' => 'success',
            'title' => 'Post Barang Tersimpan',
            'body' => 'Post Barang Berhasil Disimpan'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        $this->authorize('edit', $post);
        return Inertia::render('Post/Edit', [
            'user' => User::all(),
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'judul' => ['required', 'min:3', 'max:255'],
            'konten' => ['required', 'min:10'],
        ]);

        $post->update($validated + ['id_user' => auth()->id()]);


        return redirect(route('post.index'))->with('flash', [
            'type' => 'success',
            'title' => 'Post Barang Tersimpan',
            'body' => 'Post Barang Berhasil Disimpan'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Post $post)
    {
        $prevUrl = $request->headers->get('referer');
        $intendedUrl = preg_match('/\/detail-post\/\d/', $prevUrl) ? '/' : route('post.index');

        $this->authorize('delete', $post);

        $post->delete();

        return redirect($intendedUrl)->with('flash', [
            'type' => 'success',
            'title' => 'Post Telah Dihapus',
            'body' => 'Post Berhasil Dihapus',
        ]);
    }
}
