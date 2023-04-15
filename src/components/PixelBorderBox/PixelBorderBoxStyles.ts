import { TGetStylesFunctionConfig } from '@theme/types';
import { moderateScale } from '@utils/layout';
import { StyleSheet } from 'react-native';

const getPixelBorderBoxStyles = ({
  props: { borderColor = '#000', borderWidth = 3 },
}: TGetStylesFunctionConfig<{
  borderColor?: string;
  borderWidth?: number;
}>) =>
  StyleSheet.create({
    container: {
      borderWidth: moderateScale(borderWidth),
      borderColor: 'transparent',
    },
    contentContainer: {
      flex: 1,
    },

    borderPixel: {
      position: 'absolute',
      width: moderateScale(borderWidth),
      height: moderateScale(borderWidth),
      backgroundColor: borderColor,
    },
    borderPixelTopLeft: {
      top: 0,
      left: 0,
    },
    borderPixelTopRight: {
      top: 0,
      right: 0,
    },
    borderPixelBottomLeft: {
      left: 0,
      bottom: 0,
    },
    borderPixelBottomRight: {
      right: 0,
      bottom: 0,
    },

    border: {
      position: 'absolute',
      backgroundColor: borderColor,
    },
    borderTop: {
      top: -moderateScale(borderWidth),
      left: moderateScale(borderWidth),
      right: moderateScale(borderWidth),
      height: moderateScale(borderWidth),
    },
    borderBottom: {
      bottom: -moderateScale(borderWidth),
      left: moderateScale(borderWidth),
      right: moderateScale(borderWidth),
      height: moderateScale(borderWidth),
    },
    borderLeft: {
      top: moderateScale(borderWidth),
      left: -moderateScale(borderWidth),
      width: moderateScale(borderWidth),
      bottom: moderateScale(borderWidth),
    },
    borderRight: {
      top: moderateScale(borderWidth),
      right: -moderateScale(borderWidth),
      width: moderateScale(borderWidth),
      bottom: moderateScale(borderWidth),
    },
  });

export default getPixelBorderBoxStyles;
