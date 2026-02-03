module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:import/recommended",
        "prettier",
    ],
    plugins: ["import", "unused-imports"],
    rules: {
        "no-console": "warn",
        "no-debugger": "error",

        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_" }
        ],
    },
};