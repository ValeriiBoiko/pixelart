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
      width: props.canvasSize,
      height: props.canvasSize,
      transform: [
        { translateX: -props.canvasSize / 2 },
        { translateY: -props.canvasSize / 2 },
        { scale: props.correlation },
        { translateX: props.canvasSize / 2 },
        { translateY: props.canvasSize / 2 },
      ],
    },
    backgroundCanvas: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.25,
    },
    gridCanvas: {
      ...StyleSheet.absoluteFillObject,
    },
    canvas: {
      width: props.canvasSize,
      height: props.canvasSize,
    },
  });
};

export default getGridCanvasStyles;
