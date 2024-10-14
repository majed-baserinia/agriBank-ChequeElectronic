import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { ReactNode, useMemo } from 'react';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

import useInitialSettingStore from '../../business/stores/initial-setting-store';

interface Props {
	children: ReactNode;
}

const MaterialThemeProvider = ({ children }: Props) => {
	const settings = useInitialSettingStore((s) => s.settings);

	const themeTemplate = createTheme({
		...settings.theme,
		direction: settings.language === 'fa-IR' ? 'rtl' : 'ltr',
		typography: {
			fontFamily: settings.language === 'fa-IR' ? 'IRANSans' : 'Roboto , sans-serif',
			h1Sm: {
				fontFamily: 'inherit',
				fontWeight: 400,
				fontSize: '24px',
				lineHeight: '38.09px'
			},
			h1Md: {
				fontFamily: 'inherit',
				fontWeight: 400,
				fontSize: '32px',
				lineHeight: '50.78px'
			},
			h1Lg: {
				fontFamily: 'inherit',
				fontWeight: 400,
				fontSize: '40px',
				lineHeight: '63.48px'
			},
			bodyXs: {
				fontFamily: 'inherit',
				fontWeight: 400,
				fontSize: '10px',
				lineHeight: '15.87px'
			},
			bodySm: {
				fontFamily: 'inherit',
				fontWeight: 400,
				fontSize: '12px',
				lineHeight: '19.04px'
			},
			bodyMd: {
				fontFamily: 'inherit',
				fontWeight: 400,
				fontSize: '14px',
				lineHeight: '22.22px'
			},
			bodyLg: {
				fontFamily: 'inherit',
				fontWeight: 400,
				fontSize: '16px',
				lineHeight: '25.39px'
			},

			body1: {
				fontFamily: 'inherit',
				fontSize: '14px',
				fontWeight: 400,
				lineHeight: 'normal'
			},

			caption: {
				fontFamily: 'inherit',
				fontSize: '14px',
				lineHeight: '19.04px'
			}
		},

		components: {
			MuiTypography: {
				defaultProps: {
					variantMapping: {
						h1Sm: 'h1',
						h1Md: 'h1',
						h1Lg: 'h1',
						bodyXs: 'p',
						bodySm: 'p',
						bodyMd: 'p',
						bodyLg: 'p'
					}
				}
			},
			MuiButton: {
				styleOverrides: {
					root: {
						padding: '8px 16px'
					},
					sizeSmall: {
						height: '32px',
						borderRadius: 8
					},
					sizeMedium: {
						height: '40px',
						borderRadius: 10
					},
					sizeLarge: {
						height: '48px',
						borderRadius: 16
					}
				},
				variants: [
					{
						props: {
							variant: 'text'
						},
						style: (props) => {
							return {
								'&:focus': {
									border: `1.5px solid ${props.theme.palette.primary.main}`,
									backgroundColor: props.theme.palette.action.hover
								}
							};
						}
					},
					{
						props: {
							variant: 'outlined'
						},
						style: (props) => {
							return {
								fontSize: '14px',
								'&:hover': {
									backgroundColor: props.theme.palette.action.focus
								},
								'&:focus': {
									backgroundColor: props.theme.palette.action.focus
								}
							};
						}
					}
					//add more variants here
					// {
					//   props: { variant: "new varient" },
					//   style: {
					//     textTransform: "none",
					//     border: `2px new varient ${blue[500]}`
					//   }
					// }
				]
			},
			MuiFormControl: {
				styleOverrides: {
					root: {}
				},

				variants: [
					{
						props: {
							variant: 'outlined'
						},
						style: (props) => {
							return {
								'& .MuiOutlinedInput-root': {
									fontSize: '16px',
									'&.Mui-focused fieldset': {
										borderWidth: '2px'
									},
									'&:hover fieldset': {
										borderColor: props.theme.palette.grey[400]
									},
									'&.Mui-error fieldset': {
										borderWidth: '2px',
										borderColor: props.theme.palette.error[400]
									},
									'&.Mui-error:hover fieldset': {
										borderColor: props.theme.palette.error[500]
									}
								},
								'& .MuiFormLabel-root': {
									color: props.theme.palette.grey[300],

									'&.Mui-focused': {
										color: props.theme.palette.grey[400]
									},

									'&.Mui-error': {
										color: props.theme.palette.grey[400]
									}
								}
							};
						}
					}
				]
			}
		}
	});

	const emotionCache = useMemo(() => {
		if (settings.language === 'fa-IR') {
			return createCache({
				key: 'muirtl',
				stylisPlugins: [prefixer, rtlPlugin]
			});
		} else {
			return createCache({ key: 'css' });
		}
	}, [settings.language]);

	return (
		<CacheProvider value={emotionCache}>
			<ThemeProvider theme={themeTemplate}>
				<CssBaseline /* MUI Styles */ />
				{children}
			</ThemeProvider>
		</CacheProvider>
	);
};

export default MaterialThemeProvider;
