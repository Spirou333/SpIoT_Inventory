const address = "http://" + window.location.host + "/"

function submit(path,form) {
  var formValues = {}
  $("#" + form + " :input").each(function(){
    let inputName = $(this).attr("id")
    let inputValue = $(this).val()
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
