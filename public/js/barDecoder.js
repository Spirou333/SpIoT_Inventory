Quagga.init({
  inputStream : {
    name : "Live",
    type : "LiveStream",
    target: document.querySelector('#stream')
  },
  decoder : {
    readers : ["ean_reader"]
  }
}, function(err) {
    if (err) {
        console.log(err);
        return
    }
    console.log("Initialization finished. Ready to start");
    Quagga.start()
});

document.onLoad(function(){
  document.getElementById("startdecoder").addEventListener("click", startDecoder())
  document.getElementById("stopdecoder").addEventListener("click", stopDecoder())
})

function processCode(data) {
  Quagga.stop()
  console.log(this.data.codeResult.code)
}

function startDecoder() {
  Quagga.start()
}

function stopDecoder() {
  console.log("Stopped")
  Quagga.stop()
}

Quagga.onProcessed(processCode)