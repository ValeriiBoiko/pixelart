import React, { FC, useCallback, useEffect, useRef } from 'react';
import { InteractionManager } from 'react-native';
import Canvas, { CanvasProps } from 'react-native-canvas';
import { Extrapolate, interpolate } from 'react-native-reanimated';
import { CANVAS_SIZE, MAX_CELLS, MIN_CELLS } from './GridCanvas';
import { useTheme } from '@react-navigation/native';

type TCanvasProps = Omit<CanvasProps, 'ref'> & {
  cellsNumber?: number;
};

const GridCanvasGrid: FC<TCanvasProps> = ({
  cellsNumber = MIN_CELLS,
  ...props
}) => {
  const { colors } = useTheme();
  const canvasRef = useRef<Canvas | null>(null);
  const step = CANVAS_SIZE / cellsNumber;

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      const context = canvasRef.current?.getContext('2d');

      if (context) {
        context.strokeStyle = colors.text;
        context.lineWidth = interpolate(
          cellsNumber,
          [MIN_CELLS, MAX_CELLS],
          [4, 1],
          Extrapolate.CLAMP,
        );

        for (let index = 0; index < cellsNumber; index++) {
          if (index > 0) {
            context.beginPath();
            context.moveTo(step * index, 0);
            context.lineTo(step * index, CANVAS_SIZE);
            context.stroke();
          }

          if (index > 0) {
            context.beginPath();
            context.moveTo(0, step * index);
            context.lineTo(CANVAS_SIZE, step * index);
            context.stroke();
          }
        }
      }
    });
  }, [colors.text]);

  const handleRef = useCallback((ref: Canvas) => {
    if (ref && !canvasRef.current) {
      ref.height = CANVAS_SIZE;
      ref.width = CANVAS_SIZE;

      canvasRef.current = ref;
    }
  }, []);

  return <Canvas ref={handleRef} {...props} />;
};

export default React.memo(GridCanvasGrid);
