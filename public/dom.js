var inputField = document.querySelector(".input");
var list = document.querySelector('.list')

inputField.addEventListener("keyup", function(e) {
  var userInput = e.target.value;
  if (userInput.length == 1) {
    request(userInput, display);
  }
});

var request = function(param, callback) {
  var xhr = new XMLHttpRequest();
  var url = "/api/phobias/" + param;
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        callback(response);
      } else {
        console.log("error");
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};

function display(data){

  var keys = Object.keys(data)
  keys.forEach(function(val){
    var item = document.createElement('li')
    item.setAttribute('class', 'list__item')
    var text = document.createTextNode(val)
    item.appendChild(text)
    list.appendChild(item)
  })


}
