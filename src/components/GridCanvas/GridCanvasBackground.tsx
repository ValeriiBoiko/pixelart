import React, { useEffect, useRef, FC, useCallback } from 'react';
import Canvas, { CanvasProps } from 'react-native-canvas';
import { Image } from 'react-native-canvas';
import { CANVAS_SIZE } from './GridCanvas';

type TCanvasProps = Omit<CanvasProps, 'ref'> & {
  cellsNumber?: number;
};

const BASE_CELLS_NUMBER = 16;

const GridCanvasBackground: FC<TCanvasProps> = ({
  cellsNumber = BASE_CELLS_NUMBER,
  ...props
}) => {
  const canvasRef = useRef<Canvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const repeats = Math.floor(cellsNumber / BASE_CELLS_NUMBER);
      const imageSize = CANVAS_SIZE / repeats;
      const image = getImage(canvasRef.current, imageSize);

      for (let xIndex = 0; xIndex < repeats; xIndex++) {
        for (let yIndex = 0; yIndex < repeats; yIndex++) {
          image.addEventListener('load', () => {
            canvasRef.current
              ?.getContext('2d')
              .drawImage(image, xIndex * imageSize, yIndex * imageSize);
          });
        }
      }
    }
  }, [cellsNumber]);

  const getImage = (canvas: Canvas, size: number) => {
    const svgString = `
    <svg width="${size}px" height="${size}px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
            <g id="row">
                <rect x="0" y="0" width="1" height="1" />
                <rect x="2" y="0" width="1" height="1" />
                <rect x="4" y="0" width="1" height="1" />
                <rect x="6" y="0" width="1" height="1" />
                <rect x="8" y="0" width="1" height="1" />
                <rect x="10" y="0" width="1" height="1" />
                <rect x="12" y="0" width="1" height="1" />
                <rect x="14" y="0" width="1" height="1" />    
            </g>
        </defs>
        
        <use xlink:href="#row" x="0" y="0"/>
        <use xlink:href="#row" x="1" y="1"/>
        <use xlink:href="#row" x="0" y="2"/>
        <use xlink:href="#row" x="1" y="3"/>
        <use xlink:href="#row" x="0" y="4"/>
        <use xlink:href="#row" x="1" y="5"/>
        <use xlink:href="#row" x="0" y="6"/>
        <use xlink:href="#row" x="1" y="7"/>
        <use xlink:href="#row" x="0" y="8"/>
        <use xlink:href="#row" x="1" y="9"/>
        <use xlink:href="#row" x="0" y="10"/>
        <use xlink:href="#row" x="1" y="11"/>
        <use xlink:href="#row" x="0" y="12"/>
        <use xlink:href="#row" x="1" y="13"/>
        <use xlink:href="#row" x="0" y="14"/>
        <use xlink:href="#row" x="1" y="15"/>
    </svg>
`;

    const image = new Image(canvas);

    image.src = `data:image/svg+xml,${encodeURIComponent(svgString)}`;
    image.height = size;
    image.width = size;

    return image;
  };

  const handleRef = useCallback((ref: Canvas) => {
    if (ref) {
      ref.height = CANVAS_SIZE;
      ref.width = CANVAS_SIZE;

      canvasRef.current = ref;
    }
  }, []);

  return <Canvas ref={handleRef} {...props} />;
};

export default React.memo(GridCanvasBackground);
