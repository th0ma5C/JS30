class Timer {
    #controlBtn;
    #inputCountEl;
    #timeLeftEl;
    #currTimeEl;
    #animationFrameId: number | null = null;
    #currentTimeIntervalId: number | null = null;
    #countdownIntervalId: number | null = null;


    constructor() {
        this.#controlBtn = document.querySelectorAll('.timer__controls button') as NodeListOf<HTMLButtonElement>;
        this.#inputCountEl = document.querySelector('#custom') as HTMLInputElement;
        this.#timeLeftEl = document.querySelector('.display__time-left') as HTMLHeadingElement;
        this.#currTimeEl = document.querySelector('.display__end-time') as HTMLParagraphElement;

        this.setCurrTime();
        this.addListener();
    }

    getCurrTime() {
        return new Date().toLocaleTimeString('zh-TW', { hour12: false });
    }

    setCurrTime() {
        this.#currTimeEl.textContent = `現在時間 ${this.getCurrTime()}`;

        this.#currentTimeIntervalId = setInterval(() => {
            this.#currTimeEl.textContent = `現在時間 ${this.getCurrTime()}`;
        }, 1000);
        // this.#animationFrameId = requestAnimationFrame(() => this.setCurrTime());
    }

    getCountdown(e: MouseEvent) {
        const target = e.target as HTMLButtonElement;
        return Number(target.dataset.time)
    }

    formatTime(val: string | number) {
        let period = Number(val);
        const min = Math.floor(period / 60);
        const sec = period % 60;

        return [
            min < 10 ? '0' + min : min,
            sec < 10 ? '0' + sec : sec
        ]
    }

    setCountdown(val: number) {
        let period = Number(val);
        const [min, sec] = this.formatTime(period);
        this.#timeLeftEl.textContent = `${min}:${sec}`;

        this.#countdownIntervalId = setInterval(() => {
            period -= 1;
            if (period == 0 && this.#countdownIntervalId) {
                clearInterval(this.#countdownIntervalId);
                this.resetDisplay();
            }

            const [min, sec] = this.formatTime(period);
            this.#timeLeftEl.textContent = `${min}:${sec}`;
        }, 1000)
    }

    resetDisplay() {
        this.#timeLeftEl.textContent = `00:00`;
        this.setCurrTime();
    }

    setEndTime(val: number) {
        if (this.#currentTimeIntervalId) {
            clearInterval(this.#currentTimeIntervalId)
        }
        const period = Number(val) * 1000;
        const futureTime = Date.now() + period;
        const end = new Date(futureTime).toLocaleTimeString('zh-TW', { hour12: false });
        this.#currTimeEl.textContent = `結束時間 ${end}`;
    }

    addListener() {
        this.#controlBtn.forEach(item => {
            item.addEventListener('click', (e) => {
                if (this.#countdownIntervalId) {
                    clearInterval(this.#countdownIntervalId);
                }
                const countdown = this.getCountdown(e);
                this.setCountdown(countdown);
                this.setEndTime(countdown);
            })
        })

        this.#inputCountEl.addEventListener('submit', (e) => {
            e.preventDefault();
            const target = e.target as HTMLFormElement
            const data = new FormData(target);
            const sec = Number(data.get('minutes')) * 60;
            if (isNaN(sec) || sec <= 0) {
                alert('請輸入數字')
                return
            }
            if (this.#countdownIntervalId) {
                clearInterval(this.#countdownIntervalId);
            }
            this.setCountdown(sec);
            this.setEndTime(sec);
        })

    }
}

const customTimer = new Timer();

console.log();