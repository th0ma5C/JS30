interface CoordinateSelectors {
    lng: string,
    lat: string,
    [key: string]: string
}

class Compass {
    #lng: number | null = null;
    #lat: number | null = null;

    constructor(selectors: CoordinateSelectors) {
        this.setPositionContent(selectors);
        this.watchPosition(selectors)
    }

    getCurrPosition(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                return reject(new Error('geolocation is not supported'))
            }
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    resolve(position);
                },
                (err) => {
                    reject(err)
                }
            )
        })
    }

    async setPositionContent(selectors: CoordinateSelectors) {
        const lng = document.querySelector(selectors.lng) as HTMLSpanElement;
        const lat = document.querySelector(selectors.lat) as HTMLSpanElement;
        try {
            const position = await this.getCurrPosition();
            this.#lat = position.coords.latitude;
            this.#lng = position.coords.longitude;

        } catch (error) {
            console.log(error);
        }

        lng.textContent = this.#lng?.toString() ?? '-';
        lat.textContent = this.#lat?.toString() ?? '-';
    }

    watchPosition(selectors: CoordinateSelectors) {
        const speed = document.querySelector(selectors.speed) as HTMLSpanElement;
        const compassPinter = document.querySelector(selectors.compass) as HTMLDivElement;

        navigator.geolocation.watchPosition(
            (position) => {
                speed.textContent = position.coords.speed?.toString() ?? '0';
                compassPinter.style.transform = `rotate${position.coords.heading}deg`;
            },
            (err) => {
                console.log(err);
            }
        )
    }
}

const coordinate = {
    lng: '.longitude',
    lat: '.latitude',
    speed: '.speed-value',
    compass: '.compassPinter'
}

const compass = new Compass(coordinate);
// compass.setPositionContent(coordinate);