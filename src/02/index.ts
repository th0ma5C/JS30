class Clock {
    #hoursDeg;
    #minDeg;
    #secDeg;

    #hourEL = document.querySelector('.hour-hand')! as HTMLElement;
    #minEl = document.querySelector('.min-hand')! as HTMLElement;
    #secondEl = document.querySelector('.second-hand')! as HTMLElement;

    constructor() {
        let time = new Date();

        this.#secDeg = time.getSeconds() * 6 + 90;
        this.#minDeg = time.getMinutes() * 6 + (time.getSeconds() * 0.1) + 90;
        this.#hoursDeg = time.getHours() * 30 + (time.getMinutes() * 0.5) + 90;

        this.#hourEL.style.transform = `translate(-100%, -50%)  rotate(${this.#hoursDeg}deg)`;
        this.#minEl.style.transform = `translate(-100%, -50%)  rotate(${this.#minDeg}deg)`;
        this.#secondEl.style.transform = `translate(-100%, -50%)  rotate(${this.#secDeg}deg)`;

    }

    updateTime() {
        this.#secDeg += 0.6;
        this.#minDeg += 6 / 600;
        this.#hoursDeg += 6 / 36000;

        this.updateStyle()
    }

    updateStyle() {
        this.#hourEL.style.transform = `translate(-100%, -50%)  rotate(${this.#hoursDeg}deg)`;
        this.#minEl.style.transform = `translate(-100%, -50%)  rotate(${this.#minDeg}deg)`;
        this.#secondEl.style.transform = `translate(-100%, -50%)  rotate(${this.#secDeg}deg)`;
    }

}


const clock = new Clock();

// const updateClock = () => {
//     clock.updateTime();
// };

// setInterval(() => {
//     updateClock()
// }, 100);

let lastTime = 0;
const interval = 100;

function update(time: DOMHighResTimeStamp) {
    if (time - lastTime >= interval) {
        lastTime = time;
        clock.updateTime();

        // console.log('Interval reached:', time);
    }

    requestAnimationFrame(update);
}

requestAnimationFrame(update);






