import { useCallback, useMemo, useRef } from 'react';
import {
  Gesture,
  GestureStateChangeEvent,
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
  PinchGestureHandlerEventPayload,
  State,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

export type TCell = {
  xIndex: number;
  yIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type TCanvasProps = {
  size: number;
  coeficient?: number;
  cellsNumber: number;
  onTouchCell: (cell: TCell) => void;
};

const MAX_CELL_SIZE = 40;

const useCanvasGesture = ({
  size,
  cellsNumber,
  coeficient = 1,
  onTouchCell,
}: TCanvasProps) => {
  const step = size / cellsNumber;
  const maxScale = MAX_CELL_SIZE / (size / cellsNumber);

  const isDragging = useSharedValue(false);
  const filledCells = useRef<boolean[][]>([]);

  const scale = useSharedValue(1);
  const scaleSaved = useSharedValue(1);

  const transX = useSharedValue(0);
  const transY = useSharedValue(0);
  const translationSaved = useSharedValue({
    transX: 0,
    transY: 0,
  });

  const maxTranslation = useDerivedValue(
    () => interpolate(scale.value, [1, maxScale], [0, -size / 2]),
    [size],
  );

  const onDrag = useCallback(
    (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
      if (event.state === State.ACTIVE) {
        transX.value = interpolate(
          translationSaved.value.transX + event.translationX / scale.value,
          [maxTranslation.value, 0],
          [maxTranslation.value, 0],
          Extrapolate.CLAMP,
        );

        transY.value = interpolate(
          translationSaved.value.transY + event.translationY / scale.value,
          [maxTranslation.value, 0],
          [maxTranslation.value, 0],
          Extrapolate.CLAMP,
        );
      } else if (event.state === State.END) {
        translationSaved.value.transX = transX.value;
        translationSaved.value.transY = transY.value;
      }
    },
    [maxScale],
  );

  const onScale = useCallback(
    (event: GestureUpdateEvent<PinchGestureHandlerEventPayload>) => {
      if (event.state === State.ACTIVE) {
        scale.value = interpolate(
          scaleSaved.value * event.scale,
          [1, maxScale],
          [1, maxScale],
          Extrapolate.CLAMP,
        );

        transX.value = interpolate(
          scale.value,
          [1, maxScale],
          [0, translationSaved.value.transX],
          Extrapolate.CLAMP,
        );

        transY.value = interpolate(
          scale.value,
          [1, maxScale],
          [0, translationSaved.value.transY],
          Extrapolate.CLAMP,
        );
      } else if (event.state === State.END) {
        scaleSaved.value = scale.value;
        translationSaved.value.transX = transX.value;
        translationSaved.value.transY = transY.value;
      }
    },
    [maxScale],
  );

  const getCellFromEvent = ({
    x,
    y,
  }:
    | GestureStateChangeEvent<PanGestureHandlerEventPayload>
    | GestureUpdateEvent<PanGestureHandlerEventPayload>
    | GestureStateChangeEvent<TapGestureHandlerEventPayload>) => {
    const xIndex = Math.floor(x / step);
    const yIndex = Math.floor(y / step);

    return {
      xIndex,
      yIndex,
      x: xIndex * (step / coeficient),
      y: yIndex * (step / coeficient),
      width: step / coeficient,
      height: step / coeficient,
    };
  };

  const onTap = (
    event: GestureStateChangeEvent<TapGestureHandlerEventPayload>,
  ) => {
    const cell = getCellFromEvent(event);

    onTouchCell(cell);
  };

  const onUpdatePanGesture = (
    event: GestureUpdateEvent<PanGestureHandlerEventPayload>,
  ) => {
    const cell = getCellFromEvent(event);

    if (event.numberOfPointers === 1 && !isDragging.value) {
      if (!filledCells.current[cell.xIndex]?.[cell.yIndex]) {
        if (!filledCells.current[cell.xIndex]) {
          filledCells.current[cell.xIndex] = [];
        }

        filledCells.current[cell.xIndex][cell.yIndex] = true;

        onTouchCell(cell);
      }
    } else if (event.numberOfPointers === 2) {
      isDragging.value = true;
      onDrag(event);
    }
  };

  const onEndPanGesture = (
    event: GestureUpdateEvent<PanGestureHandlerEventPayload>,
  ) => {
    filledCells.current = [];

    onDrag(event);

    isDragging.value = false;
  };

  const panGesture = useMemo(() => {
    const panHandler = Gesture.Pan()
      .maxPointers(2)
      .minDistance(step)
      .onUpdate(runOnJS(onUpdatePanGesture))
      .onEnd(runOnJS(onEndPanGesture));

    const pinchHandler = Gesture.Pinch()
      .onUpdate(runOnJS(onScale))
      .onEnd(runOnJS(onScale));

    const tapHandler = Gesture.Tap().onStart(runOnJS(onTap));

    return Gesture.Simultaneous(panHandler, tapHandler, pinchHandler);
  }, [onTouchCell, onScale, onTap]);

  return { scale, transX, transY, panGesture };
};

export default useCanvasGesture;
