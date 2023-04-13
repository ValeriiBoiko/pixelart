import { FC } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Icon from '@components/Icon';
import useStyles from '@hooks/useStyles';
import getEmptyScreenPlaceholderStyles from './EmptyScreenPlaceholderStyles';

type TEmptyHomeProps = TouchableOpacityProps;

const EmptyScreenPlaceholder: FC<TEmptyHomeProps> = ({ style, ...props }) => {
  const { styles } = useStyles(getEmptyScreenPlaceholderStyles);

  return (
    <TouchableOpacity style={[styles.container, style]} {...props}>
      <Icon name={'plus'} style={styles.icon} />

      <Text style={styles.message}>
        You have not started any art yet. Let's create the first one!
      </Text>
    </TouchableOpacity>
  );
};

export default EmptyScreenPlaceholder;
