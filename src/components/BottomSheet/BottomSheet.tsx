import {
  BottomSheetModal,
  BottomSheetModalProps,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import useStyles from '@hooks/useStyles';
import React, { useMemo } from 'react';
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import getBottomSheetStyles from './BottomSheetStyles';
import BottomSheetHandle from './BottomSheetHandle';
import BottomSheetBackground from './BottomSheetBackground';
import BottomSheetBackdrop from './BottomSheetBackdrop';
import { StyleProp } from 'react-native';

export type TBottomSheetProps = Partial<BottomSheetModalProps> & {
  contentContainerStyle?: StyleProp<ViewStyle>;
  children: ViewProps['children'];
};

const BottomSheet: React.ForwardRefRenderFunction<
  BottomSheetModal,
  TBottomSheetProps
> = ({ children, contentContainerStyle, style, ...props }, forwardedRef) => {
  const { styles } = useStyles(getBottomSheetStyles);

  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  return (
    <BottomSheetModal
      ref={forwardedRef}
      backdropComponent={BottomSheetBackdrop}
      backgroundComponent={BottomSheetBackground}
      handleComponent={BottomSheetHandle}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      {...props}>
      <View
        style={StyleSheet.compose(
          styles.contentContainer,
          contentContainerStyle,
        )}
        onLayout={handleContentLayout}>
        {children}
      </View>
    </BottomSheetModal>
  );
};

export default React.memo(React.forwardRef(BottomSheet));
