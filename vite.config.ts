/// <reference lib="deno.ns" />
import { defineConfig } from 'vite';
import deno from '@deno/vite-plugin';
import react from '@vitejs/plugin-react';
import { generatePagePath } from './vite/watch.ts';


// https://vite.dev/config/
const __dirname = '.';
export default defineConfig({
  plugins: [
    deno(),
    react(),
    {
      // name: 'watcher-plugin',
      configureServer(_server: any) {
        async function f() {
          const watcher = Deno.watchFs("./src/pages", { recursive: true });
          for await (const event of watcher) {
            const path = event.paths[0];
            // console.log(">>>> event", event, event.kind, event.paths);
            if (path.match(/\.tsx/)) {
              console.log(`File ${path} has been ${event}`);
              generatePagePath();
            }
          }

        }
        f();
        console.log(111112);
      },
    },
  ],
  resolve: {
    alias: {
      '@': __dirname + '/src',
      '#root': __dirname,
    }
  },
  server: {
    host: "0.0.0.0",
  },
  // @ts-ignore: 
  test: {
    environment: 'jsdom',
  },

});
