import { useTheme } from '@react-navigation/native';
import { TGetStylesFunctionConfig } from '@theme/types';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

const useStyles = <
  T extends StyleSheet.NamedStyles<unknown>,
  P extends { [key: string]: any },
>(
  getStyles: (config: TGetStylesFunctionConfig) => T,
  props?: P,
) => {
  const { colors } = useTheme();
  const dimensions = useWindowDimensions();
  const [prevProps, setPrevProps] = useState<Partial<P>>(props || {});
  const styles = getStyles({ dimensions, colors, props: prevProps });

  useEffect(() => {
    const newProps: Partial<P> = props || {};

    const newKeys = Object.keys(newProps);
    const currentKeys = Object.keys(prevProps);

    if (newKeys.length !== currentKeys.length) {
      setPrevProps(newProps);
    } else {
      const arePropsChanged = newKeys.some(key => {
        if (newProps[key] !== prevProps[key]) {
          return true;
        }

        return false;
      });

      if (arePropsChanged) {
        setPrevProps(newProps);
      }
    }
  }, [props]);

  const result = useMemo(
    () => ({
      styles,
      colors,
      dimensions,
    }),
    [styles, dimensions, colors, prevProps],
  );

  return result;
};

export default useStyles;
