import { TextStyle } from "react-native/types"

type TTypography = {
  h1: TextStyle,
  h2: TextStyle,
  h3: TextStyle,
  h4: TextStyle,
  h5: TextStyle,
  h6: TextStyle,
  body1: TextStyle,
  body2: TextStyle,
  subtitle1: TextStyle,
  subtitle2: TextStyle,
  button: TextStyle,
  caption: TextStyle,
}

export const FontFamily = {
  POPPINS_BLACK: 'Poppins-Black',
  POPPINS_BOLD: 'Poppins-Bold',
  POPPINS_EXTRABOLD: 'Poppins-Extrabold',
  POPPINS_EXTRALIGHT: 'Poppins-Extralight',
  POPPINS_LIGHT: 'Poppins-Light',
  POPPINS_MEDIUM: 'Poppins-Medium',
  POPPINS_REGULAR: 'Poppins-Regular',
  POPPINS_SEMIBOLD: 'Poppins-Semibold',
  POPPINS_THIN: 'Poppins-Thin',
}

export const Typography: TTypography = {
  h1: {
    fontFamily: FontFamily.POPPINS_LIGHT,
    fontSize: 96,
    letterSpacing: -1.5
  },
  h2: {
    fontFamily: FontFamily.POPPINS_LIGHT,
    fontSize: 60,
    letterSpacing: -0.5
  },
  h3: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 48,
    letterSpacing: 0
  },
  h4: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 34,
    letterSpacing: 0.25
  },
  h5: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 24,
    letterSpacing: 0
  },
  h6: {
    fontFamily: FontFamily.POPPINS_MEDIUM,
    fontSize: 20,
    letterSpacing: 0.15
  },
  subtitle1: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 16,
    letterSpacing: 0.15
  },
  subtitle2: {
    fontFamily: FontFamily.POPPINS_MEDIUM,
    fontSize: 14,
    letterSpacing: 0.1
  },
  body1: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 16,
    letterSpacing: 0.5
  },
  body2: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 14,
    letterSpacing: 0.25
  },
  button: {
    fontFamily: FontFamily.POPPINS_MEDIUM,
    fontSize: 14,
    letterSpacing: 1.25
  },
  caption: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 12,
    letterSpacing: 0.4
  },
}