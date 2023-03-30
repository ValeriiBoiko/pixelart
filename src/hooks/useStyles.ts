import { useTheme } from "@react-navigation/native";
import { TGetStylesFunctionConfig } from "@theme/types";
import { useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";

const useStyles = <T extends StyleSheet.NamedStyles<unknown>>(getStyles: (config: TGetStylesFunctionConfig) => T) => {
  const { colors } = useTheme();
  const dimensions = useWindowDimensions();
  const styles = getStyles({ dimensions, colors });

  const result = useMemo(() => ({
    styles,
    colors,
    dimensions
  }), [styles, dimensions, colors])

  return result;
}

export default useStyles;
