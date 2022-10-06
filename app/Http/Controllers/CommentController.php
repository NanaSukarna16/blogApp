<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Comment/Index', [
            'comment' => Comment::with('post')->where('id_user', auth()->user()->id)->with('user')->paginate(8),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $validated = $request->validate([
        //     'konten' => ['required', 'max:255'],
        //     'id_post' => ['required']
        // ]);
        Comment::create([
            'id_user' => auth()->id(),
            'konten' => $request->konten,
            'id_post' => $request->id_post,

        ]);

        return redirect()->back()->with('flash', [
            'type' => 'success',
            'title' => 'Berhasil Memberikan Komentar',
            'body' => 'Berhasil Memberikan Komentar'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment, Post $post)
    {
        $post->load('user');
        return Inertia::render('Post/Show', [
            'comment' => $post->comment()->with('user')->get(),
            'post' => $post,
            'can_update' => request()->user()?->can('update', $post),
            'can_delete' =>  request()->user()?->can('delete', $post),
            // 'can_action' => request()->user()?->can('delete', $comment)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        $validated = $request->validate([
            'konten' => ['required'],
        ]);
        $this->authorize('update', $comment);
        $comment->update($validated + [
            'id_user' => auth()->id(),
            'id_post' => $comment->id_post
        ]);


        return redirect()->back()->with('flash', [
            'type' => 'success',
            'title' => 'Berhasil',
            'body' => 'Comment Berhasil di Edit'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);
        $comment->delete();

        return redirect()->back()->with('flash', [
            'type' => 'success',
            'title' => 'Comment Telah Dihapus',
            'body' => 'Comment Berhasil Dihapus',
        ]);
    }
}
