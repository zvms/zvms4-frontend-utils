import sucrease from '@rollup/plugin-sucrase'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import { dts } from 'rollup-plugin-dts'
import terser from '@rollup/plugin-terser'
import alias from '@rollup/plugin-alias'
import { defineConfig } from 'rollup'
import { resolve } from 'path'

export default defineConfig({
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/main.js',
      format: 'esm',
      sourcemap: true,
      plugins: [
        replace({
          'process.env.NODE_ENV': JSON.stringify('development')
        })
      ]
    },
    {
      file: 'dist/main.min.js',
      format: 'esm',
      sourcemap: true,
      plugins: [
        terser(),
        replace({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      ]
    },
    {
      file: 'dist/index.d.ts',
      format: 'es',
      plugins: [dts()]
    }
  ],
  plugins: [
    sucrease({
      exclude: ['node_modules/**'],
      transforms: ['typescript']
    }),
    alias({
      entries: [{ find: '@', replacement: resolve('src', 'app') }]
    }),
    babel()
  ]
})
