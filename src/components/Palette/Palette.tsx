import { BottomSheetModal } from '@gorhom/bottom-sheet';
import useLayout from '@hooks/useLayout';
import useStyles from '@hooks/useStyles';
import React, { FC, useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import getPaletteStyles from './PaletteStyles';
import Tool from '@components/Tool/Tool';
import ColorSample from '@components/ColorSample/ColorSample';
import ModalColorPicker from '@components/ModalColorPicker';
import { scaleWidth } from '@utils/layout';

export type TPaltterProps = ViewProps & {
  value: string[];
  onAddColor: (value: string) => void;
  onPickColor: (value: string) => void;
};

const SIZE = 40;

const Palette: FC<TPaltterProps> = ({
  value,
  onAddColor,
  onPickColor,
  style,
  ...props
}) => {
  const [layout, onLayout] = useLayout();
  const scrollRef = useRef<ScrollView | null>(null);
  const bottomSheetRef = useRef<BottomSheetModal | null>(null);
  const { styles } = useStyles(getPaletteStyles, { size: SIZE });

  const colorSampleStyle = useMemo(() => {
    const result = {
      marginLeft: scaleWidth(10),
    };

    if (layout?.width) {
      let numberOfBlocks = Math.floor(layout.width / SIZE);
      const rest = layout.width % SIZE;

      if (rest / numberOfBlocks < 5) {
        numberOfBlocks -= 1;
      }

      result.marginLeft =
        (layout.width - numberOfBlocks * SIZE) / (numberOfBlocks - 1);
    }

    return result;
  }, [layout?.width]);

  const onContentSizeChange = useCallback(
    () => scrollRef.current?.scrollToEnd({ animated: true }),
    [],
  );

  const onOpenPicker = useCallback(() => {
    bottomSheetRef.current?.present();
    bottomSheetRef.current?.expand();
  }, []);

  const onPickerSubmit = useCallback(
    (color: string) => {
      onAddColor(color);
      bottomSheetRef.current?.dismiss();
    },
    [onAddColor],
  );

  const colorSamples = useMemo(
    () =>
      value.map((color, index) => (
        <ColorSample
          key={index}
          color={color}
          size={SIZE}
          style={index ? colorSampleStyle : null}
          onPress={onPickColor}
        />
      )),
    [value, SIZE, colorSampleStyle, onPickColor],
  );

  return (
    <View style={StyleSheet.compose(styles.container, style)} {...props}>
      <ScrollView
        onLayout={onLayout}
        ref={scrollRef}
        contentContainerStyle={styles.samplesScrollView}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        onContentSizeChange={onContentSizeChange}>
        {colorSamples}
      </ScrollView>

      <Tool
        active
        icon={'target'}
        style={styles.pickerTool}
        onPress={onOpenPicker}
      />

      <ModalColorPicker ref={bottomSheetRef} onSubmit={onPickerSubmit} />
    </View>
  );
};

export default Palette;
