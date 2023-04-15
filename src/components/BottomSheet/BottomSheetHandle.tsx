import { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import useStyles from '@hooks/useStyles';
import React from 'react';
import { View } from 'react-native';
import getBottomSheetStyles from './BottomSheetStyles';

const BottomSheetHandle: React.FC<BottomSheetBackgroundProps> = () => {
  const { styles } = useStyles(getBottomSheetStyles);

  return (
    <View style={styles.handle}>
      <View style={styles.handlePixel} />
      <View style={styles.handleBody} />
      <View style={styles.handlePixel} />
    </View>
  );
};

export default React.memo(BottomSheetHandle);
