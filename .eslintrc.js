module.exports = {
  //此项是用来告诉eslint找当前配置文件不能往父级查找
  root: true,

  env: {
    node: true,
    es6: true,
  },

  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "prettier/vue",
    "plugin:vue/essential",
    "@vue/prettier",
  ],

  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
  },

  globals: {
    document: true,
    window: true,
  },

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": "error",
    semi: 2,
  },
};
