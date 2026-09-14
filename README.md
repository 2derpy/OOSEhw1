# Public Todo App (Supabase + React + TypeScript)

A minimal todo list with no authentication — anyone with the app URL can
add, complete, or delete todos. Multiple browser tabs/users stay in sync
via Supabase realtime.

## Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor (or via the CLI) to create
   the `todos` table and its policies.
3. Copy `.env.example` to `.env` and fill in your project URL and anon key
   (Project Settings → API).
4. Install and run:
   ```bash
   npm install
   npm run dev
   ```

## How it works

- `src/hooks/useTodos.ts` — fetch, add, toggle, delete, plus a realtime
  subscription so all connected clients update live.
- `src/components/TodoForm.tsx` — add new todos.
- `src/components/TodoList.tsx` — check off or remove existing ones.
- `src/App.tsx` — wires it together, shows a remaining-count footer.

## ⚠️ Security note

There's no auth, so the RLS policies in `schema.sql` are wide open
(`using (true)`) — anyone holding your Supabase anon key can read, edit,
or delete every todo in the table. That's fine for a demo, shared scratch
list, or internal tool, but:

- Don't put anything sensitive in a todo title.
- If you later want per-user todos, add a `user_id` column, enable
  Supabase Auth, and tighten the policies to check `auth.uid() = user_id`
  (see the earlier CRUD template for that pattern).
- Consider rate-limiting or a CAPTCHA if this will be exposed publicly,
  since anyone can also flood the table with inserts.
