import { TGetStylesFunctionConfig } from '@theme/types';
import { scaleWidth } from '@utils/layout';
import { StyleSheet } from 'react-native';

const getColorSampleStyles = ({
  props: { size, color },
}: TGetStylesFunctionConfig<{ size: number; color: string }>) =>
  StyleSheet.create({
    container: {
      aspectRatio: 1,
      width: scaleWidth(size),
    },
    contentContainer: {
      backgroundColor: color,
    },
  });

export default getColorSampleStyles;
