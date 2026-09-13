import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    server: {
        host: true,
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://172.20.233.50:8000',
                changeOrigin: true,
                rewrite: function (path) { return path.replace(/^\/api/, ''); },
            },
        },
    },
});
