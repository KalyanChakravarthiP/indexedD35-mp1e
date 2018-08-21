var empid;
var fname;
var lname;
var price;
var image;
var description;
var request

var storeDB


function data() {
  empid = document.getElementById("empid").value;
  fname = document.getElementById("fname").value;
  price = document.getElementById("price").value;
  image = document.getElementById("image").value;
  description = document.getElementById("description").value;

  if(empid==""){
document.getElementById("empid").style.border="1px solid red";
document.getElementById("id").style.display="block";
  } else if(fname==""){
document.getElementById("fname").style.border="1px solid red";
document.getElementById("name").style.display="block";
  } else if(price==""){
document.getElementById("price").style.border="1px solid red";
document.getElementById("mprice").style.display="block";
  }else if(image==""){
document.getElementById("image").style.border="1px solid red";
document.getElementById("mimage").style.display="block";
  } else if(description==""){
document.getElementById("description").style.border="1px solid red";
document.getElementById("mdesc").style.display="block";
  } else {




  // console.log(empidValue);
  // console.log(fnameValue);

  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
  window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
    READ_WRITE: "readwrite"
  }; // This line should only be needed if it is needed to support the object's constants for older browsers
  window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  }

  var db;
request = indexedDB.open("MyDatabase", 1);
  // request = window.indexedDB.open("MyTestDatabase", 3);

  request.onupgradeneeded = function(e) {
    var dbHandler = e.target.result;
    storeDB = dbHandler.createObjectStore("MyObjectStore", {keyPath: "id"});


    console.log("upgraded");


  }



  request.onerror = function(event) {
    // Do something with request.errorCode!
    console.log("error " + event);
    alert("Why didn't you allow my web app to use IndexedDB?!");
  };



  request.onsuccess = function(event) {
    var dbHandler = event.target.result;
    transaction = dbHandler.transaction(["MyObjectStore"], 'readwrite'),
      storeDB = transaction.objectStore('MyObjectStore');

    storeDB.get(4).onsuccess = function(e) {
      console.log(e.target.result);
    };
storeDB.put({
      id: empid,
      name: fname,
      price: price,
      image: image,
      description: description
    });
    // Do something with request.result!
    console.log("Success" + event);
  };

  var frm = document.getElementsByName('empForm')[0];
  console.log(frm);
  //    frm.submit(); // Submit the form
  frm.reset(); // Reset all form data
  return false;
}
}
