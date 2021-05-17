const address = "http://localhost:3000/"

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
      alert("Successfully added")
    } else {
      alert("Error adding the item")
    }
  })
}
