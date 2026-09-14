import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Database } from '../types/database';

type TableName = keyof Database['public']['Tables'];
type Row<T extends TableName> = Database['public']['Tables'][T]['Row'];
type Insert<T extends TableName> = Database['public']['Tables'][T]['Insert'];
type Update<T extends TableName> = Database['public']['Tables'][T]['Update'];

interface UseSupabaseCrudOptions {
  orderBy?: string;
  ascending?: boolean;
  realtime?: boolean;
}


export function useSupabaseCrud<T extends TableName>(
  table: T,
  options: UseSupabaseCrudOptions = {}
) {
  const { orderBy = 'created_at', ascending = false, realtime = false } = options;

  const [data, setData] = useState<Row<T>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);

    const { data: rows, error: fetchError } = await supabase
      .from(table)
      .select('*')
      .order(orderBy, { ascending });

    if (fetchError) {
      setError(fetchError.message);
    } else {
      setData((rows ?? []) as unknown as Row<T>[]);
    }
    setLoading(false);
  }, [table, orderBy, ascending]);

  const create = useCallback(
    async (values: Insert<T>) => {
      const { data: created, error: createError } = await supabase
        .from(table)
        .insert(values as never)
        .select()
        .single();

      if (createError) {
        setError(createError.message);
        return { data: null, error: createError };
      }

      setData((prev) => [created as unknown as Row<T>, ...prev]);
      return { data: created as unknown as Row<T>, error: null };
    },
    [table]
  );

  const update = useCallback(
    async (id: string, values: Update<T>) => {
      const { data: updated, error: updateError } = await supabase
        .from(table)
        .update(values as never)
        .eq('id' as never, id)
        .select()
        .single();

      if (updateError) {
        setError(updateError.message);
        return { data: null, error: updateError };
      }

      setData((prev) =>
        prev.map((row) => ((row as { id: string }).id === id ? (updated as unknown as Row<T>) : row))
      );
      return { data: updated as unknown as Row<T>, error: null };
    },
    [table]
  );

  const remove = useCallback(
    async (id: string) => {
      const { error: deleteError } = await supabase.from(table).delete().eq('id' as never, id);

      if (deleteError) {
        setError(deleteError.message);
        return { error: deleteError };
      }

      setData((prev) => prev.filter((row) => (row as { id: string }).id !== id));
      return { error: null };
    },
    [table]
  );

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  useEffect(() => {
    if (!realtime) return;

    const channel = supabase
      .channel(`realtime:${String(table)}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: String(table) },
        () => {
          fetchAll();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [realtime, table, fetchAll]);

  return { data, loading, error, create, update, remove, refetch: fetchAll };
}
