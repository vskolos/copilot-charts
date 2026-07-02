import { defineConfig } from 'oxfmt'

export default defineConfig({
  printWidth: 80,
  semi: false,
  singleQuote: true,
  sortTailwindcss: true,
  jsdoc: {
    lineWrappingStyle: 'balance',
  },
  sortImports: {
    groups: [
      ['side_effect', 'side_effect_style'],
      'type-import',
      ['value-builtin', 'value-external'],
      'type-internal',
      'value-internal',
      ['type-parent', 'type-sibling', 'type-index'],
      ['value-parent', 'value-sibling', 'value-index'],
      'unknown',
    ],
  },
  ignorePatterns: [],
})
