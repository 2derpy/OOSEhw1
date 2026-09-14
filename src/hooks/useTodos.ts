import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Todo, TodoInsert, TodoUpdate } from '../types/database';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setTodos(data ?? []);
    }
    setLoading(false);
  }, []);

  const addTodo = useCallback(async (title: string) => {
    const values: TodoInsert = { title };
    const { data, error: insertError } = await supabase
      .from('todos')
      .insert(values)
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      return;
    }
    setTodos((prev) => [data, ...prev]);
  }, []);

  const updateTodo = useCallback(async (id: string, values: TodoUpdate) => {
    const { data, error: updateError } = await supabase
      .from('todos')
      .update(values)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      setError(updateError.message);
      return;
    }
    setTodos((prev) => prev.map((t) => (t.id === id ? data : t)));
  }, []);

  const toggleTodo = useCallback(
    (id: string, isComplete: boolean) => updateTodo(id, { is_complete: isComplete }),
    [updateTodo]
  );

  const deleteTodo = useCallback(async (id: string) => {
    const { error: deleteError } = await supabase.from('todos').delete().eq('id', id);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Keep every connected client in sync as other users add/edit/remove todos.
  useEffect(() => {
    fetchTodos();

    const channel = supabase
      .channel('realtime:todos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, () => {
        fetchTodos();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTodos]);

  return { todos, loading, error, addTodo, updateTodo, toggleTodo, deleteTodo, refetch: fetchTodos };
}
