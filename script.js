const items =
	['./img/1.jpg'
	,'./img/1.jpg'
	,'./img/2.jpg'
	,'./img/2.jpg'
	,'./img/3.jpg'
	,'./img/3.jpg'
	,'./img/4.jpg'
	,'./img/4.jpg'
	,'./img/5.jpg'
	,'./img/5.jpg'
	,'./img/6.jpg'
	,'./img/6.jpg'
	,'./img/7.jpg'
	,'./img/7.jpg'
	,'./img/8.jpg'
	,'./img/8.jpg'
	,'./img/9.jpg'
	,'./img/9.jpg'
	,'./img/10.jpg'
	,'./img/10.jpg'
	,'./img/11.jpg'
	,'./img/11.jpg'
	,'./img/12.jpg'
	,'./img/12.jpg'
	,'./img/13.jpg'
	,'./img/13.jpg'
	,'./img/14.jpg'
	,'./img/14.jpg'
	,'./img/15.jpg'
	,'./img/15.jpg'
	,'./img/16.jpg'
	,'./img/16.jpg'
	,'./img/17.jpg'
	,'./img/17.jpg'
	,'./img/18.jpg'
	,'./img/18.jpg'
	,'./img/19.jpg'
	,'./img/19.jpg'
	,'./img/20.jpg'
	,'./img/20.jpg'
	,'./img/21.jpg'
	,'./img/21.jpg'
	,'./img/22.jpg'
	,'./img/22.jpg'
	];

let openitems = [];
let matcheditems = [];
let moves = 0;
let timerOff = true;
let time = 0;
let timerId;

const itemsList = document.querySelectorAll('.item');
const panel = document.querySelector('.panel');

function generateGrid(item) {
  return `<li class="item">
            <img src="${item}">
          </li>`;
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

function endGame() {
	stoptimer();
	const totalMatches = items.length / 2;
	if (matcheditems.length === totalMatches * 2) {
		setTimeout(function() {
			const congratsMessage = `Congratulations! You've completed the game in ${time} seconds.`;
			alert(congratsMessage);
		}, 500);
	}
}

function startGame () {
	const panel = document.querySelector(".panel");
	let itemHTML = shuffle(items).map(function(item) {
		return generateGrid(item);
	});
	panel.innerHTML = (itemHTML.join(''));
}

startGame();

function evaluateClick(clickTarget) {
	return (
		clickTarget.classList.contains('item') &&
		!clickTarget.classList.contains('open') &&
		!clickTarget.classList.contains('match') &&
		openitems.length < 2 &&
		!openitems.includes(clickTarget)
	);
}

panel.addEventListener('click', event => {
	const clickTarget = event.target;

	if (evaluateClick(clickTarget)) {
		if (timerOff) {
			starttimer();
			timerOff = false;
		}
		toggleitem(clickTarget);
		openitems.push(clickTarget);

		if (openitems.length === 2) {
			checkIfItemsMatch();
		}
	}
 })

function toggleitem(clickTarget) {
	clickTarget.classList.toggle('open');
	clickTarget.classList.toggle('show');
}

function checkIfItemsMatch() {
	if (openitems[0].firstElementChild.src ===
		openitems[1].firstElementChild.src) {
			openitems[0].classList.toggle('match', true);
			openitems[1].classList.toggle('match', true);
			matcheditems.push(openitems[0]);
			matcheditems.push(openitems[1]);
			openitems = [];

			if (matcheditems.length === items.length) {
				endGame();
			}
	} else {
		setTimeout(function() {
			openitems.forEach(function(item) {
					item.classList.remove('open', 'show');
			});

			openitems.length = 0;
		}, 600);
	}
}

function displayTime() {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	const timer = document.querySelector('.timer');
	timer.innerHTML = time;
	if (seconds < 10) {
		timer.innerHTML = `${minutes}:0${seconds}`;
	} else {
		timer.innerHTML = `${minutes}:${seconds}`;
	}
}

function starttimer() {
	timerId = setInterval(() => {
		time++;
		displayTime();
	}, 1000);
}

function stoptimer() {
	clearInterval(timerId);
	timerOff = true;
}
