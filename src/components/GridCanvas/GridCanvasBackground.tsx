import React, { FC, useMemo } from 'react';
import { Defs, Path, Svg, SvgProps, Use } from 'react-native-svg';
import { CANVAS_SIZE } from './GridCanvas';

type TCanvasProps = Partial<SvgProps> & {
  cellsNumber?: number;
};

const BASE_CELLS_NUMBER = 16;

const GridCanvasBackground: FC<TCanvasProps> = ({
  cellsNumber = BASE_CELLS_NUMBER,
  ...props
}) => {
  const cellsArray = new Array(cellsNumber).fill(null);

  const rowPath = useMemo(
    () =>
      cellsArray
        .map((_, index) => {
          if (index % 2 == 0) {
            return `M${index} 0 h1 v1 H${index} z`;
          }

          return ' ';
        })
        .join(''),
    [cellsNumber],
  );

  return (
    <Svg
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      viewBox={`0 0 ${cellsNumber} ${cellsNumber}`}
      {...props}>
      <Defs>
        <Path id="path" d={rowPath}></Path>
      </Defs>

      {cellsArray.map((_, index) => (
        <Use key={index} xlinkHref="#path" x={index % 2} y={index} />
      ))}
    </Svg>
  );
};

export default React.memo(GridCanvasBackground);
