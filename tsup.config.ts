/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  entry: ['src/main.ts'],
  // Uncomment the following line to enable bundling node_modules
  // noExternal: [/.*/],
});
