import path from "path"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
    plugins: [
        TanStackRouterVite({
            routesDirectory: "./app/routes",
            generatedRouteTree: "./app/routeTree.gen.ts",
        }),
        react(),
    ],
    // Add this resolve block
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./app"),
        },
    },
    server: {
        port: 5173,
    },
});