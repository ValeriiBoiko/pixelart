import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scaleWidth = (value: number) => (width / guidelineBaseWidth) * value;
const scaleHeight = (value: number) => (height / guidelineBaseHeight) * value;
const moderateScale = (value: number, factor = 0.5) =>
  value + (scaleWidth(value) - value) * factor;

export { scaleHeight, scaleWidth, moderateScale };
