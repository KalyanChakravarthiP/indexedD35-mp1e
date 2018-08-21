


function fetchJson(file){
	return new Promise((resolve,reject)=>{
		return fetch(file).then(response=>{
			if(response.ok){
				resolve(response.json());
			} else {
				reject(new Error('error'));
			}
		})
	})
}

// var storeDb;
var data;
var fetchedData=fetchJson("database/data.json");
fetchedData.then(data=>{
	console.log(data);
	products(data);
})


function products(d){

var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

var open = indexedDB.open("MyDatabase", 1);

open.onupgradeneeded = function() {
    var db = open.result;
    var store = db.createObjectStore("MyObjectStore", {keyPath: "id"});
    // var index = store.createIndex("NameIndex", ["data.name"]);
};

open.onsuccess = function() {
    // Start a new transaction
    var db = open.result;
    var tx = db.transaction("MyObjectStore", "readwrite");
    var store = tx.objectStore("MyObjectStore");
    // var index = store.index("NameIndex");

    for(var i=0; i<d.length; i++){

    store.put({id:d[i].id, category:d[i].category, name :d[i].name, price:d[i].price, image: d[i].image, description:d[i].description});
    // store.put({id: 67890, name: {first: "Bob", last: "Smith"}, age: 35});
    }

    function getAllItems(callback) {
    var trans = db.transaction("MyObjectStore", IDBTransaction.READ_ONLY);
    var store = trans.objectStore("MyObjectStore");
    var items = [];
 
    trans.oncomplete = function(evt) {  
        callback(items);
    };
 
    var cursorRequest = store.openCursor();
 
    cursorRequest.onerror = function(error) {
        console.log(error);
    };
 
    cursorRequest.onsuccess = function(evt) {                    
        var cursor = evt.target.result;
        if (cursor) {
            items.push(cursor.value);
            cursor.continue();
        }
    };
}

var body=document.querySelector("#body")

getAllItems(function (items) {
    var len = items.length;
    var mainDiv=document.createElement("section");
    mainDiv.classList.add("mainDiv")
    body.appendChild(mainDiv);
    for (var i = 0; i < len; i += 1) {
    	var childDiv=document.createElement("div");
    	childDiv.classList.add("childDiv");
    	mainDiv.appendChild(childDiv);
    	var thumbnail=document.createElement("img");
    	thumbnail.src=items[i].image;

    	var title=document.createElement("h3");
    	title.textContent=items[i].name;

    	var price=document.createElement("h3");
    	price.style.color="red";
    	price.textContent="₹: "+items[i].price+" /-";

    	var button=document.createElement("a");
    	button.href="book.html?id="+items[i].id;
    	button.textContent="Buy Now";
        button.classList.add("a");

    	childDiv.appendChild(thumbnail);
    	childDiv.appendChild(title);
    	childDiv.appendChild(price);
    	childDiv.appendChild(button);
        console.log(items[i]);
    }
});
    // Query the data
//     for (var i = 1; i <= d.length; i++) {
    
    
//     var getJohn = index.get(i);
//     console.log(getJohn);
//     // var getBob = index.get(1);

//     getJohn.onsuccess = function() {
//     console.log(getJohn.result.data.category);  // => "John"
//     };
// }

    // getBob.onsuccess = function() {
    //     console.log(getBob.result.data.price);   // => "Bob"
    // };

    // Close the db when the transaction is done
    tx.oncomplete = function() {
        db.close();
    };
}

}
// var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
//   window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
//     READ_WRITE: "readwrite"
// };

// var idb=window.indexedDB.open("myDb",1);

// idb.onupgradeneeded=function(e){
// var dbHandler=e.target.result;
// storeDB = dbHandler.createObjectStore("products", {keyPath:"productName"});
// console.log("upgraded successfully");
// }

// idb.onerror=function(e){
// 	console.log("error"+e);
// }

// idb.onsuccess=function(e){
// 	var dbHandler=e.target.result;
// 	transaction=dbHandler.transaction(['products'], 'readwrite'),
// 	storeDb=transaction.objectStore('products');
// 	storeDB.get(4).onsuccess = function(e) {
//       console.log(e.target.result);
//     };
//     storeDb.put({

// 	});
// 	};

	