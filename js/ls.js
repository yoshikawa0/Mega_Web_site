/*
* author: yoshikawa0
* responsible for loading / adding / deleting items to the cart
*/
var storageName="cart";
/**
 * save item to cart
 * @param {string} item - The value of the item.
 */
function save(item) {
	let itemsArray = getStoreArray(storageName);
	itemsArray.push(item);
	localStorage.setItem(storageName, JSON.stringify(itemsArray));
	console.log('added: '+item+' to cart');
}
/**
 * load cart items array from localStorage.
 * create li element for each item in cart
 * set onclick to delete li element on click
 * and append each li to parent ul element.
 */
function loadItems() {
	itemsArray = getStoreArray(storageName);
	if (itemsArray.length!=0) {
		for (let i = 0; i < itemsArray.length; i++) {
			let ul = document.getElementById(storageName);
			let li = document.createElement("li");
			li.textContent = itemsArray[i];
			li.onclick = function() {
				ul.removeChild(li);
				clear(itemsArray[i]);
			};
			ul.appendChild(li);
		}
	}	
}
/**
 * remove item with given value from localStorage cart items array
 * @param {string} item - value of item to remove
 */
function clear(item){
	let itemsArray = getStoreArray(storageName);
	for(let i=0;i<itemsArray.length;i++){
		if(itemsArray[i]===item){
			itemsArray.splice(i,1);
			localStorage.setItem(storageName, JSON.stringify(itemsArray));
			return;
		}
	}
}
/**
 * clear all items in localStorage cart items array
 */
function clearAll() {
	let ul = document.getElementById(storageName);
	while (ul.firstChild) {
    	ul.removeChild(ul.firstChild);
	}
	localStorage.clear();
}
/**
 * return locaStorage cart items array
 * if array don't exist yet - return empty array
 * @param {string} key - cart items array key
 */
function getStoreArray(key) {
	let itemsArray = localStorage.getItem(key);
	if (itemsArray == null || itemsArray =="") {
		itemsArray = new Array();
	}
	else {
		itemsArray = JSON.parse(itemsArray);
	}
	return itemsArray;
}
