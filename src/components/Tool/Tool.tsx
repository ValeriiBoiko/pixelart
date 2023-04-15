import { FC } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import Icon from '@components/Icon';
import PixelBorderBox from '@components/PixelBorderBox';
import useStyles from '@hooks/useStyles';
import getToolStyles from './ToolStyle';
import { moderateScale } from '@utils/layout';

type TToolProps = Partial<TouchableOpacityProps> & {
  icon: string;
  active?: boolean;
  badgeColor?: string;
};

const Tool: FC<TToolProps> = ({
  badgeColor,
  active,
  icon,
  style,
  ...props
}) => {
  const { styles } = useStyles(getToolStyles, { badgeColor, active });

  return (
    <TouchableOpacity
      style={StyleSheet.compose(styles.container, style)}
      {...props}>
      <PixelBorderBox
        style={styles.pixelBorderBox}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.badge} />
        <Icon name={icon} size={moderateScale(16)} />
      </PixelBorderBox>
    </TouchableOpacity>
  );
};

export default Tool;
