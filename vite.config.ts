import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import postscssNested from "postcss-nested";
import postcssModules from "postcss-modules";
// import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';
// import { chunkSplitPlugin } from "vite-plugin-chunk-split";
// https://vitejs.dev/config/

type ViteConfigInput = {
  mode: string;
  command: string;
};
export default (args: ViteConfigInput) => {
  const generateScopedName =
    args.mode === "production" ? "[hash:base64:6]" : "[local]__[hash:base64:6]";
  return defineConfig({
    plugins: [
      react(),
      // ckeditor5( { theme: require.resolve( '@ckeditor/ckeditor5-theme-lark' ) } )
      // chunkSplitPlugin({
      //   strategy: "single-vendor",
      //   customChunk: (args) => {
      //     // files into pages directory is export in single files
      //     let { file, id, moduleId, root }: any = args;
      //     if (file.startsWith("src/pages/")) {
      //       file = file.substring(4);
      //       file = file.replace(/\.[^.$]+$/, "");
      //       return file;
      //     }
      //     return null;
      //   },
      //   customSplitting: {
      //     // `react` and `react-dom` will be bundled together in the `react-vendor` chunk (with their dependencies, such as object-assign)
      //     "react-vendor": ["react", "react-dom"],
      //     // Any file that includes `utils` in src dir will be bundled in the `utils` chunk
      //     utils: [/src\/utils/],
      //   },
      // }),
    ],
    resolve: {
      alias: [{ find: "#", replacement: "/src" }],
    },
    css: {
      modules: {
        localsConvention: "camelCase",
        generateScopedName: generateScopedName,
      },
      postcss: {
        plugins: [autoprefixer(), postscssNested()],
      },
    },
    // optimizeDeps: {
    //   include: ["ckeditor5-custom-build"],
    // },
    // build: {
    //   commonjsOptions: { exclude: ["ckeditor5-custom-build"], include: [] },
    // },
  });
};
