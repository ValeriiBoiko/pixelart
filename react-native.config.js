const path = require('path');

module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets'],
  dependencies: {
    '@flyskywhy/react-native-gcanvas': {
      platforms: {
        android: {
          packageImportPath:
            'import com.taobao.gcanvas.bridges.rn.GReactPackage;',
        },
      },
    },
  },
};
