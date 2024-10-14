import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	pluginJs.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	pluginReact.configs.flat.recommended,
	eslintPluginPrettierRecommended,
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname
			}
		}
	},
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			],
			'@typescript-eslint/no-floating-promises': 'warn',
			 "@typescript-eslint/no-misused-promises": "off",
			'react/prop-types': [
				'error',
				{
					ignore: ['children', 'className', 'theme', 'variant'],
					skipUndeclared: true
				}
			],
			'react/react-in-jsx-scope': 'off',
			'prettier/prettier': 'warn'
		}
	}
);
