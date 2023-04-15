import { useCallback, useState } from 'react';
import { LayoutChangeEvent, LayoutRectangle } from 'react-native';

const useLayout = () => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const onLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
    setLayout(prev => {
      if (
        prev?.width != nativeEvent.layout.width ||
        prev?.height != nativeEvent.layout.height ||
        prev?.x != nativeEvent.layout.x ||
        prev?.y != nativeEvent.layout.y
      ) {
        return nativeEvent.layout;
      }

      return prev;
    });
  }, []);

  return [layout, onLayout] as const;
};

export default useLayout;
