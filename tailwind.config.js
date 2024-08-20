// import daisyui from 'daisyui';
//
// /** @type {import('tailwindcss').Config} */
// export default {
// 	content: ['./src/**/*.{html,js,svelte,ts}'],
// 	theme: {
// 		extend: {}
// 	},
// 	daisyui: {
// 		themes: ['bumblebee']
// 	},
// 	plugins: [daisyui]
// };
//
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: ['emerald', 'dim']
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require('daisyui')]
};
