import React, { FC } from 'react';
import { StyleProp, ViewProps, View, ViewStyle } from 'react-native';
import useStyles from '@hooks/useStyles';
import getPixelBorderBoxStyles from './PixelBorderBoxStyles';

export type TPixelBorderBoxProps = ViewProps & {
  borderColor?: string;
  borderWidth?: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const PixelBorderBox: FC<TPixelBorderBoxProps> = ({
  style,
  children,
  borderColor,
  borderWidth,
  contentContainerStyle,
  ...props
}) => {
  const { styles } = useStyles(getPixelBorderBoxStyles, {
    borderColor,
    borderWidth,
  });

  return (
    <View style={[styles.container, style]} {...props}>
      <View style={[styles.contentContainer, contentContainerStyle]}>
        {children}
      </View>

      <View style={[styles.border, styles.borderTop]} />
      <View style={[styles.border, styles.borderRight]} />
      <View style={[styles.border, styles.borderBottom]} />
      <View style={[styles.border, styles.borderLeft]} />

      <View style={[styles.borderPixel, styles.borderPixelTopLeft]} />
      <View style={[styles.borderPixel, styles.borderPixelTopRight]} />
      <View style={[styles.borderPixel, styles.borderPixelBottomRight]} />
      <View style={[styles.borderPixel, styles.borderPixelBottomLeft]} />
    </View>
  );
};

export default React.memo(PixelBorderBox);
