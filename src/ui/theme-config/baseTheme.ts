import defaultTheme from '../../assets/defaultTheme.json';

export default async function themeInitializer(themeName: string | null, themeUrl: string) {
	try {
		const url = `${themeUrl}${themeName ? themeName : 'light'}.json`;

		const rawRes = await fetch(url);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const res = await rawRes.json();
		const theme = { ...defaultTheme };
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
		theme.palette = res.palette;
		return theme;
	} catch (_) {
		return defaultTheme;
	}
}
