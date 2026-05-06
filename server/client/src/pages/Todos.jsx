import { useState, useEffect } from 'react';
import './Todos.css';

const API = 'http://localhost:3000';

function Todos({ user }) {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // ========== GET todos by user ==========
    const fetchTodos = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API}/todos/user/${user.id}`);
            const data = await res.json();
            // ממוינים לפי id
            setTodos(data.sort((a, b) => a.id - b.id));
        } catch (err) {
            setError('Failed to load todos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // ========== POST - הוספת todo ==========
    const handleAdd = async () => {
        if (!newTitle.trim()) return;
        try {
            const res = await fetch(`${API}/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id, title: newTitle, completed: false })
            });
            if (!res.ok) throw new Error();
            setNewTitle('');
            fetchTodos();
        } catch (err) {
            setError('Failed to add todo');
        }
    };

    // ========== PUT - עדכון completed ==========
    const handleToggle = async (todo) => {
        try {
            const res = await fetch(`${API}/todos/${todo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: todo.title, completed: !todo.completed })
            });
            if (!res.ok) throw new Error();
            fetchTodos();
        } catch (err) {
            setError('Failed to update todo');
        }
    };

    // ========== PUT - עדכון כותרת ==========
    const handleEditSave = async (todo) => {
        if (!editingTitle.trim()) return;
        try {
            const res = await fetch(`${API}/todos/${todo.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: editingTitle, completed: todo.completed })
            });
            if (!res.ok) throw new Error();
            setEditingId(null);
            setEditingTitle('');
            fetchTodos();
        } catch (err) {
            setError('Failed to edit todo');
        }
    };

    // ========== DELETE ==========
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${API}/todos/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            fetchTodos();
        } catch (err) {
            setError('Failed to delete todo');
        }
    };

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditingTitle(todo.title);
    };

    return (
        <div className="todos-container">
            <h2>My Todos</h2>

            {error && <p className="error-msg">{error}</p>}

            {/* הוספת todo חדש */}
            <div className="add-todo">
                <input
                    placeholder="Add new todo..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
                <button className="btn-add" onClick={handleAdd}>+ Add</button>
            </div>

            {/* רשימת todos */}
            {loading ? (
                <p className="loading-msg">Loading...</p>
            ) : todos.length === 0 ? (
                <p className="empty-msg">No todos yet!</p>
            ) : (
                <ul className="todos-list">
                    {todos.map(todo => (
                        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            <input
                                type="checkbox"
                                checked={!!todo.completed}
                                onChange={() => handleToggle(todo)}
                            />

                            {editingId === todo.id ? (
                                <input
                                    className="edit-input"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleEditSave(todo)}
                                    autoFocus
                                />
                            ) : (
                                <span className="todo-title">{todo.title}</span>
                            )}

                            <div className="todo-actions">
                                {editingId === todo.id ? (
                                    <>
                                        <button className="btn-save" onClick={() => handleEditSave(todo)}>Save</button>
                                        <button className="btn-cancel" onClick={() => setEditingId(null)}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <button className="btn-edit" onClick={() => startEdit(todo)}>Edit</button>
                                        <button className="btn-delete" onClick={() => handleDelete(todo.id)}>Delete</button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <p className="todos-count">
                {todos.filter(t => t.completed).length} / {todos.length} completed
            </p>
        </div>
    );
}

export default Todos;
