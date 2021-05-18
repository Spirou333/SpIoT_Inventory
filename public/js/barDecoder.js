const address = "http://" + window.location.host + "/"

//Initialization of Quagga with the required config
Quagga.init({
  inputStream : {
    name : "Live",
    type : "LiveStream", //Using the livestream instead of the option to upload images
    target: document.querySelector('#stream') //Element that holds the stream footage
  },
  decoder : {
    readers : ["ean_reader"] //Used for the standard EAN in Switzerland
  }
}, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log("Initialization of Quagga finished. Ready to start")
    Quagga.start()
})

//Click EventListener for starting and stopping the Quagga (the scanner)
$(document).ready(function(){
  $("#startdecoder").click(startDecoder())
  $("#stopdecoder").click(stopDecoder())
})

//Processing the detected code
function processCode(data) {
  //Checking if the detected code actually worked
  if(data !== undefined) {
    var ean = data.codeResult.code
    Quagga.stop() //Stopping Quagga since the code was successfully detected

    $.post(address + "checkEAN",{ean:ean}, function(data){
      if(data === 'exists') {
        window.location.replace(address + "update/" + ean);
      } else if (data === 'new') {
        window.location.replace(address + "new/" + ean);
      } else {
        alert("Error checking the EAN in the database")
      }
    })
  }
}

//Starting Quagga
function startDecoder() {
  Quagga.start()
}

//Stopping Quagga
function stopDecoder() {
  console.log("Stopped")
  Quagga.stop()
}

//On Detect Handler
Quagga.onDetected(processCode)
