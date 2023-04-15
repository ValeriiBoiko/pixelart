import { FC, ReactNode } from 'react';
import {
  Text,
  TouchableOpacity,
  ViewStyle,
  TouchableOpacityProps,
  StyleProp,
  StyleSheet,
} from 'react-native';
import getPixelButtonStyles from './PixelButtonStyles';
import Icon from '@components/Icon';
import PixelBorderBox from '@components/PixelBorderBox';
import useStyles from '@hooks/useStyles';
import { scaleWidth } from '@utils/layout';

export type TPixelButtonProps = TouchableOpacityProps & {
  title?: string;
  icon?: string | (() => ReactNode);
  borderColor?: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const PixelButton: FC<TPixelButtonProps> = ({
  title,
  icon,
  style,
  borderColor,
  children,
  contentContainerStyle,
  ...props
}) => {
  const { styles, colors } = useStyles(getPixelButtonStyles, {
    borderColor,
    withIcon: !!icon,
  });

  const renderIcon = () => {
    if (!icon) {
      return null;
    }

    if (typeof icon === 'function') {
      return icon();
    }

    return <Icon name={icon} size={scaleWidth(18)} color={colors.text} />;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={[styles.container, style]}
      onPress={props.onPress}>
      <PixelBorderBox
        borderColor={borderColor}
        style={styles.borderBox}
        contentContainerStyle={StyleSheet.compose(
          styles.contentContainer,
          contentContainerStyle,
        )}>
        {renderIcon()}
        {!!title && <Text style={styles.title}>{title}</Text>}
      </PixelBorderBox>
    </TouchableOpacity>
  );
};

export default PixelButton;
