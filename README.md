### English / [简体中文](https://github.com/smdbs-smdbs/jstris-pc-mode-replay-viewer/blob/main/README.zh.md)

<br/>

# Jstris PC Mode Replay Viewer

A Web-based tool for reviewing Jstris PC Mode replay.

Demo: [GitHub Page](https://smdbs01.github.io/jstris-pc-mode-replay-viewer//)

## Description

![Example picture](./md_assets/example.png)

As shown in the above image, there are 5 major regions in the viewer:

1. **Replay Region** This region shows the board, queue, and the falling piece before each piece placement.

2. **Side Utilities** This region categories PCs in this run to a number from 1-7 as in the [70-piece loop theory](https://docs.google.com/document/d/1udtq235q2SdoFYwMZNu-GRYR-4dCYMkp0E8_Hw1XTyg), **the current PC number** in this replay, and the **queue** of Tetriminos that each PC starts with. You can **click** on a specific item to jump to that PC.

3. **Bottom Utilities** This region contains the control buttons for the replay. The button functionalities and their default key bindings are (from left to right):

| Button name  |        Functionality        | Key Binding |
| :----------: | :-------------------------: | :---------: |
|    Reset     |  **Reset** to the first PC  |      R      |
|   Back PC    | **Back** to the previous PC |  Arrow Up   |
|  Back Piece  | **Back** to the last piece  | Arrow Left  |
|  Next Piece  |  **Place** the next piece   | Arrow Right |
|   Next PC    | **Forward** to the first PC | Arrow Down  |
| Open Options |  **Open** the options menu  |   (None)    |

In the center of the bottom region is a **Page Number Controls**, it shows number of pieces placed in the current PC and the current PC Number. The input box can be used to quickly jump to a specific PC.

4. **PC Utilities** This region contains links to the utilities that might be useful in analyzing a replay.

5. **Upload Region** This region contains two buttons for uploading a replay to this viewer. For more specific instructions, please refer to the [Upload Replay](#upload-replay) section.

## Upload Replay

There are two uploading methods:

#### Upload a replay code/url

1. Open up a Jstris PC Mode replay, then either -

- Copy the replay link in the url bar. It should be in the format of `https://jstris.jezevec10.com/replay/12345678`.
- Copy the replay code from the input box to the left of the **Load** button.

2. In the viewer, click the **Upload a Replay Code/Link** button and paste the content you just copied into the input area, then click "**Upload**".
3. Wait a few seconds until the reponses are received from the API and parsed. The replay will then show up in the viewer.

> There's an issue with the api I use that the queue after certain number of pieces placed will not be shown. If you see error `Replay too long`, please use the [second method](#upload-a-replay-json).

#### ~~Upload a replay json~~

> Since this method is simply more complicated, please use [the other method above](#upload-a-replay-codeurl) unless it is not possible (when Jstris server is down or the replay is too long).

1. Install [TamperMonkey](https://www.tampermonkey.net/index.php) from [Chrome Store](https://chrome.google.com/webstore/detail/tampermonkey/gppongmhjkpfnbhagpmjfkannfbllamg) or [Firefox Store](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/). If you are using a different browser, go to [https://tampermonkey.net/](https://tampermonkey.net/) to get the extension for your browser.
2. Download and import [this script](./md_assets/PCReplayDownloader.js) into the TamperMonkey console (or create a new script and paste the code into it).
3. Open a Jstris PC Mode replay, make sure the script is running by click the TamperMonkey icon
   ![Script instruction1](./md_assets/script1.png)
4. Click the **Load** button, let the script run for a few seconds.
5. After pieces appear in the replay, press down **S** key to download the json.
   ![Script instruction2](./md_assets/script2.png)
6. In the viewer, click the **upload a replay json** button and select the file you just downloaded.

## Contribute

Please see the [GitHub tutorial](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project) on forking and sending pull requests. (Have fun editing my tailwind classes!)

If you have any questions, please feel free to [open an issue](https://github.com/smdbs-smdbs/jstris-pc-mode-replay-viewer/issues).

## Run on your local machine

```sh
git clone git@github.com:smdbs-smdbs/jstris-pc-mode-replay-viewer.git
cd jstris-pc-mode-replay-viewer
npm install
npm run dev
```

### Compile

```sh
npm run build
```
