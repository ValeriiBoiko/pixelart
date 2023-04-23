import { useCallback, useMemo } from 'react';
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

const MAX_CELL_SIZE = 25;

const useCanvasGesture = ({
  size,
  cellsNumber,
  coeficient = 1,
  onTouchCell,
}: TCanvasProps) => {
  const step = size / cellsNumber;
  const maxScale = MAX_CELL_SIZE / (size / cellsNumber);

  const isDragging = useSharedValue(false);
  const filledCells = useSharedValue<boolean[][]>([]);

  const scale = useSharedValue(1);
  const scaleSaved = useSharedValue(1);

  const transX = useSharedValue(0);
  const transY = useSharedValue(0);
  const transXSaved = useSharedValue(0);
  const transYSaved = useSharedValue(0);

  const maxTranslation = useDerivedValue(
    () => interpolate(scale.value, [1, maxScale], [0, -size / 2]),
    [size],
  );

  const onDrag = (event: GestureUpdateEvent<PanGestureHandlerEventPayload>) => {
    if (event.state === State.ACTIVE) {
      transX.value = interpolate(
        transXSaved.value + event.translationX / scale.value,
        [maxTranslation.value, 0],
        [maxTranslation.value, 0],
        Extrapolate.CLAMP,
      );

      transY.value = interpolate(
        transYSaved.value + event.translationY / scale.value,
        [maxTranslation.value, 0],
        [maxTranslation.value, 0],
        Extrapolate.CLAMP,
      );
    } else if (event.state === State.END) {
      transXSaved.value = transX.value;
      transYSaved.value = transY.value;
    }
  };

  const onScale = (
    event: GestureUpdateEvent<PinchGestureHandlerEventPayload>,
  ) => {
    if (event.state === State.ACTIVE) {
      scale.value = interpolate(
        scaleSaved.value * event.scale,
        [1, maxScale],
        [1, maxScale],
        Extrapolate.CLAMP,
      );

      transX.value = interpolate(
        scale.value,
        [1, scaleSaved.value],
        [0, transXSaved.value],
        Extrapolate.CLAMP,
      );

      transY.value = interpolate(
        scale.value,
        [1, scaleSaved.value],
        [0, transYSaved.value],
        Extrapolate.CLAMP,
      );
    } else if (event.state === State.END) {
      scaleSaved.value = scale.value;
      transXSaved.value = transX.value;
      transYSaved.value = transY.value;
    }
  };

  const getCellFromEvent = useCallback(
    ({
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
    },
    [step, coeficient],
  );

  const onTap = useCallback(
    (event: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => {
      const cell = getCellFromEvent(event);

      onTouchCell(cell);
    },
    [onTouchCell, getCellFromEvent],
  );

  const onUpdatePanGesture = (
    event: GestureUpdateEvent<PanGestureHandlerEventPayload>,
  ) => {
    const cell = getCellFromEvent(event);

    if (event.numberOfPointers === 1 && !isDragging.value) {
      if (!filledCells.value[cell.xIndex]?.[cell.yIndex]) {
        if (!filledCells.value[cell.xIndex]) {
          filledCells.value[cell.xIndex] = [];
        }

        filledCells.value[cell.xIndex][cell.yIndex] = true;

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
    filledCells.value = [];

    onDrag(event);

    isDragging.value = false;
  };

  const panGesture = useMemo(() => {
    const panHandler = Gesture.Pan()
      .maxPointers(2)
      .minDistance(step)
      .onUpdate(onUpdatePanGesture)
      .onEnd(onEndPanGesture);

    const pinchHandler = Gesture.Pinch().onUpdate(onScale).onEnd(onScale);

    const tapHandler = Gesture.Tap().onStart(onTap);

    return Gesture.Simultaneous(panHandler, tapHandler, pinchHandler);
  }, [step, onUpdatePanGesture, onEndPanGesture, onScale, onTap]);

  return { scale, transX, transY, panGesture };
};

export default useCanvasGesture;
