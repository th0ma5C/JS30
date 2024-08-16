class Clock {
    // private hour;
    // private minute;
    // private second;
    private hourHand: HTMLDivElement | null;
    private minuteHand: HTMLDivElement | null;
    private secondHand: HTMLDivElement | null;

    constructor() {
        // this.hour = new Date().getHours();
        // this.minute = new Date().getMinutes();
        // this.second = new Date().getSeconds();
        this.hourHand = document.querySelector('.hour-hand');
        this.minuteHand = document.querySelector('.min-hand');
        this.secondHand = document.querySelector('.second-hand');
    }

    // setNow() {
    //     this.hour = new Date().getHours();
    //     this.minute = new Date().getMinutes();
    //     this.second = new Date().getSeconds();
    // }

    setHour() {
        if (!this.hourHand) return
        let hour = new Date().getHours();
        let deg = 30 * Math.abs(hour + 3);
        this.hourHand.style.transform = `translate(-100%, -50%) rotate(${deg}deg)`;

        setInterval(() => {
            this.setHour()
        }, 1000 * 60 * 60);
    }

    setMin() {
        if (!this.minuteHand) return
        let minute = new Date().getMinutes();
        let deg = 6 * Math.abs(minute + 15);
        this.minuteHand.style.transform = `translate(-100%, -50%) rotate(${deg}deg)`;

        setInterval(() => {
            this.setMin()
        }, 1000 * 60);
    }

    setSec() {
        if (!this.secondHand) return
        let second = new Date().getSeconds();
        let deg = 1 * Math.abs(second + 15);
        this.secondHand.style.transform = `translate(-100%, -50%) rotate(${deg}deg)`;

        setInterval(() => {
            this.setSec()
        }, 1000);
    }
}

const clock = new Clock();

clock.setHour();
clock.setMin();
clock.setSec();
