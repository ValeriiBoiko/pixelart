import { TGetStylesFunctionConfig } from '@theme/types';
import { moderateScale, scaleHeight, scaleWidth } from '@utils/layout';
import { StyleSheet } from 'react-native';

const getBottomSheetStyles = ({ colors }: TGetStylesFunctionConfig) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      paddingHorizontal: scaleWidth(20),
      paddingVertical: scaleHeight(20),
    },

    handle: {
      height: scaleHeight(20),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    handlePixel: {
      width: moderateScale(3),
      height: moderateScale(3),
      backgroundColor: colors.text,
    },
    handleBody: {
      width: scaleWidth(50),
      height: moderateScale(6),
      backgroundColor: 'black',
    },
  });

export default getBottomSheetStyles;
