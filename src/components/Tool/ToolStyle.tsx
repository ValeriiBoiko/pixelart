import { TGetStylesFunctionConfig } from '@theme/types';
import { moderateScale, scaleWidth } from '@utils/layout';
import { StyleSheet } from 'react-native';

const getToolStyles = ({
  colors,
  props,
}: TGetStylesFunctionConfig<{
  badgeColor?: string;
  active?: boolean;
}>) =>
  StyleSheet.create({
    container: {
      aspectRatio: 1,
      width: scaleWidth(50),
      opacity: props.active ? 1 : 0.25,
    },
    contentContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    pixelBorderBox: {
      flex: 1,
    },
    badge: {
      borderWidth: 1,
      borderColor: colors.border,
      position: 'absolute',
      top: moderateScale(5),
      left: moderateScale(5),
      height: moderateScale(8),
      width: moderateScale(8),
      borderRadius: moderateScale(8),
      backgroundColor: props.badgeColor,
      opacity: props.badgeColor ? 1 : 0,
    },
  });

export default getToolStyles;
