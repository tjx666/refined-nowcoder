# refined-nowcoder

[![dependencies Status](https://david-dm.org/tjx666/refined-nowcoder/status.svg?style=flat-square)](https://david-dm.org/tjx666/refined-nowcoder)[![devDependencies Status](https://david-dm.org/tjx666/refined-nowcoder/dev-status.svg?style=flat-square)](https://david-dm.org/tjx666/refined-nowcoder?type=dev)

[牛客网](https://www.nowcoder.com) chrome 扩展

## :sparkles: Features

- :no_entry_sign: 屏蔽许愿贴和交友贴，支持自定义屏蔽

- :clock12: 自动打卡

- :arrow_up: 双击返回顶部

更多功能正在开发中...

## :package: Installation

扩展已发布到 chrome 应用商店，欢迎体验使用 [refined nowcoder](https://chrome.google.com/webstore/detail/refined-nowcoder/jkkhnkldfjgmekpgkgdefeenfpmmnnem)。

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

### 4. 安装扩展

进入到 `chrome://extensions` 扩展管理页面，点击右上角开关打开`开发者模式`，再点击左侧`加载已解压的扩展程序`按钮，选择下载并解压后的体验版扩展，这样扩展就安装完成了。

![load local chrome extension](https://i.loli.net/2019/11/15/ODQP5vUWCxLaFfR.png)

### 5. 调试 react 项目

因为 chrome 的 react-devtools 扩展不能审查 chrome 页面，所以需要使用独立的 [react-devtools](https://www.npmjs.com/package/react-devtools) 工具。启动命令：

```javascript
npm run devtools
```

会在启动项目的同时打开独立的 devtools 窗口。

**效果图：**

![react-devtools](https://i.loli.net/2019/11/04/ujo8gBKqydxOpW9.png)

### 6. 编写代码

项目结构和我另一个模板项目 [awesome-chrome-extension-boilerplate](https://github.com/tjx666/awesome-chrome-extension-boilerplate) 相似 ：

![structure](https://i.loli.net/2019/11/29/8eJl1czVSsvX25h.png)

#### background

background script 入口在 `src/background/index.ts`，它是一个 webpack entry，最终编译到成`dist/js/background.js`，建议将每个功能抽取成一个模块，再统一导入到 index.ts 中。

#### options

options 即选项页面完全就是一个普通的 react + TypeScript SPA。

#### content scripts

content scripts 都放在 `src/contents` 目录下。默认有个 all.ts，它不能被删除，因为这个 webpack entry 要注入用于支持 chrome 扩展自动刷新的功能的补丁。

**举个栗子：**

当你要给 URL 是以 `https://www.nowcoder.com/discuss` 为前缀的页面开发 content script，你需要做下面两步:

1. 添加 content scripts 和页面 URL 之间的映射到 `manifest.dev.json` 和 `manifest.prod.json`:

   ```json
   "content_scripts": [
       {
           "matches": ["https://www.nowcoder.com/discuss*"],
           "css": ["css/discuss.css"],
           "js": ["js/discuss.js"]
       }
   ],
   ```

2. 创建一个和上面 content js script 路径对应的文件夹 `src/contents/discuss`。构建脚本会把`src/discuss/index.tsx` 或者 `src/discuss/index.ts` 视为 webpack entry。

   **mini-css-extract-plugin** 将所有被 `discuss` entry 导入的样式文件分离到 `dist/css/discuss.css`，这也是为什么上面的 manifest.json 中 content CSS script 可以使用 `css/discuss.css` 的原因

## :pencil: Changelog

`2019-12-1`

优化屏蔽交友贴逻辑

`2019-11-29`

发布正式版 v1.0.0

`2019-11-20`

支持自定义屏蔽

`2019-11-13`

支持双击返回顶部

`2019-11-9`

支持自动打卡

`2019-11-8`

支持屏蔽许愿贴和交友贴

`2019-11-04`

新增选项与帮助页面

## :link: Reference

1. [【干货】Chrome 插件(扩展)开发全攻略](https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html)
2. [一篇文章教你顺利入门和开发 chrome 扩展程序（插件）](https://juejin.im/post/5c135a275188257284143418)
3. [Chrome extension 开发官方文档](https://developer.chrome.com/extensions/devguide)
4. [chrome-extension-book](https://lightningminers.gitbook.io/chrome-extension-book/)
5. [refined-github](https://github.com/sindresorhus/refined-github/)
6. [v2ex-plus](https://github.com/sciooga/v2ex-plus)

## :handshake: Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

非常欢迎提出你的宝贵意见和 pull request。
