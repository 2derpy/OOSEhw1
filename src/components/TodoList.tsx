import type { Todo } from '../types/database';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string, description: string | undefined, date: string, isComplete: boolean) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="empty-state">No todos yet — add one above.</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <div>
          <li key={todo.id} className="todo-item">
            <label>
              <input
                type="checkbox"
                checked={todo.is_complete}
                onChange={(e) => onToggle(todo.id, todo.description, todo.date, e.target.checked)}
              />
              <span className={todo.is_complete ? 'done' : ''}>{todo.title}</span>
            </label>
            <button onClick={() => onDelete(todo.id)} aria-label={`Delete "${todo.title}"`}>
                ✕
            </button>
          </li>
          <li key={todo.id + "body"} className="todo-body">
            <label> {todo.description} </label>
            <label> {todo.date} </label>
          </li>
        </div>
      ))}
    </ul>
  );
}
