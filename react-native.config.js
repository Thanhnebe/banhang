module.exports = {
    project: {
        ios: {},
        android: {},
    },
    assets: ['./src/assets/fonts'],
    dependency: {
        ...(process.env.NO_FLIPPER
            ? { 'react-native-flipper': { platforms: { ios: null } } }
            : {}),
    },
    'react-native-vector-icons': {
        platforms: {
            ios: null,
        },
    },
};
