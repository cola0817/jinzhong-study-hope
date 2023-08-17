import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/": [
    "",
    {
      text: "Demo",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "Docs",
      icon: "book",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "Logs Record",
      icon: "book",
      prefix: "logs/",
      children: "structure",
    },
    {
      text: "study",
      icon: "study",
      prefix: "study/",
      children: "structure",
    },
    "slides",
  ],
});
