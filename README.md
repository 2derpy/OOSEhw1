Running the project:

This site is deployed on github pages: https://2derpy.github.io/OOSEhw1/.

If a local instance is desired follow these instructions:

1. Unzip the file
2. Ensure pnpm is installed (follow the directions here, depending on the machine: https://pnpm.io/installation)
3. In the terminal instance of the project folder, run
    pnpm install
    pnpm run dev

and click on the localhost link in the CLI.

Alternatively, if the steps above do not work, you can clone my repository here -> https://github.com/2derpy/OOSEhw1.git,

install pnpm, and run pnpm install and pnpm run dev.

Tech stack:

This project used React/Typescript for frontend, and Supabase for backend.
Vite was used for the build tool and dev server.

React/Typescript was used because it offers static type-safety. Additionally, React makes good use of prop drilling with TypeScript interfaces.

Supabase was chosen because of its generous limits, and additionally because I would not have to implement a complete backend by myself

Vite was used because of fast local server refresh, as well as being a general-purpose build tool for github pages