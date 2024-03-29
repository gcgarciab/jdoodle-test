import viteConfig from './vite.config';
import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      environmentOptions: {
        jsdom: {
          url: 'http://localhost/',
        },
      },
      setupFiles: ['./vitest.setup.ts'],
      include: ['src/**/*.test.ts'],
      exclude: [...configDefaults.exclude, 'e2e/*'],
      server: {
        deps: {
          inline: ['@vue', 'vue-router', 'quasar', '@vueuse'],
        },
      },
      silent: true,
      coverage: {
        provider: 'v8',
        exclude: ['src/mocks/**', 'src/**/*.test'],
      },
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
);
