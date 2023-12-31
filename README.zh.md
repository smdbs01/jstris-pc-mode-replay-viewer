### [English](https://github.com/smdbs-smdbs/jstris-pc-mode-replay-viewer/blob/main/README.md) / 简体中文

<br/>

# Jstris PC Mode Replay Viewer

一个网页版的 Jstris PC Mode 回放查看器

Demo: [GitHub Page](https://smdbs01.github.io/jstris-pc-mode-replay-viewer/)

## 介绍

![Example picture](./md_assets/example.png)

这个网页主要有五个区域：

1. **回放区** 这个区域主要展示每块放下前的游戏场地，Next Queue和当前下落的方块。

2. **侧边控制区** 这个区域根据 [70-piece loop theory](https://docs.google.com/document/d/1udtq235q2SdoFYwMZNu-GRYR-4dCYMkp0E8_Hw1XTyg)将回放中每个 PC 分成 7 类，每一行中都有 **当前的PC数** 以及每一个 PC 开始时的 **Next Queue**。点击某一项就可以直接跳转到该 PC。

3. **底部控制区** 这个区域包含了数个控制按钮，它们的功能和默认按键绑定如下：

|  按钮名   |            功能            | 按键绑定 |
| :-------: | :------------------------: | :------: |
|   重置    | **重置** 到回放的第一个 PC |    R     |
| 上一个 PC |    **返回** 到上一个 PC    |  上箭头  |
|  上一块   |     **返回** 到上一块      |  左箭头  |
|  下一块   |     **前进** 到下一块      |  右箭头  |
| 下一个 PC |    **前进** 到下一个 PC    |  下箭头  |

> 你应该能发现界面右下角的菜单按钮。它应该是用来打开设置菜单的，但因为我不知道需要设置什么，所以现在点它应该没有作用。如果你有任何想法，欢迎为项目中[提交](#贡献)一个 issue。

4. **页面跳转区** ~~(我也不知道要叫什么)~~ 显示当前 PC 放置的块数以及 PC 数，你也可以用输入框快速跳转到想要看的 PC 数。

5. **上传区** 这个区域包含两个上传按钮。关于更多细节，请参考下面的 [上传回放](#上传回放) 部分.

## 上传回放

有两种上传回放的方法：

#### 上传一个回放代码/链接

1. 打开你想看的 Jstris PC Mode 回放，然后选择 -

- 复制链接，它的格式应该类似 `https://jstris.jezevec10.com/replay/12345678`。
- 复制**读取**按钮左边文字框的全部内容。

2. 在查看器中，点击 **Upload a Replay Code/Link** 按钮，粘贴内容到输入框，然后点击 "**Upload**"。
3. 可能需要等几秒来让脚本处理请求到的数据，如果没有出错，回放就会显示在上方的回放区里。

> 我用的 API 有一个问题，如果回放的页面（块数）超过一定数量，那之后的页面的 Next Queue 不会正常显示。所以如果你看到 `Replay too long` 错误， 请使用 [第二种方法](#上传一个回放-json)。

#### ~~上传一个回放 json~~

> 因为这个方法比较复杂，所以除非出现错误读取不了（Jstris 服务器掉线或回放太长），建议用上面的[第一种方法](#上传一个回放代码/链接)。

1. 从 [Chrome 插件商店](https://chrome.google.com/webstore/detail/tampermonkey/gppongmhjkpfnbhagpmjfkannfbllamg) 或 [Firefox 插件商店](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) 中下载并安装 [油猴 TamperMonkey](https://www.tampermonkey.net/index.php)。如果你使用的是其他浏览器，可以到[油猴官网](https://www.tampermonkey.net/index.php)里来找到对应的插件。
2. 下载并导入[这个脚本](./md_assets/PCReplayDownloader.js)到油猴里（或者复制里面的代码并粘贴到新脚本中）。
3. 打开你想看的 Jstris PC Mode 回放，点击浏览器右上角的油猴图标来确认脚本已经加载成功。
   ![Script instruction1](./md_assets/script1.png)
4. 点击 **读取** 按钮，之后脚本可能会运行一会。
5. 在看到回放正常显示之后，按下 **S** 键来下载回放的 json。
   ![Script instruction2](./md_assets/script2.png)
6. 在查看器中点击 **Upload a Replay json** 按钮，选择刚刚下载的 json，之后点击 **Upload** 按钮。

## 贡献

关于 Fork 和 Pull Request，请参考这篇[GitHub tutorial](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)。(Have fun editing my tailwind classes!)

如果有任何问题或建议, 请 [open an issue](https://github.com/smdbs-smdbs/jstris-pc-mode-replay-viewer/issues).

## 在本地部署运行

```sh
git clone git@github.com:smdbs-smdbs/jstris-pc-mode-replay-viewer.git
cd jstris-pc-mode-replay-viewer
npm install
npm run dev
```

### 编译打包

```sh
npm run build
```
