import { TGetStylesFunctionConfig } from '@theme/types';
import { scaleWidth } from '@utils/layout';
import { StyleSheet } from 'react-native';

const getGridCanvasStyles = ({
  props,
}: TGetStylesFunctionConfig<{
  canvasSize: number;
  correlation: number;
  width: number;
  height: number;
}>) => {
  return StyleSheet.create({
    container: {
      width: props.width,
      height: props.height,
      overflow: 'hidden',
    },
    gestureResponder: {
      width: props.width,
      height: props.height,
    },
    transparentCanvas: {
      opacity: 0,
    },
    canvasContainer: {
      width: scaleWidth(props.canvasSize),
      height: scaleWidth(props.canvasSize),
      transform: [
        { translateX: -scaleWidth(props.canvasSize) / 2 },
        { translateY: -scaleWidth(props.canvasSize) / 2 },
        { scale: props.correlation },
        { translateX: scaleWidth(props.canvasSize) / 2 },
        { translateY: scaleWidth(props.canvasSize) / 2 },
      ],
    },
    backgroundCanvas: {
      position: 'absolute',
      opacity: 0.05,
    },
    gridCanvas: {
      position: 'absolute',
    },
    canvas: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });
};

export default getGridCanvasStyles;
