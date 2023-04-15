import { TGetStylesFunctionConfig } from '@theme/types';
import { StyleSheet } from 'react-native';
import { scaleWidth } from '@utils/layout';

const getPaletteStyles = ({
  props,
}: TGetStylesFunctionConfig<{ size: number }>) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginHorizontal: scaleWidth(20),
    },
    samplesScrollView: {
      flexGrow: 1,
      justifyContent: 'flex-end',
    },
    pickerTool: {
      aspectRatio: 1,
      width: scaleWidth(props.size),
      marginLeft: scaleWidth(props.size),
    },
  });

export default getPaletteStyles;
