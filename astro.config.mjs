// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  build: {
    assets: '_astro',
    assetsPrefix: '.',
    inlineStylesheets: 'never',
    format: 'preserve'
  },
  compressHTML: false,
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            // Mantener nombres originales de archivos CSS/JS
            if (assetInfo.name?.endsWith('.css')) {
              return 'css/[name][extname]';
            }
            if (assetInfo.name?.endsWith('.js')) {
              return 'js/[name][extname]';
            }
            return 'assets/[name][extname]';
          }
        }
      }
    }
  }
});
