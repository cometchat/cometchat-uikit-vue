import { defineConfig } from 'vite';
import dts from "vite-plugin-dts";
import fs from 'fs';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const entryPoint = './src/public.api.ts';

function deleteDistFolder() {
  const distPath = path.resolve(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    fs.rmdirSync(distPath, { recursive: true });
  }
}

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all components starting with these tags as custom elements
          isCustomElement: (tag) =>
            tag.startsWith('cometchat-') ||
            ['smart-replies'].includes(tag) ||
            ['stickers-keyboard'].includes(tag) ||
            ['create-poll'].includes(tag) ||
            ['polls-bubble'].includes(tag) ||
            ['image-moderation'].includes(tag) ||
            ['link-preview'].includes(tag)
        },
      },
    }),
    vueJsx(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    cssCodeSplit:false,
    minify: 'esbuild',
    lib: {
      entry: entryPoint,
      name: '@cometchat/chat-uikit-vue',
      fileName: 'index',
      formats: ['es', 'umd',"cjs"],
        },
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue',
          '@cometchat/uikit-elements': 'CometChatUIKitElements',
          '@cometchat/uikit-resources': 'CometChatUIKitResources',
          '@cometchat/uikit-shared': 'CometChatUIKitShared',
          '@cometchat/chat-sdk-javascript': 'CometChat',
        },
        inlineDynamicImports: true,
      },
      plugins: [
        {
          name: 'delete-dist-folder',
          buildStart() {
            // Call the function to delete the dist folder
            deleteDistFolder();
          },
        },
      ],
      external: ['vue','@cometchat/chat-sdk-javascript','@cometchat/uikit-elements','@cometchat/uikit-resources','@cometchat/uikit-shared'],
    },
  },
});