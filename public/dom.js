var inputField = document.querySelector(".input");
var list = document.getElementById("list");
var container = document.querySelector(".container");
var resultsContainer = document.querySelector(".results-container");
var globalData;

inputField.addEventListener("keyup", function(e) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  var userInput = e.target.value;
  if (userInput.length == 1) {
    request(userInput, displayKeys, displayValues);
  } else if (userInput.length == 0) {
  } else {
    var filteredObj = filterKeys(globalData, userInput);
    displayKeys(filteredObj);
  }
});

function displayValues() {
  list.addEventListener("click", function(e) {
    var phobiaKey = e.srcElement.innerText;
    var phobiaValue = e.target.dataset.phobiavalue;
    var content = document.createElement("p");
    var pContent = document.createTextNode(
      "A fear of " + phobiaKey + " is called "
    );
    var phobiaP = document.createElement("p");
    phobiaP.setAttribute("class", "phobia");
    var phobiaContent = document.createTextNode(phobiaValue);

    content.appendChild(pContent);
    phobiaP.appendChild(phobiaContent);
    resultsContainer.appendChild(content);
    resultsContainer.appendChild(phobiaP);
    document.body.replaceChild(resultsContainer, container);
    resultsContainer.classList.add("on");
  });
}

var request = function(param, callback1, callback2) {
  var xhr = new XMLHttpRequest();
  var url = "/api/phobias/" + param;
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);

        callback1(response);
        callback2();
        globalData = response;
      } else {
        console.log("error");
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
};

function displayKeys(data) {
  var keys = Object.keys(data);
  keys.splice(10);
  keys.forEach(function(key) {
    var item = document.createElement("li");
    item.setAttribute("class", "list__item");
    item.setAttribute("data-phobiavalue", data[key]);
    var text = document.createTextNode(key);
    item.appendChild(text);
    list.appendChild(item);
  });
}


function filterKeys(data, str) {
  var keys = Object.keys(data);
  var result = keys.filter(function(key) {
    return key.startsWith(str);
  });
  var resultObj = {};
  result.forEach(function(key) {
    resultObj[key] = data[key];
  });
  return resultObj;
}
