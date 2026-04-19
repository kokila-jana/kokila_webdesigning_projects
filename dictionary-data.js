const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

let btn = document.querySelector("#search-btn");
let result = document.querySelector("#showans");
let sound = document.querySelector("#sound");

btn.addEventListener("click", searchWord);

document.querySelector("#myword").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        searchWord();
    }
});

async function searchWord() {

    let word = document.getElementById("myword").value.trim();

    if (word === "") {
        result.innerHTML = "Please enter a word";
        return;
    }

    result.innerHTML = "Searching...";

    try {
        let response = await fetch(url + word);
        let data = await response.json();

        if (data.title) {
            result.innerHTML = "Word not found";
            return;
        }

        let definition = data[0].meanings[0].definitions[0].definition;
       let example = "No example available";

for (let meaning of data[0].meanings) {
    for (let def of meaning.definitions) {
        if (def.example) {
            example = def.example;
            break;
        }
    }
    if (example !== "No example available") break;
}

        let audio = data[0].phonetics[0]?.audio || "";

        let selectedLang = document.getElementById("language-select").value;
        let translatedMeaning = "Translation not available";

        try {
            let translateUrl =
                "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl="
                + selectedLang +
                "&dt=t&q=" +
                encodeURIComponent(definition);

            let transRes = await fetch(translateUrl);
            let transData = await transRes.json();
            translatedMeaning = transData[0][0][0];

        } catch (error) {
            translatedMeaning = "Translation failed";
        }

        result.innerHTML = `
            <h3>${word}</h3>
            <p><strong>English:</strong> ${definition}</p>
            <p><strong>Translation:</strong> ${translatedMeaning}</p>
            <p><strong>Example:</strong> ${example}</p>
            <button onclick="playSound()">🔊 Pronounce</button>
        `;

        if (audio) {
            sound.src = audio;
        }

    } catch (error) {
        result.innerHTML = "Error fetching data";
    }
}

function playSound() {
    sound.play();
}

/* NAVIGATION */
function showPage(pageId) {
    document.getElementById("app").style.display = "none";
    document.getElementById("intro").style.display = "none";
    document.getElementById("tech").style.display = "none";
    document.getElementById("adv").style.display = "none";

    document.getElementById(pageId).style.display = "block";
}

/* VOICE SEARCH */
function startVoice() {

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice recognition not supported");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = function (event) {
        const spokenWord = event.results[0][0].transcript;
        document.getElementById("myword").value = spokenWord;
        searchWord();
    };
}
