import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "学习",
    icon: "lightbulb",
    prefix: "/zh/study/",
    children: [
      {
        text: "inter",
        icon: "lightbulb",
        prefix: "inter/",
        children: ["math", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "out",
        icon: "lightbulb",
        prefix: "out/",
        children: ["bilibili", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  {
    text: "案例",
    icon: "lightbulb",
    prefix: "/zh/demo/",
    children: [
      {
        text: "spring-boot",
        icon: "lightbulb",
        prefix: "spring-boot/",
        children: ["spring-boot01", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "vue-hope",
        icon: "lightbulb",
        prefix: "vue-hope/",
        children: ["markdown", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  {
    text: "文档",
    icon: "lightbulb",
    prefix: "/zh/guide/",
    children: [
      {
        text: "案例",
        icon: "lightbulb",
        prefix: "demo/",
        children: ["guide-demo01", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "日志",
        icon: "lightbulb",
        prefix: "logs/",
        children: ["guide-logs01", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "学习",
        icon: "lightbulb",
        prefix: "study01/",
        children: ["guide-study01", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  {
    text: "日志",
    icon: "lightbulb",
    prefix: "/zh/logs/",
    children: [
      {
        text: "2023 年",
        icon: "lightbulb",
        prefix: "year-23/",
        children: ["month-08", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
]);
