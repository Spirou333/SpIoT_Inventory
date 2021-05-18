const address = "http://" + window.location.host + "/"

function submit(path,form) {
  var formValues = {}
  //Getting all the input fields expect buttons
  $("#" + form + " :input").not("button").each(function(){
    let inputName = $(this).attr("id") //Getting the inputfields ID as key
    let inputValue = $(this).val()
    //Checking if any of the values was not set
    if(inputValue === "" || inputValue === undefined || inputValue === null) {
      inputValue = null
    }
    //Checking for the favorite checkbox and converting it to boolean
    if(inputName == "favorite") {
      if(inputValue == "on") {
        inputValue = 1
      } else {
        inputValue = 0
      }
    }

    if(inputName == "usualPrice") {
      if(inputValue === "" || inputValue === undefined || inputValue === null) {
        inputValue = 0.0
      }
    }
    //Extending the object
    $.extend(formValues, {[inputName]:inputValue})
  })
  console.log(formValues)

  $.post(address + path,formValues, function(data){
    if(data == "OK") {
      alert("Successful")
    } else {
      alert("Error submitting the data")
    }
  })
}
