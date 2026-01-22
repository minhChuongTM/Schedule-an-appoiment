<?php

namespace App\Http\Controllers;

use App\Models\MedicalNews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MedicalNewsController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 12);
        
        $query = MedicalNews::with('author:id,name,avatar_url');

        if ($request->has('category') && $request->category) {
            $query->where('category', $request->category);
        }

        if ($request->has('search') && $request->search) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('title', 'like', "%{$searchTerm}%")
                  ->orWhere('content', 'like', "%{$searchTerm}%");
            });
        }

        $news = $query->orderBy('created_at', 'desc')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $news
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image_url' => 'nullable|string',
            'category' => 'nullable|string',
        ]);

        $news = MedicalNews::create([
            'title' => $request->title,
            'content' => $request->content,
            'image_url' => $request->image_url,
            'category' => $request->category,
            'author_id' => Auth::id(),
        ]);

        return response()->json(['success' => true, 'data' => $news->load('author:id,name,avatar_url')], 201);
    }

    public function show($id)
    {
        $news = MedicalNews::with('author:id,name,avatar_url')->find($id);
        if (!$news) {
            return response()->json(['success' => false, 'message' => 'Tin tức không tồn tại'], 404);
        }
        return response()->json(['success' => true, 'data' => $news]);
    }

    public function update(Request $request, $id)
    {
        $news = MedicalNews::find($id);
        if (!$news) {
            return response()->json(['success' => false, 'message' => 'Tin tức không tồn tại'], 404);
        }

        $user = Auth::user();
        if ($user->role !== 'admin' && $news->author_id !== $user->id) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền chỉnh sửa tin tức này'], 403);
        }

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
            'image_url' => 'nullable|string',
            'category' => 'nullable|string',
        ]);

        $news->update($request->only(['title', 'content', 'image_url', 'category']));

        return response()->json(['success' => true, 'data' => $news->load('author:id,name,avatar_url')]);
    }

    public function destroy($id)
    {
        $news = MedicalNews::find($id);
        if (!$news) {
            return response()->json(['success' => false, 'message' => 'Tin tức không tồn tại'], 404);
        }

        $user = Auth::user();
        if ($user->role !== 'admin' && $news->author_id !== $user->id) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền xóa tin tức này'], 403);
        }

        $news->delete();
        return response()->json(['success' => true, 'message' => 'Xóa tin tức thành công']);
    }
}
