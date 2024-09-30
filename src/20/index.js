"use strict";
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResult = true;
recognition.lang = 'en-Us';
// recognition.lang = 'zh-TW';
recognition.continuous = false;
function writeDoneSpeech(str) {
    const p = document.createElement('p');
    p.textContent = str;
    const words = document.querySelector('.words');
    words.appendChild(p);
}
recognition.onresult = (e) => {
    console.log(e);
    if (e.isTrusted) {
        const transcript = e.results[0][0].transcript;
        console.log(transcript);
        writeDoneSpeech(transcript);
    }
};
recognition.addEventListener('end', () => {
    recognition.start();
});
recognition.start();
