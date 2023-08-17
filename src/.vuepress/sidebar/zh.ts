import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "学习",
      icon: "study",
      prefix: "study/",
      link: "study/",
      children: "structure",
    },
    {
      text: "案例",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure"
    },
    {
      text: "文档",
      icon: "book",
      prefix: "guide/",
      link: "guide/",
      children: "structure",
    },
    {
      text: "日志记录",
      icon: "book",
      prefix: "logs/",
      link: "logs/",
      children: "structure",
    },
    "slides",
  ],
});
