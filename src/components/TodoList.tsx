import type { Todo } from '../types/database';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, isComplete: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="empty-state">No todos yet — add one above.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <label>
            <input
              type="checkbox"
              checked={todo.is_complete}
              onChange={(e) => onToggle(todo.id, e.target.checked)}
            />
            <span className={todo.is_complete ? 'done' : ''}>{todo.title}</span>
          </label>
          <button onClick={() => onDelete(todo.id)} aria-label={`Delete "${todo.title}"`}>
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
