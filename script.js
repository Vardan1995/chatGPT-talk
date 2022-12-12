const button = document.createElement('button');

button.style = `
height: 100px;
width: 300px;
background-color: blue;
margin-left: 38%;`

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.onend = reset;
recognition.onresult = function (event) {
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            reset()

            const result = event.results[i][0].transcript
            document.querySelector('textarea').value += result
            document.querySelector('textarea').nextSibling.click();
            let myinterval = setInterval(() => {
                if (document.querySelector('textarea').nextSibling.firstChild.nodeName !== "svg") return
                clearInterval(myinterval)
                const textToRead = document.querySelector("#__next").innerText.split(result)[1].split("Free Research Preview: ChatGPT is optimized for dialogue.")[0]
                let msg = new SpeechSynthesisUtterance(textToRead);
                msg.lang = 'en-US';
                window.speechSynthesis.speak(msg);
            }, 1000);

        }
    }
};

let recognizing = false;

function reset() {
    recognizing = false;
    button.innerHTML = 'Click to Speak';
    recognition.stop();
}

function toggleStartStop() {
    if (recognizing) {
        recognition.stop();
        reset();
    } else {
        recognition.start();
        recognizing = true;
        button.innerHTML = 'Click to Stop';
    }
}

button.onclick = toggleStartStop;

navigator.webkitGetUserMedia({
    audio: true,
}, function (stream) {
    const audioTrack = stream.getAudioTracks()[0]
    audioTrack.stop();
}, function (err) {
    console.log(err);
});
document.body.append(button);


reset();