document.getElementById("addItem").addEventListener("click",(event)=>{event.preventDefault()})
let itemText;
let itemsArray = [];
let itemIndex = 0;

loadItems();

function addItem(){
    itemText = document.getElementById("itemText").value.trim();
    
    if(itemText == ""){
        alert("Please insert a valid item.");
    }else if(itemsArray.indexOf(itemText) != -1) {
        alert("This item already exists in the list.");
    }else{
        itemsArray.push(itemText);
        createItem(itemText);
        saveItems();
    }

}

function createItem(itemText){
    document.getElementById("itemsContainer").innerHTML += `
                <div class="checkableItem"> 
                    <input type="checkbox" name="checkbox" id="check-item-${itemIndex}" onChange="doneItem(this.id)">
                    <p>${itemText}</p>
                    <button class="edit" id="edit-item-${itemIndex}" onClick="editItem(this.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                    </button>
                    <button class="trash" id="delete-item-${itemIndex}" onClick="deleteItem(this.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>
                </div>
                ` 
    // Editar o item quando fizer a lógica de editar e excluir
    document.getElementById("itemText").value = "";
    itemIndex++;
}

function deleteItem(clickedId){
    const parent = document.getElementById(`${clickedId}`).parentElement;
    const text = parent.children[1].innerHTML;
    const index = itemsArray.indexOf(text);

    if(index !== -1){
        itemsArray.splice(index, 1);
    }

    parent.remove();
    saveItems();
    itemIndex--;
}

function doneItem(clickedId){
    const parent = document.getElementById(`${clickedId}`).parentElement;
    const check = parent.children[0].checked;

    if(check){
        parent.children[1].style.textDecoration = "line-through";
    }else{
        parent.children[1].style.textDecoration = "none";
    }
}

function editItem(clickedId){
    const parent = document.getElementById(`${clickedId}`).parentElement;
    const index = clickedId.slice(10);
    let textContent;

    if(!parent.querySelector('input[type="text"]')){
        console.log(parent);
        textContent = parent.children[1].textContent;
        parent.innerHTML = `
            <input type="checkbox" name="checkbox" id="check-item-${index}" onChange="doneItem(this.id)">
            <input type="text" class="input-edit-mode" id="edit-input-${index}" value="${textContent}">
            <button class="edit" id="edit-item-${index}" onClick="editItem(this.id)">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            </button>
            <button class="trash" id="delete-item-${index}" onClick="deleteItem(this.id)">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
        `
    }else{
        console.log(parent);
        textContent = document.getElementById(`edit-input-${index}`).value;
        parent.innerHTML = `
            <input type="checkbox" name="checkbox" id="check-item-${index}" onChange="doneItem(this.id)">
            <p>${textContent}</p>
            <button class="edit" id="edit-item-${index}" onClick="editItem(this.id)">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
            </button>
            <button class="trash" id="delete-item-${index}" onClick="deleteItem(this.id)">
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
        `
        itemsArray[index] = textContent;
        console.log(itemsArray[index]);
        saveItems();
    }
}

function saveItems(){
    localStorage.setItem("Items", JSON.stringify(itemsArray));
}

function loadItems(){
    itemsArray = JSON.parse(localStorage.getItem("Items")) || [];
    itemsArray.forEach((item)=>{
        createItem(item);
    })
}

