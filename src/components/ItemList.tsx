import { useState } from 'react';
import type { Item, ItemUpdate } from '../types/database';

interface ItemListProps {
  items: Item[];
  onUpdate: (id: string, values: ItemUpdate) => Promise<unknown>;
  onDelete: (id: string) => Promise<unknown>;
}

export function ItemList({ items, onUpdate, onDelete }: ItemListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState('');

  const startEdit = (item: Item) => {
    setEditingId(item.id);
    setDraftTitle(item.title);
  };

  const saveEdit = async (id: string) => {
    await onUpdate(id, { title: draftTitle });
    setEditingId(null);
  };

  if (items.length === 0) {
    return <p>No items yet.</p>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {items.map((item) => (
        <li key={item.id} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.25rem 0' }}>
          <input
            type="checkbox"
            checked={item.is_complete}
            onChange={(e) => onUpdate(item.id, { is_complete: e.target.checked })}
          />

          {editingId === item.id ? (
            <>
              <input value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} />
              <button onClick={() => saveEdit(item.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span style={{ textDecoration: item.is_complete ? 'line-through' : 'none' }}>
                {item.title}
              </span>
              <button onClick={() => startEdit(item)}>Edit</button>
            </>
          )}

          <button onClick={() => onDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
