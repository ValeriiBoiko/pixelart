import { TGetStylesFunctionConfig } from '@theme/types';
import { FontFamily, Typography } from '@theme/typography';
import { StyleSheet } from 'react-native';

const getHomeStyles = ({ colors }: TGetStylesFunctionConfig) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    addNewCarWrapper: {
      maxWidth: '50%',
    },
    addNewCard: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      marginHorizontal: 10,
      aspectRatio: 0.75,
    },
    addNewCardIcon: {
      color: colors.border,
      fontSize: 36,
      marginBottom: 8,
    },
    addNewCardMessage: {
      ...Typography.body2,
      textAlign: 'center',
      fontFamily: FontFamily.SILKSCREEN_REGULAR,
      color: colors.border,
    },
  });

export default getHomeStyles;
