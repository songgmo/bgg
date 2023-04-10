window.addEventListener('DOMContentLoaded', function(){
	const currentMonth = window.location.search.split('month=')[1];
	const path = window.location.origin + window.location.pathname;
	const currentPageDepth = window.location.search.indexOf('dayPage') > -1 ? 'dayPage' : 'subPage';
	if (currentPageDepth == 'subPage'){
		const head = document.getElementsByTagName('head')[0];
		const script = document.createElement('script');
		script.src = path+'month_'+currentMonth+'.js';
		head.appendChild(script);
	}

});


window.addEventListener('load', function(){
	// 일자 페이지 확인
	// const checkDayPage = window.location.search.indexOf('dayPage') > -1;
	// 월 표시
	const currentMonth = parseInt(window.location.search.split('month=')[1]);
	// const currentMonth = new Date().getMonth() + 1;
	const pageMonth = new Date().getMonth() + 1;
	const monthNum = document.getElementsByClassName('month-num')[0];

	// 다음 월, 이전 월 링크 세팅
	monthNum.innerHTML = currentMonth;
	const linkNext = document.getElementsByClassName('link-next')[0];
	const linkPrev = document.getElementsByClassName('link-prev')[0];
	const path = window.location.origin + window.location.pathname;
	const nextMonth = currentMonth == 12 ? 1 : currentMonth + 1;
	const prevMonth = currentMonth == 1 ? 12 : currentMonth - 1;
	linkNext.href = path+'?month=' + nextMonth;
	linkPrev.href = path+'?month=' + prevMonth;


	// 게시물 DOM 생성
	boardConDomSet(currentMonth);

	// 스케쥴 게시물 클릭
	boardConClickSet();


});

function boardConClickSet() {
	const boardCon = this.document.querySelectorAll('.board-con');
	for (let i = 0; i < boardCon.length; i++) {
		boardCon[i].querySelector('.top-con').addEventListener('click', function(){
			if (!this.parentNode.classList.contains('on')) {
				for (let j = 0; j < boardCon.length; j++) {
					boardCon[j].classList.remove('on');
				}
				this.parentNode.classList.add('on');
			} else {
				this.parentNode.classList.remove('on');
			}
		});
	}
}

function boardConDomSet(currentMonth) {
	const boardList = document.getElementById('boardList');
	let boardConDom = [];
	let inTitle = '';
	let boardType = '';
	let pathName = window.location.pathname;
	let menuName = '';
	const checkENG = pathName.indexOf('/en/') > -1;
	let categoryName = [];
	const moreBtnText = checkENG === false ? '더보기' : 'See more';

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
	
	if (menuName === 'performance') {
		if (checkENG === false) {
			inTitle = ['일시','장소', '관람료'];
		} else {
			inTitle = ['Time','Venue', 'Ticket Price'];
		}
		categoryName[0] = checkENG === false ? '대표공연' : 'Brand';
		categoryName[1] = checkENG === false ? '정기공연' : 'Regular';
		categoryName[2] = checkENG === false ? '기획공연' : 'Special';
		categoryName[3] = checkENG === false ? '상설공연' : 'Permanent';
		categoryName[4] = checkENG === false ? '명절공연' : 'Seasonal';
		categoryName[5] = checkENG === false ? '교류공연' : 'Exchange';
	} else if (menuName === 'education') {
		if (checkENG === false) {
			inTitle = ['대상','강사', '수강료'];
		} else {
			inTitle = ['Learner','Instructor', 'Fee'];
		}
		categoryName[0] = checkENG === false ? '교육전문가' : 'Educational expert';
		categoryName[1] = checkENG === false ? '일반인' : 'Ordinary person';
		categoryName[2] = checkENG === false ? '청소년' : 'Teenager';
		categoryName[3] = checkENG === false ? '외국인' : 'Foreigner';
	}

	for (let i = 0; i < schedule.length; i++) {
		if (schedule[i].category == categoryName[0]){
			boardType = 'type1';
		} else if (schedule[i].category == categoryName[1]){
			boardType = 'type2';
		} else if (schedule[i].category == categoryName[2]){
			boardType = 'type3';
		} else if (schedule[i].category == categoryName[3]){
			boardType = 'type4';
		} else if (schedule[i].category == categoryName[4]){
			boardType = 'type5';
		} else if (schedule[i].category == categoryName[5]){
			boardType = 'type6';
		}

		boardConDom[i] =
		`<li class="board-con ${boardType}">
			<div class="top-con">
				<div class="day-con">${schedule[i].day}</div>
				<div class="week-con">${schedule[i].week}</div>
				<div class="category-con">${schedule[i].category}</div>
				<div class="title-con">${schedule[i].title}</div>
			</div>
			<div class="bot-con">
				<img class="board-img" src="${schedule[i].imgSrc}" alt="">
				<div class="table-con">
					<dl>
						<dt>${inTitle[0]}</dt>
						<dd>${schedule[i].inTit1}</dd>
					</dl>
					<dl>
						<dt>${inTitle[1]}</dt>
						<dd>${schedule[i].inTit2}</dd>
					</dl>
					<dl>
						<dt>${inTitle[2]}</dt>
						<dd>${schedule[i].inTit3}</dd>
					</dl>
					<a class="link-more" href="${schedule[i].link}?month=${currentMonth}&dayPage">${moreBtnText}</a>
				</div>
			</div>
		</li>`;
		boardList.innerHTML += boardConDom[i];
	}
}
