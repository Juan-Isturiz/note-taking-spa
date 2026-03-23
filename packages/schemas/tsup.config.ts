import { defineConfig } from 'tsup';

export default defineConfig({
 entry: ['src/index.ts'],
 outDir: 'dist',
 format: ['cjs', 'esm'],
 dts: true,
 platform: 'node',
 splitting: false,
 clean: true,
 sourcemap: true,
 shims: true,
 bundle: true,
 skipNodeModulesBundle: true,
});
