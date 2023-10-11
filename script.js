document.addEventListener("DOMContentLoaded", function () {
  // Define variables to access the necessary elements.
  var startBtn = document.getElementById("start-btn");
  var stopBtn = document.getElementById("stop-btn");
  var textbox = document.getElementById("textbox");
  var instructions = document.getElementById("instructions");

  // Initialize the SpeechRecognition object.
  var recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  // When the "Start" button is clicked, start recording.
  startBtn.addEventListener("click", function () {
    recognition.start();
    instructions.textContent = "Recording...";

    // Handle speech recognition results.
    recognition.onresult = function (event) {
      var interimTranscript = "";
      for (var i = event.resultIndex; i < event.results.length; i++) {
        var transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          textbox.value = transcript;
        } else {
          interimTranscript += transcript;
        }
      }
    };
  });

  // When the "Stop" button is clicked, stop recording.
  stopBtn.addEventListener("click", function () {
    recognition.stop();
    instructions.textContent = "Press the Start button";
  });
});
