import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import useStyles from '@hooks/useStyles';
import getPaletteStyles from './ColorSampleStyles';
import PixelButton, {
  TPixelButtonProps,
} from '@components/PixelButton/PixelButton';

export type TPaltterProps = Partial<Omit<TPixelButtonProps, 'onPress'>> & {
  color: string;
  size?: number;
  onPress: (value: string) => void;
};

const ColorSample: FC<TPaltterProps> = ({
  size = 40,
  color,
  onPress,
  style,
  ...props
}) => {
  const { styles } = useStyles(getPaletteStyles, { size, color });

  return (
    <PixelButton
      style={StyleSheet.compose(styles.container, style)}
      contentContainerStyle={styles.contentContainer}
      onPress={() => onPress(color)}
      {...props}
    />
  );
};

export default React.memo(ColorSample);
