import { StyleSheet } from 'react-native';
import { TGetStylesFunctionConfig } from '@theme/types';
import { scaleHeight } from '@utils/layout';

const getModalColorPickerStyles = ({}: TGetStylesFunctionConfig<{
  size: number;
}>) =>
  StyleSheet.create({
    button: {
      marginTop: scaleHeight(20),
    },
  });

export default getModalColorPickerStyles;
