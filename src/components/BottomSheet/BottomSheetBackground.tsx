import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import Animated from 'react-native-reanimated';

const BotomSheetBackground: React.FC<BottomSheetBackgroundProps> = ({
  style,
}) => {
  const { colors } = useTheme();

  const containerStyle = useMemo(
    () => [style, { backgroundColor: colors.card }],
    [style, colors.background],
  );

  return <Animated.View pointerEvents="none" style={containerStyle} />;
};

export default React.memo(BotomSheetBackground);
