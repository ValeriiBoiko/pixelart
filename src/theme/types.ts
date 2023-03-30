import { Theme } from "@react-navigation/native/"
import { ScaledSize, StyleSheet } from "react-native/types"

export type TGetStylesFunctionConfig = {
  colors: Theme['colors'],
  dimensions: ScaledSize,
}

export type TGetStylesFunction = (config: TGetStylesFunctionConfig) => StyleSheet.NamedStyles<any>