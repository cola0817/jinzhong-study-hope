import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  {
    text: "学习",
    icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E5%AD%A6%E4%B9%A0.svg",
    prefix: "/zh/study/",
    children: [
      {
        text: "inter",
        icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E5%AD%A6%E6%A0%A1.svg",
        prefix: "inter/",
        children: ["math", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "out",
        icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E5%85%B6%E5%AE%83%E6%B4%BB%E5%8A%A8.svg",
        prefix: "out/",
        children: ["bilibili", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  {
    text: "案例",
    icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E6%A1%88%E4%BE%8B.svg",
    prefix: "/zh/demo/",
    children: [
      {
        text: "spring",
        icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/spring.svg",
        prefix: "spring/",
        children: ["spring-boot", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "vue-hope",
        icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E7%BD%91%E9%A1%B5.svg",
        prefix: "vue-hope/",
        children: ["markdown", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  {
    text: "文档",
    icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E6%96%87%E6%A1%A3.svg",
    prefix: "/zh/guide/",
    children: [
      {
        text: "案例",
        icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E6%A1%88%E4%BE%8B.svg",
        prefix: "demo/",
        children: ["guide-demo01", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "日志",
        icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E6%97%A5%E5%BF%97.svg",
        prefix: "logs/",
        children: ["guide-logs01", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "学习",
        icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E5%AD%A6%E4%B9%A0.svg",
        prefix: "study/",
        children: ["guide-study01", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
  {
    text: "日志",
    icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E6%97%A5%E5%BF%97.svg",
    prefix: "/zh/logs/",
    children: [
      {
        text: "2023 年",
        icon: "https://jinzhong-0817-1311841992.cos.ap-nanjing.myqcloud.com/picgo/%E5%B9%B4%E5%B9%B4%E6%9C%89%E9%B1%BC.svg",
        prefix: "year-23/",
        children: ["month-08", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
]);
