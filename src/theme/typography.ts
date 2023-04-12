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

  SILKSCREEN_REGULAR: 'Silkscreen-Regular',
  SILKSCREEN_BOLD: 'Silkscreen-Bold',
}

export const Typography: TTypography = {
  h1: {
    fontFamily: FontFamily.POPPINS_LIGHT,
    fontSize: 96,
    lineHeight: 96 * 1.5,
    letterSpacing: -1.5
  },
  h2: {
    fontFamily: FontFamily.POPPINS_LIGHT,
    fontSize: 60,
    lineHeight: 60 * 1.5,
    letterSpacing: -0.5
  },
  h3: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 48,
    lineHeight: 48 * 1.5,
    letterSpacing: 0
  },
  h4: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 34,
    lineHeight: 34 * 1.5,
    letterSpacing: 0.25
  },
  h5: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 24,
    lineHeight: 24 * 1.5,
    letterSpacing: 0
  },
  h6: {
    fontFamily: FontFamily.POPPINS_MEDIUM,
    fontSize: 20,
    lineHeight: 20 * 1.5,
    letterSpacing: 0.15
  },
  subtitle1: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    letterSpacing: 0.15
  },
  subtitle2: {
    fontFamily: FontFamily.POPPINS_MEDIUM,
    fontSize: 14,
    lineHeight: 14 * 1.5,
    letterSpacing: 0.1
  },
  body1: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 16,
    lineHeight: 16 * 1.5,
    letterSpacing: 0.5
  },
  body2: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 14,
    lineHeight: 14 * 1.5,
    letterSpacing: 0.25
  },
  button: {
    fontFamily: FontFamily.POPPINS_MEDIUM,
    fontSize: 14,
    lineHeight: 14 * 1.5,
    letterSpacing: 1.25
  },
  caption: {
    fontFamily: FontFamily.POPPINS_REGULAR,
    fontSize: 12,
    lineHeight: 12 * 1.5,
    letterSpacing: 0.4
  },
}