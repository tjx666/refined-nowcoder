# refined-nowcoder

chrome extension for [nowcoder](https://www.nowcoder.com)

## :dart: TODO

- [ ] 新消息通知
- [ ] 自定义屏蔽
- [ ] 帖子详情页显示学校和学历

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

```bash
npm start
```

其实 webpack 热更新的问题花了我挺多精力，目前基本上完美解决了 chrome 扩展的各种页面的热更新问题。

不过 content scripts 还是没法局部刷新，根本原因是因为 webpack 采用的是 jsonp 拉取更新补丁，而更新补丁那个 js 文件由于 chrome 限制，是文法访问 content script 脚本中的 `webpackHotUpdate` 函数的，所以 content scripts 无法做到热更新。优雅降级处理，我做到了如果你修改了 content scripts 的代码，会先自动 reload 扩展，再自动刷新页面。

具体原理：

> 给 webpack compiler 的 done 事件挂了个钩子，这个钩子的作用就是在没有编译出错并且修改的代码所在的模块的 entry 就是 content scripts 之一的情况下通过 SSE 推送消息给注入了 content scripts 的页面。所有的注入了 content scripts 页面也都注入了一个 ExtensionAutoReloadClient.js 的补丁，这个补丁获取到 SSE 的消息后会和 background.js 通信，让 background,js 去 reload 扩展，再过 200ms 后 reload 当前页面

会其它页面如 options, popup, background 热更新都是正常的，包括 react 组件的局部刷新都配置好了。

### 4. 安装扩展

进入到 `chrome://extensions` 扩展管理页面，点击右上角打开开发者模式，再点击加载已解压的扩展程序，选择项目中的 `dist` 文件夹，这样扩展就安装完成了。

![load local chrome extension](https://i.loli.net/2019/11/03/IExHN7Pu5FUwYqD.png)

### 5. 调试 react 项目

因为 chrome 的 react-devtools 扩展不能审查 chrome 页面，所以需要使用独立的 [react-devtools](https://www.npmjs.com/package/react-devtools) 工具。启动命令：

```javascript
npm run devtools
```

会在启动项目的同时打开独立的 devtools 窗口。

**效果图：**

![react-devtools](https://i.loli.net/2019/11/04/ujo8gBKqydxOpW9.png)

## :pencil: Changelog

`2019-11-13`

支持双击返回顶部

`2019-11-9`

支持自动打卡

`2019-11-8`

支持屏蔽许愿贴和交友贴

`2019-11-04`

- 新增选项与帮助页面

## :link: Reference

1. [【干货】Chrome 插件(扩展)开发全攻略](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)
2. [一篇文章教你顺利入门和开发 chrome 扩展程序（插件）](https://juejin.im/post/5c135a275188257284143418)
3. [Chrome extension 开发官方文档](https://developer.chrome.com/extensions/devguide)
4. [chrome-extension-book](https://lightningminers.gitbook.io/chrome-extension-book/)
5. [refined-github](https://github.com/sindresorhus/refined-github/)
6. [v2ex-plus](https://github.com/sciooga/v2ex-plus)
