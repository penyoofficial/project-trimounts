import constants from "./constants";

export default {
  search: {
    provider: "local",
    options: {
      locales: {
        root: {
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              noResultsText: "无法找到相关结果",
              resetButtonTitle: "清除查询条件",
              footer: {
                navigateText: "切换",
                selectText: "选择",
                closeText: "关闭",
              },
            },
          },
        },
      },
    },
  },
  sidebarMenuLabel: "总目录",
  returnToTopLabel: "回到顶部",
  darkModeSwitchLabel: "暗黑模式",
  outline: {
    level: "deep",
    label: "本节的内容",
  },
  editLink: {
    pattern: `${constants["github://"]}project-trimounts/edit/main/docs/:path`,
    text: "在 GitHub 上编辑该页面",
  },
  docFooter: {
    prev: "上一节",
    next: "下一节",
  },
  footer: {
    message: "遵从 CC BY-NC-SA 4.0",
    copyright: "版权所有 © 2021-现在 Penyo",
  },
  notFound: {
    title: "未能找到指定文档",
    quote: "我猜应该不是服务器出问题......",
    linkText: "回到首页",
  },
};
