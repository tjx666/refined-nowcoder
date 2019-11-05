# refined-nowcoder

chrome extension for [nowcoder](https://www.nowcoder.com)

## :dart: TODO

- [ ] 屏蔽许愿
- [ ] 自动打卡
- [ ] 双击返回顶部

## :hammer_and_wrench: Develop

### 1. 克隆项目到本地

```bash
git clone git@github.com:tjx666/refined-nowcoder.git
```

### 2. 安装依赖

```bash
# 先切到项目所在路径
cd /path/to/project/directory

# 推荐使用 yarn 包管理工具
yarn

# 或者可以使用 npm
npm install
```

### 3. 启动项目

- 开发 content scripts 时 webpack 的 HMR 目前没法用，只能手动点击扩展管理页面的加载按钮重新加载扩展，启动命令：

  ```bash
  npm start
  ```

- 其它情况下一般都可以直接使用 webpack-dev-server，我专门为 chrome 扩展开发定制了 webpack ，你可以充分享受 webpack 的热更新，启动命令：

  ```bash
  npm run serve
  ```

### 4. 安装扩展

进入到 `chrome://extensions` 扩展管理页面，点击右上角打开开发者模式，点击加载已解压的扩展程序，选择项目中的 `dist` 文件夹，这样扩展就安装完成了。

![load local chrome extension](https://i.loli.net/2019/11/03/IExHN7Pu5FUwYqD.png)

### 5. 调试 react 项目

因为 chrome 的 react-devtools 扩展不能审查 chrome 页面，所以需要使用独立的 react-devtools 工具，例如调试 options 页面。在 `npm start` 启动项目的同时使用 `npx react-devtools` 命令启动独立的 react-devtools 工具窗口。

**效果图：**

![react-devtools](https://i.loli.net/2019/11/04/ujo8gBKqydxOpW9.png)

## :pencil: Changelog

`2019-11-04`

- 新增选项与帮助页面

## :link: Reference

1. [【干货】Chrome 插件(扩展)开发全攻略](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)
2. [一篇文章教你顺利入门和开发 chrome 扩展程序（插件）](https://juejin.im/post/5c135a275188257284143418)
3. [Chrome extension 开发官方文档](https://developer.chrome.com/extensions/devguide)
4. [chrome-extension-book](https://lightningminers.gitbook.io/chrome-extension-book/)
5. [refined-github](https://github.com/sindresorhus/refined-github/)
6. [v2ex-plus](https://github.com/sciooga/v2ex-plus)
