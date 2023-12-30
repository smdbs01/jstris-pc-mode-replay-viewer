/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
// ==UserScript==
// @name         Jstris Replay Json Downloader
// @namespace    Jstris Replay Json Downloader
// @version      0.0.5
// @description  Download json representation of the PC Mode replay
// @author       smdbs
// @match        https://jstris.jezevec10.com/replay*
// @grant        none
// ==/UserScript==

(function setupStats() {
  window.addEventListener('load', () => {
    const KEY = 83; // key we listen for; "s" is 83 - https://keycode.info/
    const PRETTY = true;

    const stateArray = [];

    const pieceTableById = ['I', 'O', 'T', 'L', 'J', 'S', 'Z'];
    const pieceTableByBoard = [
      'N',
      'Z',
      'L',
      'O',
      'S',
      'I',
      'J',
      'T',
      'N',
      'N',
      'N',
    ];
    const colorTableById = [
      '⬛️',
      '🟥',
      '🟧',
      '🟨',
      '🟩',
      '⏹️',
      '🟦',
      '🟪',
      '⬛️',
      '⬛️',
      '⬛️',
    ];

    if (typeof Replayer !== 'undefined') {
      mainReplayer();
    }

    function board2color(arr) {
      let ret = '';
      for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
          ret += colorTableById[arr[i][j]];
        }
        ret += '\n';
      }
      return ret;
    }

    function board2str(arr) {
      let ret = '';
      for (let i = 0; i < arr.length; i += 1) {
        for (let j = 0; j < arr[i].length; j += 1) {
          ret += pieceTableByBoard[arr[i][j]];
        }
      }
      return ret;
    }

    function mainReplayer() {
      let currentPCBoard = [];
      let lastBoard = [];
      let lastPCPiecesNumber = 0;
      let lastPCNumber = -1;
      let lastQueue = 'TIJLOSZ';
      let isReplayEnd = false;
      let replayDate = 0;
      let isPCMode = false;

      Replayer.prototype.updatePCIndicator = function updatePCIndicator() {
        if (this.gamedata.PCs > lastPCNumber) {
          currentPCBoard = this.matrix.slice(16);
          lastBoard = this.matrix.slice(16);
          // lastClearedLines = this.gamedata.lines;
          // linesID = [0, 1, 2, 3];

          lastPCNumber = this.gamedata.PCs;
          lastPCPiecesNumber = this.placedBlocks;
        }
      };

      Replayer.prototype.initPCIndicator = function initPCIndicator() {
        replayDate = this.r.c.gameEnd;
        isPCMode = this.pmode === 8;
      };

      function makeQueue() {
        let ret = '';

        if (this.blockInHold != null) {
          ret += pieceTableById[this.blockInHold.id];
        }

        ret += pieceTableById[this.activeBlock.id]; // falling piece

        for (let i = 0; i < this.queue.length; i += 1) {
          ret += pieceTableById[this.queue[i].id];
        }
        return ret;
      }

      Replayer.prototype.displayMatrixAndQueue = function displayMatrixAndQueue() {
        const pcBlock = this.placedBlocks - lastPCPiecesNumber;

        lastBoard = this.matrix.slice(16);
        lastQueue = makeQueue.call(this);

        if (this.gamedata.PCs > lastPCNumber && this.placedBlocks > 0) {
          console.log(
            `${board2color(currentPCBoard)}\n-----------------------------`,
          );

          this.updatePCIndicator();
        }

        if ([3, 4].includes(pcBlock)) {
          console.log(board2color(lastBoard));

          console.log(`queue: ${lastQueue}`);
        }
      };

      const { getNextBlock, initRandomizer, initSetOnce } = Replayer.prototype;

      Replayer.prototype.initSetOnce = function initSetOnce_(...args) {
        const val = initSetOnce.apply(this, args);
        this.initPCIndicator();
        return val;
      };

      Replayer.prototype.initRandomizer = function initRandomizer_(...args) {
        const val = initRandomizer.apply(this, args);
        if (!isPCMode) {
          return val;
        }
        console.log(this);
        if (stateArray.length > 0) {
          isReplayEnd = true;
        }

        return val;
      };

      Replayer.prototype.getNextBlock = function getNextBlock_(...args) {
        const val = getNextBlock.apply(this, args);
        if (!isPCMode) {
          return val;
        }
        if (lastBoard.length > 0 && !isReplayEnd) {
          stateArray.push({
            board: board2str(lastBoard),
            queue: makeQueue.call(this),
            PCNumber: Math.max(lastPCNumber, 0),
            placedBlocks: this.placedBlocks,
          });
        }
        this.displayMatrixAndQueue();
        return val;
      };

      // https://gist.githubusercontent.com/Equim-chan/875a232a2c1d31181df8b3a8704c3112/raw/a0533ae7a0ab0158ca9ad9771663e94b82b61572/downloadlogs.js
      document.addEventListener('keydown', (event) => {
        if (isPCMode && (KEY === event.keyCode || KEY === event.key)) {
          if (stateArray.length > 0) {
            // download
            const parsedStateArray = parse(stateArray);
            download(
              // default filename
              `${new Date(replayDate).toLocaleString()}_jstris.json`.replace(
                /[ \/]/g,
                '_',
              ),
              PRETTY
                ? JSON.stringify(parsedStateArray, null, '    ')
                  .replace(/\n {7}\s+/g, ' ') // bring up log array items
                  .replace(/], \[/g, '],\n        [') // bump nested lists back down
                  .replace(/\n\s+]/g, ' ]') // bring up isolated right brackets
                  .replace(/\n\s+},\n/g, ' },\n') // ditto for non-final curly brackets
                : JSON.stringify(parsedStateArray),
            );
          }
        }
      });

      function parse(sArray) {
        // combine objects that have the same pc number
        const ret = [];
        let PCNumber = 0;
        let PCLoopIndicator = 1;
        let curPCNumberGroup = [];
        for (let i = 0; i < sArray.length; i += 1) {
          if (sArray[i].PCNumber !== PCNumber) {
            let tmp = { queue: '' };
            if (curPCNumberGroup.length > 0) {
              tmp = curPCNumberGroup.pop();
              ret.push({
                PCNumber,
                PCLoopIndicator,
                stateArray: curPCNumberGroup,
              });
            }
            curPCNumberGroup = [];
            // Push an empty board for each new PC
            if (tmp.queue.length > 0) {
              curPCNumberGroup.push({
                board: 'NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN',
                queue: tmp.queue,
                PCNumber: tmp.PCNumber + 1,
                placedBlocks: tmp.placedBlocks,
              });
            }

            PCNumber = sArray[i].PCNumber;
            PCLoopIndicator = (((sArray[i].placedBlocks - 1) * 5) % 7) + 1;
          }
          curPCNumberGroup.push(sArray[i]);
        }
        if (curPCNumberGroup.length > 0) {
          ret.push({ PCNumber, PCLoopIndicator, stateArray: curPCNumberGroup });
        }
        return ret;
      }

      function download(filename, text) {
        const element = document.createElement('a');
        element.setAttribute(
          'href',
          `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`,
        );
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    }
  });
}());
