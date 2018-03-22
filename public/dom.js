var inputField = document.querySelector(".input");
var list = document.querySelector('.list')
var container = document.querySelector('.container')
var resultsContainer = document.querySelector('.results-container')

inputField.addEventListener("keyup", function(e) {
  var userInput = e.target.value;
  if (userInput.length == 1) {
    request(userInput, displayKeys, displayValues);
  }
});

function displayValues(){
  list.addEventListener('click', function(e){
    var phobiaKey = e.srcElement.innerText;
    var phobiaValue = e.target.dataset.phobiavalue;
    // console.log(e.target.dataset.phobiavalue)
    // console.log(e.srcElement.dataset.phobiavalue);

    var content = document.createElement('p')
    var pContent = document.createTextNode('A fear of '+ phobiaKey + ' is called ')
    var phobiaP = document.createElement('p')
    var phobiaContent = document.createTextNode(phobiaValue)
    content.appendChild(pContent)
    phobiaP.appendChild(phobiaContent)
    resultsContainer.appendChild(content)
    resultsContainer.appendChild(phobiaContent)

    document.body.replaceChild(resultsContainer, container)

  })
}


var request = function(param, callback1, callback2) {
  var xhr = new XMLHttpRequest();
  var url = "/api/phobias/" + param;
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
        callback1(response);
        callback2()
      } else {
        console.log("error");
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};

function displayKeys(data){
  var keys = Object.keys(data)
  keys.forEach(function(val){
    var item = document.createElement('li')
    item.setAttribute('class', 'list__item')
    item.setAttribute('data-phobiavalue', data[val])
    var text = document.createTextNode(val)
    item.appendChild(text)
    list.appendChild(item)
  })
}
