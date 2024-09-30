// window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
}

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResult = true;
recognition.lang = 'en-Us';
// recognition.lang = 'zh-TW';
recognition.continuous = false;

function writeDoneSpeech(str: string) {
    const p = document.createElement('p');
    p.textContent = str;

    const words = document.querySelector('.words') as HTMLDivElement;
    words.appendChild(p);
}

recognition.onresult = (e: any) => {
    console.log(e);
    if (e.isTrusted) {
        const transcript = (e.results as SpeechRecognitionResultList)[0][0].transcript;
        console.log(transcript);
        writeDoneSpeech(transcript);
    }
}

recognition.addEventListener('end', () => {
    recognition.start();
})

recognition.start();