//======================PRELOADER=========================//======================
var loader = document.getElementById('preloader');

window.addEventListener('load', function () {
	loader.style.display = 'none';
});

//day date and month array

days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

date_data = new Date();

current_day = date_data.getDay();
current_date = date_data.getDate();
current_month = date_data.getMonth();

document.getElementById(
	'day_date_month'
).textContent = `${days[current_day]}, ${current_date} ${months[current_month]}`;

//============================= LIGHT AND DARK MODE TOGGLE ===================================//

let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#darkIcon');

const enableDarkMode = () => {
	document.body.classList.add('dark-theme');
	localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
	document.body.classList.remove('dark-theme');
	localStorage.setItem('darkMode', null);
};

if (darkMode === 'enabled') {
	enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
	darkMode = localStorage.getItem('darkMode');

	if (darkMode !== 'enabled') {
		enableDarkMode();
		darkModeToggle.src = '../Assets/sunicon.png';
	} else {
		disableDarkMode();
		darkModeToggle.src = '../Assets/moonicon.png';
	}
});

//============================= JS FUNCTIONS ===================================//
//getting all the required elements
const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const todoList = document.querySelector('.todolist');
const deleteAllBtn = document.querySelector('#clrButton');

inputBox.onkeyup = () => {
	let userData = inputBox.value; //getting user given data
	if (userData.trim() != 0) {
		//if the data isn't only spaces
		addBtn.classList.add('active'); //active add button
	} else {
		addBtn.classList.remove('active'); //deactive add button
	}
};
showTasks(); //function call

//If the addBtn is pressed do the following steps:
addBtn.onclick = () => {
	let userData = inputBox.value;
	let getLocalStorage = localStorage.getItem('New Todo'); //getting local storage

	if (getLocalStorage == null) {
		//if storage is empty
		listArr = []; //Create a blank array
	} else {
		listArr = JSON.parse(getLocalStorage);
		//transforming json storage to js object
	}
	listArr.push(userData); //pushing or adding user given data
	localStorage.setItem('New Todo', JSON.stringify(listArr));
	//transforming js object storage to json
	showTasks(); //function call
	addBtn.classList.remove('active'); //deactive add button
};

function showTasks() {
	let getLocalStorage = localStorage.getItem('New Todo'); //getting local storage

	if (getLocalStorage == null) {
		//if storage is empty
		listArr = []; //Create a blank array
	} else {
		listArr = JSON.parse(getLocalStorage);
		//transforming json storage to js object
	}
	const number = document.querySelector('.number');
	number.textContent = listArr.length; // gets the size of the array

	if (listArr.length > 0) {
		//if arr length>0
		deleteAllBtn.classList.add('active'); //activate delete all button
	} else {
		deleteAllBtn.classList.remove('active'); //de-activate delete all button
	}

	let newLiTag = '';
	listArr.forEach((element, index) => {
		newLiTag += `<li> ${element}<span onclick = "deleteTask(${index})"; ><i class='bx bx-check'></i></span></li>`;
	});
	todoList.innerHTML = newLiTag; //adding new li tag inside the ul tags
	inputBox.value = ''; //once task is added leave the input box field
}

//DELETE TASKS
function deleteTask(i) {
	let getLocalStorage = localStorage.getItem('New Todo');
	//Getting the local storage
	listArr = JSON.parse(getLocalStorage);

	listArr.splice(i, 1); //Delete element particular element with index value and delete one at a time
	localStorage.setItem('New Todo', JSON.stringify(listArr));

	//After removing a list item, update the local storage
	//Transforming js object storage to JSON

	//function call
	showTasks();
}

//delete all button
deleteAllBtn.onclick = () => {
	listArr = []; //empty array list
	localStorage.setItem('New Todo', JSON.stringify(listArr));
	//after deleting all tasks, update the local storage
	//transforming js object storage to json
	showTasks(); //function call
};
