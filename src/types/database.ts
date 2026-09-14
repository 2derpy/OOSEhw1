// Mirrors supabase/schema.sql. Regenerate with:
//   npx supabase gen types typescript --project-id <your-project-id> > src/types/database.ts

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          id: string;
          title: string;
          description?: string;
          date: string;
          is_complete: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string;
          date: string;
          is_complete?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          date: string;
          is_complete?: boolean;
          created_at?: string;
        };
      };
    };
  };
}

export type Todo = Database['public']['Tables']['todos']['Row'];
export type TodoInsert = Database['public']['Tables']['todos']['Insert'];
export type TodoUpdate = Database['public']['Tables']['todos']['Update'];
