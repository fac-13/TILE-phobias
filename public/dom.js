var inputField = document.querySelector(".input");

inputField.addEventListener("keyup", function(e) {
  var userInput = e.target.value;
  }
});


var request = function(param){
var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
      if (xhr.readyState === 200){

      }else {
        console.log(error)
      }
    }
  }
  xhr.open("GET", url, true)
  xhr.send()
}