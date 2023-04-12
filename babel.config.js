module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@theme': './src/theme',
          '@components': './src/components',
          '@hooks': './src/hooks',
          '@assets': './src/assets',
          '@utils': './src/utils',
          root: './src',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
