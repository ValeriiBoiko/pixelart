import { Theme } from '@react-navigation/native/';
import { ScaledSize, StyleSheet } from 'react-native/types';

export type TGetStylesFunctionConfig<P extends { [key: string]: any } = any> = {
  colors: Theme['colors'];
  dimensions: ScaledSize;
  props: P;
};

export type TGetStylesFunction = (
  config: TGetStylesFunctionConfig<{ [key: string]: any }>,
) => StyleSheet.NamedStyles<any>;
