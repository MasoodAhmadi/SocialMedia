export const themePallate = [
  {
    id: 1,
    name: 'default',
    primary: '#E06F07',
    secondary: '#FFA858',
    themeIdentity: 'defaultTheme',
  },
  // {
  //   id: 2,
  //   name: 'purple',
  //   primary: '#6610f2',
  //   secondary: '#6f42c1',
  //   themeIdentity: 'purpleTheme',
  // },
];

export const colors = {
  dark: '#272742',
  grey: '#EEF3F6',
  link: '#0d6efd',
  bright: '#ffffff',
  danger: '#AB003C',
  greyOpacity: '#adb5bd',
  darkOpacity: '#00000040',
  disableColor: '#EBEBE4',
};

export const colorsDefault = {
  primary: themePallate[0].primary,
  secondary: themePallate[0].secondary,
  basic: colors,
};

// export const colorsPurple = {
//   primary: themePallate[1].primary,
//   secondary: themePallate[1].secondary,
//   basic: colors,
// };

export const themes = {
  defaultTheme: colorsDefault,
  // purpleTheme: colorsPurple,
};
