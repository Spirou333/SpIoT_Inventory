$(document).ready(function(){
  const listWrapper = $("#itemList")
  const favoriteWrapper = $("#favoriteList")
  const address = "http://" + window.location.host + "/"

  function createItemCard(item,favorite) {
    let html = "<div class='col-4 my-1'><a href='" + address + "viewItem/" + item.ean + "' class='card"
    if(favorite == 1) {
      html += " bg-warning"
    }
    html += "'><img src='http://via.placeholder.com/400x200' alt=''><div class='card-body'><h5 class='card-title'>"
    html += item.itemName
    html += "</h5><p class='card-text'>"
    html += item.type
    html += "</p></div><ul class='list-group list-group-flush'><li class='list-group-item'>Quantity: <bold>"
    html += item.quantity
    html += "</bold></li></ul></a></div>"

    return html
  }

  $.get( address + "itemList", function(data) {
    data.forEach(function(ele) {
      console.log(ele)
      console.log(ele.favorite)

      if(ele.favorite == 0) {
        listWrapper.append(createItemCard(ele,0))
      } else {
        favoriteWrapper.append(createItemCard(ele,1))
      }
    })
  })
})
