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

- 开发 popup，options 等用到 chrome API 页面或者像 background.js，content scripts 等没有实际的 HTML 页面的后台文件时，直接使用 webpack 打包并 watch 即可：

  ```bash
  npm start
  ```

- 如果是开发 有 HTML 文件入口的页面并且没有使用到 chrome API，应该使用 webpack-dev-server 启动项目：

  ```bash
  npm run serve
  ```

  上面的命令会自动打开浏览器窗口，地址：`http://localhost:3000`。打开的页面会显示 `dist` 文件夹下面的文件列表，点击你需要开发的那个页面就会进入到那个页面。

  借助 webpack-dev-server 的静态服务器托管页面和热更新的能力让你就像开发普通的 web 页面一样开发 chrome 扩展中的页面，开发页面时建议将页面此尺寸调整成实际页面大小进行开发。

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
