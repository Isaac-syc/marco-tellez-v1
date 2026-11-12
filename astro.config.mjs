import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  build: { format: 'file' },
  server: { port: 4321, host: false },
  devToolbar: { enabled: false },
});
