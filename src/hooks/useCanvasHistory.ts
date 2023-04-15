import { useSharedValue } from 'react-native-reanimated';

type TCell = {
  xIndex: number;
  yIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type TCellAction = {
  action: 'fill' | 'clear';
  color?: string;
};

const useCanvasHistory = () => {
  const history = useSharedValue<{
    log: TCell[];
    actionsByCell: TCellAction[][][];
  }>({
    log: [],
    actionsByCell: [],
  });

  const pop = () => {
    const { actionsByCell, log } = history.value;

    const cell = log.pop();

    if (cell) {
      actionsByCell[cell.xIndex][cell.yIndex].pop();

      const targetCellActions = actionsByCell[cell.xIndex][cell.yIndex];
      const actionToApply = targetCellActions[targetCellActions.length - 1] || {
        action: 'clear',
      };

      return {
        cell,
        event: actionToApply,
      };
    }

    return undefined;
  };

  const push = ({
    cell,
    action,
    color,
  }: {
    cell: TCell;
    action: 'fill' | 'clear';
    color?: string;
  }) => {
    const { actionsByCell } = history.value;

    if (history.value.log.length >= 50) {
      history.value.log = history.value.log.splice(1);
    }

    if (!actionsByCell[cell.xIndex]) {
      actionsByCell[cell.xIndex] = [];
    }

    if (!actionsByCell[cell.xIndex]?.[cell.yIndex]) {
      actionsByCell[cell.xIndex][cell.yIndex] = [];
    }

    history.value.log.push(cell);

    actionsByCell[cell.xIndex][cell.yIndex].push({
      action,
      color,
    });
  };

  return {
    push,
    pop,
    history,
  };
};

export default useCanvasHistory;
