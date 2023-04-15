import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import {
  BottomSheetBackdropProps,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const BottomSheetBackdrop = ({
  animatedIndex,
  style,
}: BottomSheetBackdropProps) => {
  const modal = useBottomSheetModal();

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 0.5],
      Extrapolate.CLAMP,
    ),
  }));

  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: 'black',
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle],
  );

  const onPress = () => {
    modal.dismiss();
  };

  return (
    <Animated.View style={containerStyle}>
      <Pressable style={{ flex: 1 }} onPress={onPress} />
    </Animated.View>
  );
};

export default React.memo(BottomSheetBackdrop);
