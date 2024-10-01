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
        describe: 'readonly',
        expect: 'readonly',
        test: 'readonly',
      },
    },
  },
  pluginJs.configs.recommended,
];
