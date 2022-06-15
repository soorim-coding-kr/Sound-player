// var prev_button, next_button;
let pageNum = 0;
let totalNum = 0;

var bgArray = new Array();

bgArray[0] = ['#0272a4', '#f6a564'];
bgArray[1] = ['#b6bfc8', '#36595b'];
bgArray[2] = ['#e58e82', '#6f569f'];

window.onload = function () {
	const prev_button = document.querySelectorAll('button')[0];
	const next_button = document.querySelectorAll('button')[1];

	const contentWrap = document.querySelector('.contentWrap');
	const disk_inner = document.querySelectorAll('.disk_inner');
	const album = document.querySelectorAll('.album');
	const pointBtnAll = document.querySelectorAll('.pointWrap li');
	const pointBtnActive = document.querySelector('.pointWrap li.active');
	let totalNum = album.length;

	function pagePlus() {
		if (pageNum < totalNum - 1) {
			pageNum++;
		} else {
			pageNum = 0;
		}
	}
	function pageMinus() {
		if (pageNum > 0) {
			pageNum--;
		} else {
			pageNum = totalNum - 1;
		}
	}

	prev_button.addEventListener('click', function () {
		pageMinus();
		pageChangeFunc();
	});

	next_button.addEventListener('click', function () {
		pagePlus();
		pageChangeFunc();
	});

	for (var i = 0; i < pointBtnAll.length; i++) {
		(function (idx) {
			pointBtnAll[idx].onclick = function () {
				// alert(idx);
				pageNum = idx;
				pageChangeFunc();
			};
		})(i);
	}

	//최초실행
	// pageNum = 2;
	pageChangeFunc();

	//여기서 모든 것을 한다.
	function pageChangeFunc() {
		contentWrap.style.background =
			'linear-gradient(120deg,' +
			bgArray[pageNum][0] +
			', ' +
			bgArray[pageNum][1] +
			')';

		for (var i = 0; i < totalNum; i++) {
			if (pageNum == i) {
				//현재 컨텐츠(페이지)
				album[i].classList.add('active');
				pointBtnAll[i].classList.add('active');
			} else {
				album[i].classList.remove('active');
				pointBtnAll[i].classList.remove('active');
			}
			disk_inner[pageNum].style.background = bgArray[pageNum][1];
		}
	}

	if (mobileChk()) {
		contentWrap.addEventListener('touchstart', touchFunc, false);
		// contentWrap.addEventListener("touchmove", touchFunc, false);
		contentWrap.addEventListener('touchend', touchFunc, false);
	}

	var start_X = 0;
	var end_X = 0;

	function touchFunc(e) {
		// console.log(e.type);
		// return false;
		// evt.preventDefault();

		var type = null;
		var touch = null;

		switch (e.type) {
			case 'touchstart':
				type = 'mousedown';
				touch = e.changedTouches[0];
				start_X = touch.clientX;
				//console.log("start_X : " + start_X);
				end_X = 0;
				break;
			// case "touchmove":
			//     type = "mousemove";
			//     touch = evt.changedTouches[0];
			//     console.log(touch)
			// break;
			case 'touchend':
				type = 'mouseup';
				touch = e.changedTouches[0];
				end_X = touch.clientX;

				//console.log("end_X : "+ end_X);

				var chkNum = start_X - end_X;
				var chkNumAbs = Math.abs(chkNum);
				//console.log(chkNum)

				if (chkNumAbs > 100) {
					// 스와이프를 일정 범위 이상 하면
					if (chkNum < 0) {
						//왼쪽으로 넘김
						// 방법 1
						// pageNum--;
						// if (pageNum < 0) {
						// 	pageNum = 2;
						// }

						//방법2
						// if (pageNum > 0) {
						// 	pageNum--;
						// } else {
						// 	pageNum = totalNum - 1;
						// }

						//방법3
						pageMinus();
					} else {
						//오른쪽으로 넘김

						//1
						// pageNum++;
						// if (pageNum > 2) {
						// 	pageNum = 0;
						// }

						//2
						// if (pageNum < totalNum - 1) {
						// 	pageNum++;
						// } else {
						// 	pageNum = 0;
						// }

						//3
						pagePlus();
					}
					pageChangeFunc();
				}
				break;
		}
	}
};

function mobileChk() {
	var mobileKeyWords = new Array(
		'Android',
		'iPhone',
		'iPod',
		'BlackBerry',
		'Windows CE',
		'SAMSUNG',
		'LG',
		'MOT',
		'SonyEricsson'
	);
	for (var info in mobileKeyWords) {
		if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
			return true;
		}
	}
	return false;
}
