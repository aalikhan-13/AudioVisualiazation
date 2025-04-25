const canvas = document.getElementById("waveform") // accessses visualization element from html
const ctx = canvas.getContext('2d')

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight

const input = document.getElementById("audioFileInput") // accesses file input element from html

let audioCtx; // main web audio controller 
let analyzer; // audio node
let dataArray; // holds data value
let bufferLength; // values per frame

input.addEventListener('change', async (e) => { // e is the event (user uploads a file)
    const file = e.target.files[0]; // saves the file input as file
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer(); // converts the file into raw binary decodable data (array buffer)
    audioCtx = new AudioContext(); // creates a new audio context

    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer); // decodes binary data into playable audio

    const source = audioCtx.createBufferSource(); // creates a new audio source
    source.buffer = audioBuffer; // attatches the buffer to the audio source - it can now be played back

    analyzer = audioCtx.createAnalyser(); // creates analyzer node - allows us to access data
    analyzer.fftSize = 2048; // 2048 samples per frame

    bufferLength = analyzer.fftSize;
    dataArray = new Uint8Array(bufferLength); // creates a new array to store data values betweeen 0 and 255

    source.connect(analyzer);
    analyzer.connect(audioCtx.destination); // audio travels from source -> analyzer -> destination (speakers)

    source.start();
    draw();
})

function draw() {
    requestAnimationFrame(draw);
    analyzer.getByteTimeDomainData(dataArray); // fills data array with values

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // clears the canvas

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#0f0';
    ctx.beginPath();

    const sliceWidth = canvas.width / bufferLength; // horizontal width of each point
    let x = 0; // current canvas location

    for (let i = 0; i < bufferLength; i ++) {
        const v = dataArray[i] / 128.0; // normalizing data around the center (128)
        const y = (v * canvas.height) / 2; // map to canvas height

        if (i == 0) {
            ctx.moveTo(x,y); // start the path
        }
        else {
            ctx.lineTo(x,y); // connect the line to build the waveform
        }
        x += sliceWidth;
    }

    ctx.lineTo(canvas.width, canvas.height / 2); // end line at the right side
    ctx.stroke();
}