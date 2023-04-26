/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{hmtl,js,svelte,ts}'],
	theme: {
		colors: {
			input: {
				DEFAULT: 'rgb(245,245,245)',
				disabled: '#DDDDDD'
			},
			description: '#757575',
			placeholder: '#8E8B8B',
			primary: {
				DEFAULT: 'rgb(116,183,67)',
				light: 'rgb(193,220,165)',
				dark: 'rgb(104,164,61)'
			},
			secondary: {
				DEFAULT: 'rgb(79,143,205)',
				light: 'rgb(176,196,231)',
				white: 'rgb(239,243,251)',
				dark: 'rgb(51,108,163)',
				active: 'rgb(171,255,255)'
			},
			tertiary: {
				DEFAULT: 'rgb(254,213,0)',
				dark: 'rgb(228,192,0)',
				light: 'rgb(255,238,176)'
			},
			accent: {
				DEFAULT: 'rgb(190,242,100)',
				light: 'rgb(223,249,180)',
				dark: 'rgb(156,236,19)'
			},
			neutral: {
				DEFAULT: 'rgb(29,29,27)',
				light: 'rgb(86,101,129)'
			},
			warning: {
				DEFAULT: 'rgb(251,189,35)',
				light: 'rgb(252,215,120)'
			},
			error: {
				DEFAULT: 'rgb(248,114,114)',
				light: 'rgb(252,197,197)'
			},
			black: 'rgb(29,29,27)',
			'min-contrast-gray': 'rgb(112,112,112)',
			'interactive-surface': 'rgb(232,240,246)',
			'black-text': 'rgb(29,33,50)',
			'subtle-text': 'rgb(142,139,139)',
			divider: 'rgb(226,226,226)',
			white: '#fff'
		},
		extend: {
			fontFamily: {
				sans: 'Inter'
			},
			gridTemplateColumns: {
				'under-rep': '1fr 1fr auto'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
