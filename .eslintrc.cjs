module.exports = {
	'env': {
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
	],
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module',
		'rules': {
			'no-unused-vars': ['warn'],
			'indent': [
				'error',
				'tab'
			],
			'linebreak-style': [
				'error',
				'unix'
			],
			'quotes': [
				'error',
				'single'
			],
			'semi': [
				'error',
				'never'
			]
		}
	}
}