import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
    proxy: {
      '/ws': {
        target: 'https://api.jdoodle.com/',
        changeOrigin: true,
        ws: true,
        rewrite: path => path.replace(/^\/ws/, '')
      },
      '/api': {
        target: 'https://api.jdoodle.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      },
    }
  },

  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
      "xmlhttprequest-ssl": "./node_modules/engine.io-client/lib/xmlhttprequest.js"
    },
  },

  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),

    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
      imports: [
        'vue',
        'vue-router',
        // 'vitest',
        {
          pinia: [
            'createPinia',
            'defineStore',
            'setActivePinia',
            'storeToRefs',
          ],
          '@vuelidate/core': ['useVuelidate'],
          '@vuelidate/validators': [
            'minLength',
            'required',
            'email',
            'requiredIf',
            'numeric',
            'maxLength',
            'helpers',
            'sameAs',
          ],
          '@vue/test-utils': ['mount', 'shallowMount'],
          '@pinia/testing': ['createTestingPinia'],
        },
      ],
      dirs: [
        './src/common/composables/**',
        './src/common/constants/**',
        './src/common/enums/**',
        './src/common/interfaces/**',
        './src/common/utils/**',
        './src/mocks/**',
        './src/modules/**',
        './src/plugins/**',
        './src/router/**',
        './src/stores/**',
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),

    Components({
      dirs: [
        'src/common/components',
        'src/modules',
        'src/views',
      ],
      dts: 'src/components.d.ts',
      extensions: ['vue'],
      deep: true,
      types: [
        {
          from: 'vue-router',
          names: ['RouterLink', 'RouterView'],
        },
      ],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
  ],
})
