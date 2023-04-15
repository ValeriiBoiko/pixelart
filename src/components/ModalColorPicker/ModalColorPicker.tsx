import React, { ForwardRefRenderFunction, useState } from 'react';
import PixelButton from '@components/PixelButton';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ViewProps } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import BottomSheet from '@components/BottomSheet';
import { scaleWidth } from '@utils/layout';
import useStyles from '@hooks/useStyles';
import getModalColorPickerStyles from './ModalColorPickerStyles';

export type TModalColorPickerProps = ViewProps & {
  onSubmit: (value: string) => void;
};

const ModalColorPicker: ForwardRefRenderFunction<
  BottomSheetModal,
  TModalColorPickerProps
> = ({ onSubmit }, forwardedRef) => {
  const { styles } = useStyles(getModalColorPickerStyles);
  const [pickerColor, setPickerColor] = useState('');

  const handleSubmit = () => {
    onSubmit(pickerColor);
  };

  return (
    <BottomSheet ref={forwardedRef}>
      <ColorPicker
        row={false}
        noSnap={true}
        swatches={false}
        shadeWheelThumb={true}
        thumbSize={scaleWidth(30)}
        sliderSize={scaleWidth(30)}
        gapSize={scaleWidth(10)}
        onColorChangeComplete={setPickerColor}
      />

      <PixelButton
        title={'Pick'}
        style={styles.button}
        onPress={handleSubmit}
      />
    </BottomSheet>
  );
};

export default React.memo(React.forwardRef(ModalColorPicker));
