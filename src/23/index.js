"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Voicer_utterance, _Voicer_voice, _Voicer_rate, _Voicer_pitch, _Voicer_isSpeaking;
// const msg = new SpeechSynthesisUtterance();
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
class Voicer {
    constructor() {
        _Voicer_utterance.set(this, new SpeechSynthesisUtterance());
        _Voicer_voice.set(this, []);
        // #selectOptions: SpeechSynthesisVoice | null = null
        _Voicer_rate.set(this, '');
        _Voicer_pitch.set(this, '');
        // #text = '';
        _Voicer_isSpeaking.set(this, false);
        this.setSelectOptions();
        this.getInput();
        this.listener();
    }
    getLangList() {
        return new Promise((res) => {
            speechSynthesis.onvoiceschanged = () => {
                let list = speechSynthesis.getVoices();
                __classPrivateFieldSet(this, _Voicer_voice, list.filter((voice) => {
                    return voice.lang.includes('en') || voice.lang.includes('zh');
                }), "f");
                console.log(__classPrivateFieldGet(this, _Voicer_voice, "f"));
                res();
            };
        });
    }
    setSelectOptions() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getLangList();
            const fragment = document.createDocumentFragment();
            voicesDropdown.innerHTML = '';
            __classPrivateFieldGet(this, _Voicer_voice, "f").forEach((item) => {
                const option = document.createElement('option');
                option.textContent = item.name;
                option.value = item.name;
                if (item.name == 'Google US English') {
                    option.selected = true;
                }
                fragment.appendChild(option);
            });
            voicesDropdown.appendChild(fragment);
        });
    }
    getInput() {
        const input = document.querySelectorAll('input');
        input.forEach((item) => {
            if (item.id == 'rate') {
                __classPrivateFieldSet(this, _Voicer_rate, item.value, "f");
                return;
            }
            __classPrivateFieldSet(this, _Voicer_pitch, item.value, "f");
        });
    }
    listener() {
        const input = document.querySelectorAll('input');
        input.forEach((item) => {
            item.addEventListener('input', (e) => {
                const target = e.target;
                if (target.id == 'rate') {
                    __classPrivateFieldSet(this, _Voicer_rate, item.value, "f");
                }
                else {
                    __classPrivateFieldSet(this, _Voicer_pitch, item.value, "f");
                }
                if (__classPrivateFieldGet(this, _Voicer_isSpeaking, "f")) {
                    this.speak();
                }
            });
        });
        // voicesDropdown.addEventListener('change', (e) => {
        //     const val = voicesDropdown.value;
        //     // this.#selectOptions = this.#voice.find(item => item.name == val) ?? null;
        //     this.#utterance.voice = this.#voice.find(item => item.name == val) ?? null;
        // })
        speakButton === null || speakButton === void 0 ? void 0 : speakButton.addEventListener('click', () => {
            this.speak();
        });
        stopButton === null || stopButton === void 0 ? void 0 : stopButton.addEventListener('click', () => {
            __classPrivateFieldSet(this, _Voicer_isSpeaking, false, "f");
            speechSynthesis.cancel();
        });
        __classPrivateFieldGet(this, _Voicer_utterance, "f").addEventListener('end', () => {
            __classPrivateFieldSet(this, _Voicer_isSpeaking, false, "f");
        });
    }
    getSpeechContent() {
        var _a;
        const textArea = document.querySelector('textarea');
        __classPrivateFieldGet(this, _Voicer_utterance, "f").text = (_a = textArea === null || textArea === void 0 ? void 0 : textArea.value) !== null && _a !== void 0 ? _a : '';
    }
    setUtteranceOptions() {
        var _a;
        const val = voicesDropdown.value;
        __classPrivateFieldGet(this, _Voicer_utterance, "f").voice = (_a = __classPrivateFieldGet(this, _Voicer_voice, "f").find(item => item.name == val)) !== null && _a !== void 0 ? _a : null;
        __classPrivateFieldGet(this, _Voicer_utterance, "f").rate = Number(__classPrivateFieldGet(this, _Voicer_rate, "f"));
        __classPrivateFieldGet(this, _Voicer_utterance, "f").pitch = Number(__classPrivateFieldGet(this, _Voicer_pitch, "f"));
        this.getSpeechContent();
    }
    speak() {
        if (__classPrivateFieldGet(this, _Voicer_isSpeaking, "f")) {
            speechSynthesis.cancel();
        }
        this.setUtteranceOptions();
        console.log(__classPrivateFieldGet(this, _Voicer_utterance, "f"));
        speechSynthesis.speak(__classPrivateFieldGet(this, _Voicer_utterance, "f"));
        __classPrivateFieldSet(this, _Voicer_isSpeaking, true, "f");
    }
}
_Voicer_utterance = new WeakMap(), _Voicer_voice = new WeakMap(), _Voicer_rate = new WeakMap(), _Voicer_pitch = new WeakMap(), _Voicer_isSpeaking = new WeakMap();
const noise = new Voicer();
