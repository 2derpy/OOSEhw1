import { useState, type FormEvent } from 'react';

interface TodoFormProps {
  onAdd: (title: string, description: string, date : string) => Promise<void>;
}

export function TodoForm({ onAdd }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    setSubmitting(true);
    await onAdd(trimmed, description, date);
    setTitle('');
    setDescription('');
    setDate('');
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Name"
        aria-label="New todo"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description(optional)"
        aria-label="New todo"
      />
      <input
        value={date}
        onChange={(e) => setDate(e.target.value)}
        placeholder="Date"
        aria-label="New todo"
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding…' : 'Add'}
      </button>
    </form>
  );
}
