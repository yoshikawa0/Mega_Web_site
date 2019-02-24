var storageName="cart";

// сохранить предмет в корзину
function save(item) {
	let itemsArray = getStoreArray(storageName);
	itemsArray.push(item);
	localStorage.setItem(storageName, JSON.stringify(itemsArray));
	console.log('added: '+item+' to cart');
}
    // загрузить предметы из localStorage и добавить в корзину на страницу
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
// удалить конкретный предмет из localStorage
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
// очистить localStorage и корзину на странице
function clearAll() {
	let ul = document.getElementById(storageName);
	while (ul.firstChild) {
    	ul.removeChild(ul.firstChild);
	}
	localStorage.clear();
}
// получить массив предметов в корзине
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
