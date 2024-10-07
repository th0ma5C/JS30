"use strict";
function getRandomInt(scope) {
    return Math.floor(Math.random() * scope);
}
class WhackMole {
    #holeElList;
    #scoreEl;
    #score = 0;
    #gameId;
    constructor() {
        this.#holeElList = document.querySelectorAll('.hole');
        this.#scoreEl = document.querySelector('.score');
        if (!this.#scoreEl) {
            throw new Error('Score element not found');
        }
        // this.triggerMole();
        this.listener();
    }
    getRandomList() {
        let result = new Set();
        const count = getRandomInt(6);
        while (result.size < count) {
            result.add(getRandomInt(6));
        }
        return Array.from(result);
    }
    triggerMole() {
        const list = this.getRandomList();
        if (list.length == 0) {
            this.#gameId = setTimeout(() => {
                this.triggerMole();
            }, 500);
            return;
        }
        const time = Array.from(list, () => getRandomInt(4) * 1000);
        list.forEach((item, index) => {
            const target = this.#holeElList[item].querySelector('.mole');
            target.style.pointerEvents = 'all';
            target.style.top = `0`;
            setTimeout(() => {
                target.style.pointerEvents = 'none';
                target.style.top = `100%`;
            }, time[index]);
        });
        this.#gameId = setTimeout(() => {
            this.triggerMole();
        }, Math.max(...time) + 500);
    }
    displayScore() {
        this.#scoreEl.textContent = `${this.#score}`;
    }
    resetScore() {
        if (this.#gameId) {
            clearTimeout(this.#gameId);
            this.#holeElList.forEach((item) => {
                item.querySelector('.mole').style.top = '100%';
            });
        }
        this.#scoreEl.textContent = `0`;
    }
    listener() {
        document.querySelector('.game')?.addEventListener('click', (e) => {
            if (!e.isTrusted)
                return;
            const target = e.target.closest('.mole');
            if (!target)
                return;
            target.style.pointerEvents = 'none';
            target.style.top = '100%';
            this.#score++;
            this.displayScore();
        });
    }
}
const Game = new WhackMole();
const countdown = document.querySelector('.countdown');
let gameInterval;
let gameTimeout;
const startGame = () => {
    if (gameInterval || gameTimeout) {
        clearInterval(gameInterval);
        clearTimeout(gameTimeout);
    }
    Game.resetScore();
    let countdownTime = 3;
    countdown.textContent = `${countdownTime}`;
    countdown.style.display = 'block';
    gameInterval = setInterval(() => {
        countdownTime -= 1;
        countdown.textContent = `${countdownTime}`;
    }, 1000);
    gameTimeout = setTimeout(() => {
        countdown.style.display = 'none';
        clearInterval(gameInterval);
        Game.triggerMole();
    }, 3000);
};
/**
 * 代码结构优化：
    将显示和隐藏地鼠的逻辑抽取为单独的方法 showMole() 和 hideMole()，提高代码复用性。
    添加 startGame() 和 stopGame() 方法来更好地控制游戏状态。

    功能扩展：
    添加 stopGame() 函数，允许在游戏进行中停止游戏。

    设定一个固定的游戏时间，例如 30 秒，游戏在时间结束后自动停止。

    提高代码的可维护性和扩展性
    问题：
    将游戏的配置硬编码在代码中，修改起来不方便。
    优化建议：
    使用配置对象来管理游戏的参数，如地鼠数量、游戏时长、地鼠出现频率等。
    这样可以方便地调整游戏难度，或根据需要扩展功能。
    const config: GameConfig = {
    gameDuration: 30000,
    minMoleTime: 800,
    maxMoleTime: 1500,
    minInterval: 200,
    maxInterval: 1000,
    holeCount: 6,

    10. 添加游戏结束的处理
    问题：
    当前游戏结束后，地鼠可能还会继续出现，影响游戏体验。
    优化建议：
    在游戏结束时，清除所有定时器，并禁用玩家的操作。
    显示游戏结束的界面或信息。
};
 */ 
