import useStyles from '@hooks/useStyles';
import React, { useRef, useCallback, FC, useMemo } from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { AnimatedStyleProp } from 'react-native-reanimated';
import getGridCanvasStyles from './GridCanvasStyles';
import useCanvasGesture, { TCell } from '../../hooks/useCanvasGesture';
import GridCanvasBackground from './GridCanvasBackground';
import GridCanvasGrid from './GridCanvasGrid';
import { Canvas, GCanvasView } from '@flyskywhy/react-native-gcanvas';

type TCanvasProps = Partial<ViewProps> & {
  size: number;
  scale?: number;
  withGrid?: boolean;
  cellsNumber: number;
  withBackground?: boolean;
  style?: AnimatedStyleProp<View> | StyleProp<ViewStyle>;
  onTouchCell: (cell: TCell) => void;
  onCanvasCreate?: (canvas: Canvas) => void;
};

export const MIN_CELLS = 16;
export const MAX_CELLS = 96;
export const CANVAS_SIZE = Dimensions.get('window').width * 1.5;

const GridCanvas: FC<TCanvasProps> = ({
  withGrid,
  withBackground,
  cellsNumber,
  size,
  style,
  onTouchCell,
  ...props
}) => {
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

  const onCanvasCreate = useCallback((ref: Canvas) => {
    if (
      ref &&
      (ref.height !== canvasRef.current?.height ||
        ref.width !== canvasRef.current?.width)
    ) {
      ref.height = CANVAS_SIZE;
      ref.width = CANVAS_SIZE;

      canvasRef.current = ref;
    }

    if (props.onCanvasCreate) {
      props.onCanvasCreate(ref);
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
                  style={styles.backgroundCanvas}
                />

                <GCanvasView
                  isGestureResponsible={false}
                  style={styles.canvas}
                  onCanvasCreate={onCanvasCreate}
                />

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

export default React.memo(GridCanvas);
