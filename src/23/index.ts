// const msg = new SpeechSynthesisUtterance();
const voicesDropdown = document.querySelector('[name="voice"]') as HTMLSelectElement;
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

class Voicer {
    #utterance = new SpeechSynthesisUtterance();
    #voice: SpeechSynthesisVoice[] = [];
    // #selectOptions: SpeechSynthesisVoice | null = null
    #rate = '';
    #pitch = '';
    // #text = '';
    #isSpeaking = false;

    constructor() {
        this.setSelectOptions();
        this.getInput();
        this.listener();
    }

    getLangList() {
        return new Promise<void>((res) => {
            speechSynthesis.onvoiceschanged = () => {
                let list = speechSynthesis.getVoices();
                this.#voice = list.filter((voice) => {
                    return voice.lang.includes('en') || voice.lang.includes('zh')
                })
                console.log(this.#voice);
                res();
            }
        })
    }

    async setSelectOptions() {
        await this.getLangList();

        const fragment = document.createDocumentFragment();
        voicesDropdown.innerHTML = '';

        this.#voice.forEach((item) => {
            const option = document.createElement('option');
            option.textContent = item.name;
            option.value = item.name;
            if (item.name == 'Google US English') {
                option.selected = true;
            }
            fragment.appendChild(option);
        })

        voicesDropdown.appendChild(fragment);
    }

    getInput() {
        const input = document.querySelectorAll('input');
        input.forEach((item) => {
            if (item.id == 'rate') {
                this.#rate = item.value;
                return
            }
            this.#pitch = item.value;
        })
    }

    listener() {
        const input = document.querySelectorAll('input');
        input.forEach((item) => {
            item.addEventListener('input', (e) => {
                const target = e.target as HTMLInputElement;
                if (target.id == 'rate') {
                    this.#rate = item.value;
                } else {
                    this.#pitch = item.value;
                }
                if (this.#isSpeaking) {
                    this.speak();
                }
            })
        })

        // voicesDropdown.addEventListener('change', (e) => {
        //     const val = voicesDropdown.value;
        //     // this.#selectOptions = this.#voice.find(item => item.name == val) ?? null;
        //     this.#utterance.voice = this.#voice.find(item => item.name == val) ?? null;
        // })

        speakButton?.addEventListener('click', () => {
            this.speak()
        })
        stopButton?.addEventListener('click', () => {
            this.#isSpeaking = false;
            speechSynthesis.cancel()
        })
        this.#utterance.addEventListener('end', () => {
            this.#isSpeaking = false
        })
    }

    getSpeechContent() {
        const textArea = document.querySelector('textarea');
        this.#utterance.text = textArea?.value ?? '';
    }

    setUtteranceOptions() {
        const val = voicesDropdown.value;
        this.#utterance.voice = this.#voice.find(item => item.name == val) ?? null;
        this.#utterance.rate = Number(this.#rate);
        this.#utterance.pitch = Number(this.#pitch);
        this.getSpeechContent();
    }

    speak() {
        if (this.#isSpeaking) {
            speechSynthesis.cancel();
        }
        this.setUtteranceOptions();
        console.log(this.#utterance);
        speechSynthesis.speak(this.#utterance);
        this.#isSpeaking = true;
    }
}

const noise = new Voicer();