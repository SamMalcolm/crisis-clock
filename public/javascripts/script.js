const today = new Date();
let seconds_since_today = today.getTime();
theDate.setFullYear(2020);
theDate.setDate(1);
theDate.setMonth(1);
theDate.setHours(10);
theDate.setMinutes(18);
let time = theDate.getTime();
time = seconds_since_today - time;
let remainingTime = 0;
let days = Math.floor(time / (1000 * 60 * 60 * 24));
remainingTime = time % (1000 * 60 * 60 * 24);
let hours = Math.floor(remainingTime / (1000 * 60 * 60))
remainingTime = remainingTime % (1000 * 60 * 60)
remainingTime = remainingTime / 1000
let minutes = Math.floor(remainingTime / (60));
let seconds = Math.floor(remainingTime - minutes * 60);
let timer = [days, hours, minutes, seconds];

var socket = io();

setInterval(() => {

	timer[3]++;

	if (timer[3] == 60) {
		timer[3] = 0;
		timer[2]++;
	}
	if (timer[2] == 60) {
		timer[2] = 0;
		timer[1]++;
	}
	if (timer[1] == 24) {
		timer[1] = 0;
		timer[0]++;
	}

	document.querySelector(".days").innerHTML = timer[0];
	document.querySelector(".hours").innerHTML = timer[1];
	document.querySelector(".minutes").innerHTML = timer[2];
	document.querySelector(".seconds").innerHTML = timer[3];

}, 1000)



/* Tally */

var btn = document.querySelector('.count');

function addGate() {
	var gate = document.createElement('div');
	gate.classList.add('gate');
	document.querySelector(".tally").appendChild(gate);
}

function addBar() {
	var gates = document.querySelectorAll('.gate');
	var lastGate = [].slice.call(gates).pop();
	console.log(lastGate);
	var bar = document.createElement('span');
	bar.classList.add('bar');
	lastGate.appendChild(bar);
	total++;
}

function addBarInit() {
	var gates = document.querySelectorAll('.gate');
	var lastGate = [].slice.call(gates).pop();
	console.log(lastGate);
	var bar = document.createElement('span');
	bar.classList.add('bar');
	lastGate.appendChild(bar);
}

function tally() {
	let gates = document.querySelectorAll(".gate")
	if (!gates.length) {
		addGate();
	}
	if (total % 5 === 0) {
		addGate();
	}
	addBar();
}
function tallyInit() {
	let gates = document.querySelectorAll(".gate")
	if (!gates.length) {
		addGate();
	}
	if (total % 5 === 0) {
		addGate();
	}
	addBarInit();
}

for (let i = 0; i < total; i++) {
	tallyInit();
}

const crisisAnimation = () => {
	console.log("ANIMATE");
	var leftValue = Math.floor(Math.random() * 100);
	var topValue = Math.floor(Math.random() * 100);
	var rotation = Math.floor(Math.random() * 100);
	if (rotation > 45) {
		rotation = 360 - rotation;
	}
	if (topValue > 90) {
		topValue = 90;
	}
	if (topValue < 10) {
		topValue = 10;
	}
	if (leftValue > 90) {
		leftValue = 90;
	}
	if (leftValue < 10) {
		leftValue = 10;
	}

	document.querySelector(".crisis").classList.add('crisisAnimation');
	document.querySelector('.crisis').style = `left: ${leftValue}%; top:${topValue}%;`
	document.querySelector('.crisis').style.setProperty('--rotation', rotation + 'deg');
	setTimeout(() => {
		document.querySelector(".crisis").classList.remove('crisisAnimation');
	}, 1000)
}

socket.on('crisis', () => {
	for (let i = 0; i < timer.length; i++) {
		timer[i] = 0;
	}

	document.querySelector(".days").innerHTML = timer[0];
	document.querySelector(".hours").innerHTML = timer[1];
	document.querySelector(".minutes").innerHTML = timer[2];
	document.querySelector(".seconds").innerHTML = timer[3];

	crisisAnimation();
	tally();
})

btn.addEventListener('click', () => {
	for (let i = 0; i < timer.length; i++) {
		timer[i] = 0;
	}

	document.querySelector(".days").innerHTML = timer[0];
	document.querySelector(".hours").innerHTML = timer[1];
	document.querySelector(".minutes").innerHTML = timer[2];
	document.querySelector(".seconds").innerHTML = timer[3];

	socket.emit('crisis');
	crisisAnimation();
	tally();
});