import { useCallback, useState } from 'react';

const usePalette = (initialColors?: string[]) => {
  const [color, setColor] = useState<string>(
    initialColors?.length ? initialColors[0] : '#000000',
  );
  const [colors, setColors] = useState<string[]>(initialColors || []);

  const onAddColor = useCallback((color: string) => {
    setColor(color);

    setColors(colors => {
      if (colors.length > 20) {
        return [...colors.splice(1), color];
      }

      return [...colors, color];
    });
  }, []);

  const onPickColor = useCallback((color: string) => {
    setColor(color);
  }, []);

  return {
    color,
    colors,
    onAddColor,
    onPickColor,
  };
};

export default usePalette;
