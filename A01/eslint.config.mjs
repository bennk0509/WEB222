import globals from 'globals';
import pluginJs from '@eslint/js';
import vitest from '@vitest/eslint-plugin';

export default [
  {
    files: ['**/*.js'],
    languageOptions: { sourceType: 'module' },
    rules: {
      /* Prefer === to == and !== to !=, but only warn */
      eqeqeq: 'warn',
      /* Prefer ; use, but only warn (prettier will fix) */
      semi: 'warn',
      /* Allow console.*() */
      'no-console': 'off',
      /* Allow debugger; */
      'no-debugger': 'off',
      /* Warn when using blocking alert, prompt, etc, but allow */
      'no-alert': 'warn',
      /* Warn when using an unnecessary } else { after a return */
      'no-else-return': 'warn',
      /* Ignore variables not declared at top of scope */
      'vars-on-top': 'off',
      /* Don't bother checking linebreaks, prettier will fix */
      'linebreak-style': 'off'
    }
  },
  {
    files: ['src/**.test.js'],
    plugins: { vitest },
    rules: { ...vitest.configs.recommended.rules },
    settings: {
      vitest: {
        typecheck: false
      }
    }
  },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended
];
