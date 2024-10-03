import globals from "globals";
import pluginJs from '@eslint/js';


export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    files: [
      '__tests__/**/*.js'
    ],
    languageOptions: {
      globals: {
        ...globals.jest
      },
    },
  },
  pluginJs.configs.recommended,
];
