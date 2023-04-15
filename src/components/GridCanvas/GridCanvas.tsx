import useStyles from '@hooks/useStyles';
import React, { useRef, ForwardRefRenderFunction, useCallback } from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import Canvas from 'react-native-canvas';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { AnimatedStyleProp } from 'react-native-reanimated';
import getGridCanvasStyles from './GridCanvasStyles';
import useCanvasGesture, { TCell } from '../../hooks/useCanvasGesture';
import GridCanvasBackground from './GridCanvasBackground';
import GridCanvasGrid from './GridCanvasGrid';

type TCanvasProps = Partial<ViewProps> & {
  size: number;
  scale?: number;
  withGrid?: boolean;
  cellsNumber: number;
  withBackground?: boolean;
  style?: AnimatedStyleProp<View> | StyleProp<ViewStyle>;
  onTouchCell: (cell: TCell) => void;
};

export const MIN_CELLS = 16;
export const MAX_CELLS = 96;
export const CANVAS_SIZE = 1920;

const GridCanvas: ForwardRefRenderFunction<Canvas, TCanvasProps> = (
  { withGrid, withBackground, cellsNumber, size, style, onTouchCell, ...props },
  forwardedRef,
) => {
  const correlation = size / CANVAS_SIZE;

  const canvasRef = useRef<Canvas | null>(null);
  const { styles } = useStyles(getGridCanvasStyles, {
    canvasSize: CANVAS_SIZE,
    correlation,
    width: size,
    height: size,
  });

  const { scale, transX, transY, panGesture } = useCanvasGesture({
    size,
    cellsNumber,
    coeficient: correlation,
    onTouchCell,
  });

  const handleRef = useCallback((ref: Canvas) => {
    if (
      ref &&
      (ref?.height !== canvasRef.current?.height ||
        ref?.width !== canvasRef.current?.width)
    ) {
      ref.height = CANVAS_SIZE;
      ref.width = CANVAS_SIZE;

      canvasRef.current = ref;
    }

    if (forwardedRef) {
      if (typeof forwardedRef === 'function') {
        forwardedRef(ref);
      } else {
        forwardedRef.current = ref;
      }
    }
  }, []);

  return (
    <View style={[styles.container, style]} {...props}>
      <View>
        <Animated.View
          style={[
            {
              width: size,
              height: size,
              overflow: 'hidden',
              transform: [
                { translateX: -size / 2 },
                { translateY: -size / 2 },
                { scale: scale },
                { translateX: size / 2 },
                { translateY: size / 2 },
                { translateX: transX },
                { translateY: transY },
              ],
            },
          ]}>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={styles.gestureResponder}>
              <View style={styles.canvasContainer}>
                <GridCanvasBackground
                  cellsNumber={cellsNumber}
                  style={StyleSheet.compose(
                    styles.backgroundCanvas,
                    withBackground ? null : styles.transparentCanvas,
                  )}
                />

                <Canvas ref={handleRef} />

                <GridCanvasGrid
                  cellsNumber={cellsNumber}
                  style={StyleSheet.compose(
                    styles.gridCanvas,
                    withGrid ? null : styles.transparentCanvas,
                  )}
                />

                <View style={StyleSheet.absoluteFill} />
              </View>
            </Animated.View>
          </GestureDetector>
        </Animated.View>
      </View>
    </View>
  );
};

export default React.memo(React.forwardRef(GridCanvas));
