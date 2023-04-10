window.addEventListener('DOMContentLoaded', function(){
	// 메인페이지와 서브페이지 include 파일 경로 설정
	let pathName = window.location.pathname;
	let menuName = '';
	let root = '';

	// 서브페이지 확인
	if (pathName.indexOf('performance') > -1) {
		menuName = 'performance';
	} else if (pathName.indexOf('education') > -1) {
		menuName = 'education';
	} else if (pathName.indexOf('tickets') > -1) {
		menuName = 'tickets';
	} else if (pathName.indexOf('guide') > -1) {
		menuName = 'guide';
	}

	// 서브페이지일 경우 루트 경로 설정
	if (menuName !== '') {
		root = window.location.href.split(menuName)[0];
	
	// 메인 페이지일 경우, index.html로 참조를 할 경우
	} else {
		if (pathName.indexOf('index') > 0) {
			pathName = pathName.split('/index')[0];
		}
		root = window.location.origin + pathName;
		mainIntro();

	}

	// 인크루트 파일 경로
	let	pathHeader = root + '/inc/header.html';
	let pathFooter = root + '/inc/footer.html';

	// 서브페이지일 경우 인크루트 파일 변경
	if (menuName === '') {
		// console.log('main page');
	} else {
		pathHeader = root + '/inc/header_sub.html';
		pathFooter = root + '/inc/footer_sub.html';
	}

	// 인크루트 파일 로드
	fetch(pathHeader)
		.then(response => { return response.text(); })
		.then(data => {
			document.getElementById('header').innerHTML = data;
			// 서브페이지라면 GNB 메뉴에 강조 표시
			if (menuName !== ''){
				document.querySelector('.' + menuName + '-link').classList.add('on');
			}
			linkCurrentMonthSet();
		});
	fetch(pathFooter)
		.then(response => { return response.text(); })
		.then(data => { document.getElementById('footer').innerHTML = data; });


});


function linkCurrentMonthSet() {
	const currentMonth = new Date().getMonth() + 1;
	const performanceLink = document.querySelectorAll('.performanceLink');
	const educationLink = document.querySelectorAll('.educationLink');

	for (let i = 0; i < performanceLink.length; i++) {
		performanceLink[i].href = performanceLink[i].href + currentMonth;
		educationLink[i].href = educationLink[i].href + currentMonth;
	}
}


// 하위 폴더 이미지 경로 수정
// window.addEventListener('load', function(){
// 	const checkENG = window.location.pathname.indexOf('/en/') > -1;
// 	if (checkENG === true) {
// 		let imgTag = document.getElementsByTagName('img');
// 		for (let i = 0; i < imgTag.length; i++) {
// 			imgTag[i].src = imgTag[i].src.split('/en')[0] + imgTag[i].src.split('/en')[1];
// 		}
// 	}
// });

function openGnb(){
	document.querySelector('.mo-menu').classList.add('on');
}
function closeGnb(){
	document.querySelector('.mo-menu').classList.remove('on');
}

function mainIntro(){
	document.querySelector('.main-section').classList.add('on');
}