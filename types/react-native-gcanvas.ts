declare module '@flyskywhy/react-native-gcanvas' {
  export interface CanvasContext {
    fillStyle: string;
    font: string;
    globalAlpha: number;
    globalCompositionOperation: string;
    lineCap: string;
    lineDashOffset: number;
    lineJoin: string;
    lineWidth: number;
    miterLimit: number;
    shadowBlur: number;
    shadowColor: string;
    shadowOffsetX: number;
    shadowOffsetY: number;
    strokeStyle: string;
    textAlign: string;
    textBaseline: string;
    arc: (
      x: number,
      y: number,
      r: number,
      sAngle: number,
      eAngle: number,
      counterClockwise?: boolean,
    ) => void;
    arcTo: (x1: number, y1: number, x2: number, y2: number, r: number) => void;
    beginPath: () => void;
    bezierCurveTo: (
      cp1x: number,
      cp1y: number,
      cp2x: number,
      cp2y: number,
      x: number,
      y: number,
    ) => void;
    clearRect: (x: number, y: number, width: number, height: number) => void;
    clip: () => void;
    closePath: () => void;
    createRadialGradient: (
      x0: number,
      y0: number,
      r0: number,
      x1: number,
      y1: number,
      r1: number,
    ) => void;
    drawWindow: (
      window: any,
      x: number,
      y: number,
      w: number,
      h: number,
      bgColor: string,
      flags?: any,
    ) => void; //
    fillRect: (x: number, y: number, width: number, height: number) => void;
    fillText: (text: string, x: number, y: number, maxWidth?: number) => void;
    ellipse: (
      x: number,
      y: number,
      radiusX: number,
      radiusY: number,
      rotation: number,
      startAngle: number,
      endAngle: number,
      anticlockwise?: boolean,
    ) => void;
    getLineDash: () => number[];
    lineTo: (x: number, y: number) => void;
    measureText: (text: string) => any;
    moveTo: (x: number, y: number) => void;
    quadraticCurveTo: (cpx: number, cpy: number, x: number, y: number) => void;
    rect: (x: number, y: number, width: number, height: number) => void;
    restore: () => void;
    rotate: (angle: number) => void;
    save: () => void;
    stroke: () => void;
    scale: (x: number, y: number) => void;
    setLineDash: (segments: number[]) => void;
    setTransform: (
      a: number,
      b: number,
      c: number,
      d: number,
      e: number,
      f: number,
    ) => void;
    strokeRect: (x: number, y: number, width: number, height: number) => void;
    strokeText: (text: string, x: number, y: number, maxWidth?: number) => void;
    transform: (
      a: number,
      b: number,
      c: number,
      d: number,
      e: number,
      f: number,
    ) => void;
    translate: (x: number, y: number) => void;
    getImageData: (
      sx: number,
      sy: number,
      sw: number,
      sh: number,
    ) => { data: [number, number, number, number] };
  }

  export interface Canvas {
    width: number;
    height: number;
    toDataURL: () => string;
    getContext: (type: '2d') => CanvasContext;
  }

  export interface GCanvasViewProps {
    style?: StyleProp<Viewprops>;
    isGestureResponsible?: boolean;
    isAutoClearRectBeforePutImageData?: boolean;
    disableAutoSwap?: boolean;
    devicePixelRatio?: number;
    onIsReady?: (isReady: boolean) => void;
    onCanvasCreate?: (canvas: Canvas) => void;
    onCanvasResize?: (value: {
      width: number;
      height: number;
      canvas: Canvas;
    }) => void;
  }

  export declare const GCanvasView: React.FC<GCanvasViewProps>;
}
