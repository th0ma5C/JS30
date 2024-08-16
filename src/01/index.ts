class KeySoundList {
    private keys: NodeListOf<HTMLDivElement>;
    private audioList;

    constructor() {
        this.keys = document.querySelectorAll('.key');
        this.audioList = document.getElementsByTagName('audio');
    }

    play(input: string) {
        const keyEl = Array.from(this.keys).find((key) => {
            return key.dataset.key === input;
        });

        const audioEL = Array.from(this.audioList).find((item) => {
            return item.dataset.key === input;
        });

        if (!audioEL || !keyEl) {
            console.log('wrong input');
            return
        }

        audioEL.currentTime = 0;
        audioEL.play();
        console.log(`playing ${audioEL.dataset.key}`);

        keyEl.classList.add('playing');
        keyEl.addEventListener('transitionend', () => {
            keyEl.classList.remove('playing')
        })
    }

}

const playSound = new KeySoundList();

document.addEventListener('keydown', (e) => {
    const input = e.key.toUpperCase();
    playSound.play(input);
})
