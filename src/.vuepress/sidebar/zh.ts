import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "学习",
      icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E5%AD%A6%E4%B9%A0.svg",
      prefix: "study/",
      link: "study/",
      children: "structure",
    },
    {
      text: "案例",
      icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E6%A1%88%E4%BE%8B.svg",
      prefix: "demo/",
      link: "demo/",
      children: "structure"
    },
    {
      text: "文档",
      icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E6%96%87%E6%A1%A3.svg",
      prefix: "guide/",
      link: "guide/",
      children: "structure",
    },
    {
      text: "日志记录",
      icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E6%97%A5%E5%BF%97.svg",
      prefix: "logs/",
      link: "logs/",
      children: "structure",
    },
    "slides",
  ],
});
