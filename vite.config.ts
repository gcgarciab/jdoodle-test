import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
    proxy: {
      // '/ws': {
      //   target: 'https://api.jdoodle.com/ws/v1/stomp',
      //   changeOrigin: true,
      //   secure: false,
      //   ws: true,
      //   rewrite: path => path.replace(/^\/ws/, '')
      // },
      // '/proxy': {
      //   target: 'https://api.jdoodle.com/proxy/v1',
      //   changeOrigin: true,
      //   secure: false,
      //   rewrite: path => path.replace(/^\/proxy/, '')
      // },
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

    Components({
      dirs: [
        'src/common/components',
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
