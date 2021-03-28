/*
1. Дан большой текст, в котором для оформления прямой речи используются одинарные кавычки. Придумать шаблон, который заменяет одинарные кавычки на двойные.
2. Улучшить шаблон так, чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.
*/

class TextGenerator {
    constructor() {
        this.text = "'Улучшить шаблон так' , 'чтобы в конструкциях типа aren't одинарная кавычка не заменялась на двойную.'"
        this.regExp;
    }

    render() {
        let textPlace = document.querySelector("#text-correct-container");
        let myText = document.createElement("p");
        myText.innerHTML = this.text.replace((/^'|(\s)'|'(\s)|'$/g), '$1"$2');
        textPlace.appendChild(myText);
    }
}

const text = new TextGenerator();
text.render();