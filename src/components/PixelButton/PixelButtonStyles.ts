import { TGetStylesFunctionConfig } from '@theme/types';
import { FontFamily, Typography } from '@theme/typography';
import { moderateScale, scaleHeight, scaleWidth } from '@utils/layout';
import { StyleSheet } from 'react-native';

const getPixelButtonStyles = ({
  colors,
  props,
}: TGetStylesFunctionConfig<{
  borderColor?: string;
  withIcon?: boolean;
}>) =>
  StyleSheet.create({
    container: {
      height: scaleHeight(50),
      borderColor: 'transparent',
    },
    borderBox: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: colors.card,
      paddingHorizontal: scaleWidth(10),
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    title: {
      ...Typography.body2,
      marginHorizontal: props.withIcon ? scaleWidth(10) : 0,
      fontFamily: FontFamily.SILKSCREEN_BOLD,
      color: colors.text,
    },
  });

export default getPixelButtonStyles;
