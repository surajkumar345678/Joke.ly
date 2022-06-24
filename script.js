const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// disable/enable button
function toggleButton() {
    button.disabled = !button.disabled;

}
// Passing joke to VoiceRSS api
function tellMe(joke) {

    VoiceRSS.speech({
        key: 'd6d07b106ff2464294a6618dda4e9d77',
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// jokes api
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }


        tellMe(joke);
        toggleButton();
    } catch (error) {
        console.log('whoops', error);
    }
}
// getJokes();

// event listener
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);