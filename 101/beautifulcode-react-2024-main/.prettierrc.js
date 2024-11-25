/**
 * @type {import("prettier").Options}
 */
const config = {
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  printWidth: 120,
  tabWidth: 2,
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
};

module.exports = config;
