
// if storage isn't empty
let itemContainer = document.querySelector('.list-items');
let dataStoraged = localStorage.getItem('data');
let darkModeCase = localStorage.getItem('dark');
let itemsNum = document.querySelector('.item-num');
let data = [];

// for dark mode if any data saved
if (darkModeCase && darkModeCase === 'yes') {
    document.querySelector('.them').classList.add('dark');
} else {

    document.querySelector('.them').classList.remove('dark');
}
// for to do list if there is any data saved
if (dataStoraged && dataStoraged.length !== 0) {
    let dataStoragedParsed = JSON.parse(dataStoraged);
    dataStoragedParsed.forEach((oneItem) => {
        // create the item and add it to the list of items
        let newTodo = document.createElement('li');
        // checking befor creating if it checked or not
        if (oneItem.stats === "hold") {
            newTodo.className = 'item flex-center';
        } else if (oneItem.stats === "done") {
            newTodo.className = 'item checked flex-center';
        }
        newTodo.innerHTML = `${fillingStorage(oneItem)}`;
        itemContainer.prepend(newTodo);
        data.push(oneItem);
        itemsNum.innerHTML = `${data.length} items left`;
    })
}
/////////////////
let inputField = document.querySelector(".back-ground .all-project .input .input-field input");
let inputContainer = document.querySelector('.back-ground .all-project .input .input-field')
let enterBut = document.querySelector('.input .check');
let check = document.querySelector('.back-ground .all-project .list-items .item .check span');
let deleteBtn = document.querySelector('.list-items .item .delete');


// filling data funciton 
function filling(enter) {
    // create the item and add it to the list of items
    let newTodo = document.createElement('li');
    newTodo.className = 'item flex-center';
    newTodo.innerHTML =
        ` <div class="content flex-center">
        <div class="check flex-center">
            <span class="flex-center">
                <img src="./images/icon-check.svg" alt="">
            </span>
        </div>
        <div class="item-txt">
            <p>${enter.value.trim()}</p>
            <del>${enter.value.trim()}</del>
        </div>
    </div>
    <div class="delete">
        <img src="./images/icon-cross.svg" alt="">
    </div>`;
    itemContainer.prepend(newTodo);
}
// function to fill data dynamic in storage
function fillingStorage(item) {
    return `
        <div class="content flex-center">
            <div class="check flex-center">
                <span class="flex-center">
                    <img src="./images/icon-check.svg" alt="">
                </span>
            </div>
            <div class="item-txt">
                <p>${item.content}</p>
                <del>${item.content}</del>
            </div>
        </div>
        <div class="delete">
            <img src="./images/icon-cross.svg" alt="">
`
}
itemContainer.addEventListener('click', (e) => {
    // to check the item is don't or not
    let item = e.target.closest('.item');
    if (item) {
        // add class to item
        item.classList.toggle('checked');
        // modify the data in storage
        let duck = JSON.parse(localStorage.getItem('data'))
        if (item.classList.contains('checked')) {
            duck.forEach((one) => {
                if (one.content === item.querySelector('.item-txt p').innerHTML) {
                    one.stats = 'done';
                }
            })
            localStorage.setItem('data', JSON.stringify(duck))
        } else {
            duck.forEach((one) => {
                if (one.content === item.querySelector('.item-txt p').innerHTML) {
                    one.stats = 'hold';
                }
            })
            localStorage.setItem('data', JSON.stringify(duck))
        }
    }

    // delete button 
    if (e.target.tagName === 'IMG') {
        item.remove();
        let arr = JSON.parse(localStorage.getItem('data'));

        arr = arr.filter(one => one.content !== item.querySelector('.content .item-txt p').innerHTML);
        itemsNum.innerHTML = `${arr.length} items left`
        localStorage.setItem('data', JSON.stringify(arr))
    }
})

// create a new item and save data to storage function
function toDo() {
    // make sure the field isn't empty
    if (inputField.value.trim().length !== 0) {
        // filling data
        filling(inputField);
        let obj = {
            stats: 'hold',
            content: `${inputField.value.trim()}`
        }
        // update the array of data
        data.push(obj)
        itemsNum.innerHTML = `${data.length} items left`;
        inputField.value = '';
        // add data to storage
        localStorage.setItem('data', JSON.stringify(data));
    }
}

// add item on click using button
enterBut.addEventListener('click', toDo)
// add item on submit using enter button
inputContainer.addEventListener('submit', (e) => {
    // stop submitting
    e.preventDefault();
    // add a new item
    toDo()
})



//////////////////////////////////

// filter buttons
// all button
let allBut = document.querySelector('.all');
allBut.addEventListener('click', () => {
    document.querySelectorAll('.filter li').forEach((e) => {
        e.classList.remove('chosen')
    })
    allBut.classList.add('chosen');
    [...itemContainer.querySelectorAll('.item')].forEach((e) => {
        e.remove()
    })
    if (localStorage.getItem('data') && localStorage.getItem('data').length !== 0) {

        // get the hold items form storage
        let items = JSON.parse(localStorage.getItem('data'));
        items.forEach((oneItem) => {
            // create the item and add it to the list of items
            let newTodo = document.createElement('li');
            // checking befor creating if it checked or not
            if (oneItem.stats === "hold") {
                newTodo.className = 'item flex-center';
            } else if (oneItem.stats === "done") {
                newTodo.className = 'item checked flex-center';
            }
            newTodo.innerHTML = `${fillingStorage(oneItem)}`;
            itemContainer.prepend(newTodo);
            itemsNum.innerHTML = `${data.length} items left`;
        })
    }
})


// active button
let activeBut = document.querySelector('.active');
activeBut.addEventListener('click', () => {
    document.querySelectorAll('.filter li').forEach((e) => {
        e.classList.remove('chosen')
    })
    activeBut.classList.add('chosen');
    [...itemContainer.querySelectorAll('.item')].forEach((e) => {
        e.remove()
    })
    if (localStorage.getItem('data') && localStorage.getItem('data').length !== 0) {
        // get the hold items form storage
        let items = JSON.parse(localStorage.getItem('data'));
        items.forEach((item) => {
            // checking befor creating if it checked or not
            if (item.stats === "hold") {
                // create the item and add it to the list of items
                let newTodo = document.createElement('li');
                newTodo.className = 'item flex-center';
                newTodo.innerHTML = `${fillingStorage(item)}`;
                itemContainer.prepend(newTodo);
                itemsNum.innerHTML = `${data.length} items left`;
            }
        })
    }

})


// completed button
let completed = document.querySelector('.done');
completed.addEventListener('click', () => {
    document.querySelectorAll('.filter li').forEach((e) => {
        e.classList.remove('chosen')
    })
    completed.classList.add('chosen');
    [...itemContainer.querySelectorAll('.item')].forEach((e) => {
        e.remove()
    })

    // get the hold items form storage
    if (localStorage.getItem('data') && localStorage.getItem('data').length !== 0) {
        let items = JSON.parse(localStorage.getItem('data'));
        items.forEach((item) => {
            // checking befor creating if it checked or not
            if (item.stats === "done") {
                // create the item and add it to the list of items
                let newTodo = document.createElement('li');
                newTodo.className = 'item checked flex-center';
                newTodo.innerHTML = `${fillingStorage(item)}`;
                itemContainer.prepend(newTodo);
                itemsNum.innerHTML = `${data.length} items left`;
            }
        })
    }
})

// to clear all data from list
let clearBut = document.querySelector('.clear');
clearBut.addEventListener('click', () => {
    // clear the data from list
    [...itemContainer.querySelectorAll('.item')].forEach((e) => {
        e.remove()
    });
    // clear storage
    data = []
    localStorage.setItem('data', data)
    // item numbers
    itemsNum.innerHTML = "0 items left";
});


//////////////////////////////////////////////
let darkMode = document.querySelector('.them');



// main case for dark mode
if (!darkMode.classList.contains('dark')) {
    // change icon
    document.querySelector('.them img').src = './images/icon-sun.svg';
    // change the photo
    document.querySelector('.image img').src = './images/bg-desktop-light.jpg';
    // Set the value of the dark-item-color variable to white
    document.documentElement.style.setProperty('--dark-items-color', 'white');
    document.documentElement.style.setProperty('--dark-body-color', 'white');
    document.documentElement.style.setProperty('--dark-txt-color', 'black');
}

// click event to modify dark mode
darkMode.addEventListener('click', () => {
    darkMode.classList.toggle('dark');
    if (darkMode.classList.contains('dark')) {
        // change icon
        document.querySelector('.them img').src = './images/icon-sun.svg';
        // change the photo
        document.querySelector('.image img').src = './images/bg-desktop-light.jpg';
        // Set the value of the dark-item-color variable to white
        document.documentElement.style.setProperty('--dark-items-color', 'hsl(235, 24%, 19%)');
        document.documentElement.style.setProperty('--dark-body-color', '#222');
        document.documentElement.style.setProperty('--dark-txt-color', 'white');
        // add that case to local
        localStorage.setItem('dark', 'yes');
    } else {
        // change icon
        document.querySelector('.them img').src = './images/icon-moon.svg';
        // change the photo
        document.querySelector('.image img').src = './images/bg-desktop-light.jpg';
        // Set the value of the dark-item-color variable to white
        document.documentElement.style.setProperty('--dark-items-color', 'white');
        document.documentElement.style.setProperty('--dark-body-color', 'white');
        document.documentElement.style.setProperty('--dark-txt-color', 'black');
        // add that case to local
        localStorage.setItem('dark', 'no');
    }
})

////////////////////////
