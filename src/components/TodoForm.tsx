import { useState, type FormEvent } from 'react';

interface TodoFormProps {
  onAdd: (title: string) => Promise<void>;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setSubmitting(true);
    await onAdd(trimmed);
    setTitle('');
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs doing?"
        aria-label="New todo"
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding…' : 'Add'}
      </button>
    </form>
  );
}
