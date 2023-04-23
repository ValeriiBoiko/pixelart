import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { InteractionManager, StyleSheet } from 'react-native';
import { CANVAS_SIZE, MIN_CELLS } from './GridCanvas';
import { useTheme } from '@react-navigation/native';

import {
  Canvas,
  CanvasContext,
  GCanvasView,
  GCanvasViewProps,
} from '@flyskywhy/react-native-gcanvas';

type TCanvasProps = Omit<GCanvasViewProps, 'ref'> & {
  color?: string;
  cellsNumber?: number;
};

const GridCanvasGrid: FC<TCanvasProps> = ({
  cellsNumber = MIN_CELLS,
  ...props
}) => {
  const { colors } = useTheme();
  const [context, setContext] = useState<CanvasContext | null>(null);
  const size = CANVAS_SIZE;
  const step = size / cellsNumber;

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      if (context) {
        context.strokeStyle = colors.text;
        context.lineWidth = StyleSheet.hairlineWidth;

        context.beginPath();

        for (let index = 0; index < cellsNumber; index++) {
          if (index > 0) {
            context.moveTo(step * index, 0);
            context.lineTo(step * index, size);
            context.stroke();
          }

          if (index > 0) {
            context.moveTo(0, step * index);
            context.lineTo(size, step * index);
            context.stroke();
          }
        }
      }
    });
  }, [colors.text, context]);

  const onCanvasCreaten = useCallback((canvas: Canvas) => {
    if (canvas && !context) {
      canvas.height = size;
      canvas.width = size;

      setContext(canvas.getContext('2d'));
    }
  }, []);

  return (
    <GCanvasView
      onCanvasCreate={onCanvasCreaten}
      isGestureResponsible={false}
      {...props}
    />
  );
};

export default React.memo(GridCanvasGrid);
