var inputField = document.querySelector(".input");

inputField.addEventListener("keyup", function(e) {
  var userInput = e.target.value;
  if (userInput.length == 1) {
    request(userInput);
  }
});

var request = function(param) {
  var xhr = new XMLHttpRequest();
  var url = "/api/phobias/" + param;
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.readyState === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
      } else {
        console.log(error);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};
