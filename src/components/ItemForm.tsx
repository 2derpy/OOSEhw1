import { useState, type FormEvent } from 'react';
import type { ItemInsert } from '../types/database';

interface ItemFormProps {
  userId: string;
  onSubmit: (values: ItemInsert) => Promise<unknown>;
}

export function ItemForm({ userId, onSubmit }: ItemFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    await onSubmit({ title, description: description || null, user_id: userId });
    setTitle('');
    setDescription('');
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding…' : 'Add'}
      </button>
    </form>
  );
}
