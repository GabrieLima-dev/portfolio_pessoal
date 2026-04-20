import vue from "eslint-plugin-vue";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**"]
  },
  ...vue.configs["flat/recommended"],
  {
    files: ["**/*.js", "**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": "off",
      "vue/singleline-html-element-content-newline": "off",
      "vue/html-self-closing": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/html-indent": "off"
    }
  }
];
