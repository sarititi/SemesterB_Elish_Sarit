import { useState, useEffect } from 'react';
import './Posts.css';

const API = 'http://localhost:3000';

function Posts({ user }) {
    const [posts, setPosts] = useState([]);
    const [expandedPost, setExpandedPost] = useState(null);   // post_id שפתוח לתגובות
    const [comments, setComments] = useState({});              // { post_id: [comments] }
    const [newPost, setNewPost] = useState({ title: '', body: '' });
    const [editingPost, setEditingPost] = useState(null);      // { post_id, title, body }
    const [newComment, setNewComment] = useState('');          // טקסט תגובה חדשה
    const [editingComment, setEditingComment] = useState(null); // { id, body }
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // ========== GET all posts ==========
    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/posts`);
            const data = await res.json();
            setPosts(data.sort((a, b) => a.post_id - b.post_id));
        } catch (err) {
            setError('Failed to load posts');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // ========== GET comments for a post ==========
    const fetchComments = async (postId) => {
        try {
            const res = await fetch(`${API}/comments/post/${postId}`);
            const data = await res.json();
            setComments(prev => ({ ...prev, [postId]: data }));
        } catch (err) {
            setError('Failed to load comments');
        }
    };

    const toggleComments = (postId) => {
        if (expandedPost === postId) {
            setExpandedPost(null);
        } else {
            setExpandedPost(postId);
            if (!comments[postId]) {
                fetchComments(postId);
            }
        }
    };

    // ========== POST - הוספת post ==========
    const handleAddPost = async () => {
        if (!newPost.title.trim() || !newPost.body.trim()) return;
        try {
            const res = await fetch(`${API}/posts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, title: newPost.title, body: newPost.body })
            });
            if (!res.ok) throw new Error();
            setNewPost({ title: '', body: '' });
            fetchPosts();
        } catch (err) {
            setError('Failed to add post');
        }
    };

    // ========== PUT - עדכון post (רק של המשתמש הפעיל) ==========
    const handleEditPostSave = async () => {
        if (!editingPost.title.trim() || !editingPost.body.trim()) return;
        try {
            const res = await fetch(`${API}/posts/${editingPost.post_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: editingPost.title, body: editingPost.body })
            });
            if (!res.ok) throw new Error();
            setEditingPost(null);
            fetchPosts();
        } catch (err) {
            setError('Failed to edit post');
        }
    };

    // ========== DELETE - מחיקת post (רק של המשתמש הפעיל) ==========
    const handleDeletePost = async (postId) => {
        try {
            const res = await fetch(`${API}/posts/${postId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            // אם היה פתוח, סגור
            if (expandedPost === postId) setExpandedPost(null);
            fetchPosts();
        } catch (err) {
            setError('Failed to delete post');
        }
    };

    // ========== POST - הוספת comment ==========
    const handleAddComment = async (postId) => {
        if (!newComment.trim()) return;
        try {
            const res = await fetch(`${API}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ post_id: postId, user_id: user.id, body: newComment })
            });
            if (!res.ok) throw new Error();
            setNewComment('');
            fetchComments(postId);
        } catch (err) {
            setError('Failed to add comment');
        }
    };

    // ========== PUT - עדכון comment (רק של המשתמש הפעיל) ==========
    const handleEditCommentSave = async (postId) => {
        if (!editingComment.body.trim()) return;
        try {
            const res = await fetch(`${API}/comments/${editingComment.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ body: editingComment.body })
            });
            if (!res.ok) throw new Error();
            setEditingComment(null);
            fetchComments(postId);
        } catch (err) {
            setError('Failed to edit comment');
        }
    };

    // ========== DELETE - מחיקת comment (רק של המשתמש הפעיל) ==========
    const handleDeleteComment = async (commentId, postId) => {
        try {
            const res = await fetch(`${API}/comments/${commentId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            fetchComments(postId);
        } catch (err) {
            setError('Failed to delete comment');
        }
    };

    const isMyPost = (post) => post.user_id === user.id;
    const isMyComment = (comment) => comment.user_id === user.id;

    return (
        <div className="posts-container">
            <h2>All Posts</h2>

            {error && <p className="error-msg">{error}</p>}

            {/* טופס הוספת פוסט חדש */}
            <div className="add-post-form">
                <h3>New Post</h3>
                <input
                    placeholder="Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <textarea
                    placeholder="What's on your mind?"
                    value={newPost.body}
                    onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                    rows={3}
                />
                <button className="btn-add" onClick={handleAddPost}>+ Publish Post</button>
            </div>

            {/* רשימת פוסטים */}
            {loading ? (
                <p className="loading-msg">Loading...</p>
            ) : posts.length === 0 ? (
                <p className="empty-msg">No posts yet!</p>
            ) : (
                <ul className="posts-list">
                    {posts.map(post => (
                        <li key={post.post_id} className="post-card">

                            {/* עריכת פוסט */}
                            {editingPost?.post_id === post.post_id ? (
                                <div className="post-edit-form">
                                    <input
                                        value={editingPost.title}
                                        onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                                    />
                                    <textarea
                                        value={editingPost.body}
                                        onChange={(e) => setEditingPost({ ...editingPost, body: e.target.value })}
                                        rows={3}
                                    />
                                    <div className="post-edit-actions">
                                        <button className="btn-save" onClick={handleEditPostSave}>Save</button>
                                        <button className="btn-cancel" onClick={() => setEditingPost(null)}>Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="post-header">
                                        <div className="post-meta">
                                            <span className="post-author">User #{post.user_id}</span>
                                            <span className="post-id">#{post.post_id}</span>
                                        </div>
                                        {/* כפתורי עריכה/מחיקה רק לפוסטים של המשתמש הפעיל */}
                                        {isMyPost(post) && (
                                            <div className="post-actions">
                                                <button className="btn-edit" onClick={() => setEditingPost({ ...post })}>Edit</button>
                                                <button className="btn-delete" onClick={() => handleDeletePost(post.post_id)}>Delete</button>
                                            </div>
                                        )}
                                    </div>

                                    <h4 className="post-title">{post.title}</h4>
                                    <p className="post-body">{post.body}</p>
                                </>
                            )}

                            {/* כפתור הצגת comments */}
                            <button
                                className="btn-toggle-comments"
                                onClick={() => toggleComments(post.post_id)}
                            >
                                {expandedPost === post.post_id ? '▲ Hide Comments' : '▼ Show Comments'}
                            </button>

                            {/* תגובות */}
                            {expandedPost === post.post_id && (
                                <div className="comments-section">

                                    {/* רשימת comments */}
                                    {comments[post.post_id]?.length === 0 ? (
                                        <p className="empty-msg">No comments yet.</p>
                                    ) : (
                                        <ul className="comments-list">
                                            {(comments[post.post_id] || []).map(comment => (
                                                <li key={comment.id} className="comment-item">
                                                    <span className="comment-author">User #{comment.user_id}: </span>

                                                    {editingComment?.id === comment.id ? (
                                                        <div className="comment-edit-row">
                                                            <input
                                                                value={editingComment.body}
                                                                onChange={(e) => setEditingComment({ ...editingComment, body: e.target.value })}
                                                                onKeyDown={(e) => e.key === 'Enter' && handleEditCommentSave(post.post_id)}
                                                                autoFocus
                                                            />
                                                            <button className="btn-save" onClick={() => handleEditCommentSave(post.post_id)}>Save</button>
                                                            <button className="btn-cancel" onClick={() => setEditingComment(null)}>Cancel</button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <span className="comment-body">{comment.body}</span>
                                                            {/* עריכה/מחיקה רק לתגובות של המשתמש הפעיל */}
                                                            {isMyComment(comment) && (
                                                                <div className="comment-actions">
                                                                    <button className="btn-edit" onClick={() => setEditingComment({ id: comment.id, body: comment.body })}>Edit</button>
                                                                    <button className="btn-delete" onClick={() => handleDeleteComment(comment.id, post.post_id)}>Delete</button>
                                                                </div>
                                                            )}
                                                        </>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* הוספת comment חדשה */}
                                    <div className="add-comment-row">
                                        <input
                                            placeholder="Add a comment..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.post_id)}
                                        />
                                        <button className="btn-add-comment" onClick={() => handleAddComment(post.post_id)}>Reply</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Posts;
