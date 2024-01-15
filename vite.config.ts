import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// Plugins
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  plugins: [
    vue(),

    // https://github.com/antfu/unplugin-auto-import
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
        'vue-i18n',
        {
          pinia: ['defineStore', 'storeToRefs'],
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
          '@pinia/testing': ['createTestingPinia'],
          '@vue/test-utils': ['mount', 'shallowMount', 'ComponentMountingOptions'],
        },
      ],

      dirs: [
        './src/common/composables/**',
        './src/common/constants/**',
        './src/common/enums/**',
        './src/common/interfaces/**',
        './src/common/utils/**',
        './src/config/**',
        './src/mocks/**',
        './src/plugins/**',
        './src/stores/**',
      ],
    }),

    Components({
      dirs: [
        'src/common/components',
        'src/common/layouts',
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
