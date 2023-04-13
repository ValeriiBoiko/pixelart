import { TGetStylesFunctionConfig } from '@theme/types';
import { FontFamily, Typography } from '@theme/typography';
import { scaleHeight } from '@utils/layout';
import { StyleSheet } from 'react-native';

const getEmptyScreenPlaceholderStyles = ({
  colors,
}: TGetStylesFunctionConfig) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: scaleHeight(20),
    },
    icon: {
      color: colors.text,
      fontSize: scaleHeight(40),
      marginBottom: scaleHeight(15),
    },
    message: {
      ...Typography.body2,
      textAlign: 'center',
      fontFamily: FontFamily.SILKSCREEN_REGULAR,
      color: colors.text,
    },
  });

export default getEmptyScreenPlaceholderStyles;
