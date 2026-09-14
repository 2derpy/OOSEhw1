import { useTodos } from './hooks/useTodos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import './App.css';

function App() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  const remaining = todos.filter((t) => !t.is_complete).length;

  return (
    <div className="app">
      <h1>Todos</h1>

      <TodoForm onAdd={addTodo} />

      {/* display error message if not loaded */}
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}


      {!loading && !error && (
        <>
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
          <p className="count">{remaining} remaining</p>
        </>
      )}
    </div>
  );
}

export default App;
