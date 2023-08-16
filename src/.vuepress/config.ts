import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "en-US",
      title: "Cola Log",
      description: "A docs demo for Cola",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "Cola Log",
      description: "Cola 的文档演示",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
