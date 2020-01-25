module.exports = {
    env: {
        browser: true,
    },
    extends: ['airbnb-base'],
    rules: {
        "indent": ["error",4, { "SwitchCase": 1 }],
        "array-bracket-spacing": ["error", "always"],
        "import/prefer-default-export": 0,
        "import/no-unresolved": "off",
    },
};
