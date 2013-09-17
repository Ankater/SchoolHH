var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var monthsName = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
var monthsNameSearch = ["Января","Февраля","Марта","Апреля","Мая","Июня","Июля","Августа","Сентября","Октября","Ноября","Декабря"];
var weekDayName = ["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресеье"];
var weekDayNum = 0;
var choosenMonth;
var choosenYear;
var choosenMonthFirstDay;
var choosenMonthLastDay;

window.onload = function(){
	lineOfTable = 0;
	numOfLines = 4; //линий в таблице минимум 4

	$(".calendarBlock").append("<table class='calendar'></table>");
		
	date = new Date();	
	todayDay = date.getDate(); //сегодняшнее число
	todayMonth = date.getMonth();//сегодняшний месяц (1-январь и т.д.)
	todayYear = date.getFullYear();//сегодняшний год
	todayDayOfWeek = date.getDay();//сегодняшний день недели

	choosenMonth = todayMonth;
	choosenYear = todayYear;

	if (todayYear%4==0){//Если год високосный то дней в феврале 1-29
		monthDays[1]=29;
	}
	

	transition()
	


	$("#leftMonth").click(function(){
		choosenMonth--;
		transition();
	})

	$("#rightMonth").click(function(){
		choosenMonth++;
		transition();
	})

	$("#addCont").click(function(){
		$(".addButtonPopup").remove();
		$(".tableAddEvent").remove();
		$("#head").append("<div class='addButtonPopup'></div>");
		$(".addButtonPopup").append("<div class='addButtonPopupTriangle'></div>")
		$(".addButtonPopup").append("<div class='closeButtonPopup'></div>");
		$(".addButtonPopup").append("<form id='addButtonPopupForm'></form>");
		$("#addButtonPopupForm").append("<textarea id='addButtonPopupFormInput' placeholder='5 марта, 14.00, День рождения'></textarea>");
		$(".addButtonPopup").append("<p class='addButtonPopupCreate'>Создать</p>");
	})
	$("#refreshCont").click(function(){
		 transition();
	})

	$("#head").on('click', '.closeButtonPopup', function(){
		$(".addButtonPopup").remove();
	})

	$(".calendar").on('click',"td",function(){
		addedDay=$(this).children('p').children('span').eq(0).text();
		if(isNaN(addedDay)){addedDay=$(this).children('p').children('span').eq(1).text()}
		console.log(addedDay)
		$(".addButtonPopup").remove();
		$(".tableAddEvent").remove();
		$(".chooseDay").removeClass();
		$(this).addClass("chooseDay");
		$(".calendarBlock").append("<div class='tableAddEvent'></div>");
		$(".tableAddEvent").css({"top":$(this).offset().top-30,"left":$(this).offset().left+165});
		$(".tableAddEvent").append("<div class='tableAddEventClose'></div>");
		$(".tableAddEvent").append("<div class='tableAddEventTriangle'></div>");
		$(".tableAddEvent").append("<form id='tableAddEventForm'></form>");
		$("#tableAddEventForm").append("<input type='search' id='tableAddEventFormEvent' placeholder='Событие'>");
		$("#tableAddEventForm").append("<input type='search' id='tableAddEventFormDate' placeholder='День/месяц/год'>");
		$("#tableAddEventForm").append("<input type='search' id='tableAddEventFormMember' placeholder='Имена участников'>");
		$("#tableAddEventForm").append("<textarea  id='tableAddEventFormDescription' placeholder='Описание'></textarea>");
		$(".tableAddEvent").append("<p class='tableAddEventReady'>Готово</p>");
		$(".tableAddEvent").append("<p class='tableAddEventDelete'>Удалить</p>");
	})
	
	$(".body").on('click', '.tableAddEventClose', function(){
		$(".tableAddEvent").remove();
	});

	$(".body").on('click','.tableAddEventReady', function(){
		addEvent=$("#tableAddEventFormEvent").val();
		addDate=$("#tableAddEventFormDate").val();
		var myDate = new Date(addDate)
		if ('Invalid Date' == myDate) {
		    alert("Это не дата: " + addDate + " Пожалуйста проверьте, правильность написания и формат даты");
		}else{
			addMember=$("#tableAddEventFormMember").val();
			addedDiscription=$("#tableAddEventFormDescription").val();
			if((addEvent=="")||(addDate=="")||(addMember=="")||(addedDiscription=="")){
				alert("Вы не заполнили одно из полей. Пожалуйста заполните его.")
			}else{
				localStorage.setItem("d"+addedDay+"m"+choosenMonth+"y"+choosenYear, addEvent+'_'+addDate+'_'+addMember+'_'+addedDiscription);
				alert("Событие добавлено");
			}
		}
	})
	$(".body").on('click','.tableAddEventDelete', function(){
		localStorage.removeItem("d"+addedDay+"m"+choosenMonth+"y"+choosenYear);
		alert("Событие удалено");
	})

	$(".today").click(function(){
		choosenMonth = todayMonth;
		choosenYear = todayYear;
		transition()
	})
	
	$("body").on('click', ".addButtonPopupCreate", function(){
		statusSort=false;
		addedString = $("#addButtonPopupFormInput").val();
		addedDay = parseInt(addedString.substr(0,2));
		if(addedDay<0){
			alert("День не может быть отрицательным");
		}else{
			if(isNaN(addedString[2])){
				addedString = addedString.substr(2);
			}else{
				addedString = addedString.substr(3);
			}
			addedMonth=addedString.substr(0,addedString.indexOf(","));
			var searchExpr = new RegExp(addedMonth, 'ig');
			console.log(3);
			for (i=0; i < monthsNameSearch.length; i++){
				if(searchExpr.test(monthsNameSearch[i])){
					statusSort=true;
					addedMonth=i;
				}
			}
			if(statusSort==false){
				alert("Ошибка! Вы неправильно указали месяц!");
				console.log(123)
			}else{
				addedString=addedString.substr(addedString.indexOf(" ")+1);
				if((addedString.indexOf(",")<5)&&(isNaN(addedString[0]))){
				   	alert("Ошибка! Вы неправильно ввели время");
				} else{
				   	addedTime=addedString.substr(0, addedString.indexOf(","));
				   	addedDiscription=addedString.substr(addedString.indexOf(",")+1);
				}
				localStorage.setItem("d"+addedDay+"m"+addedMonth+"y"+choosenYear, addedDiscription);
			}
		}
	});
	


	function transition(){
		$(".addButtonPopup").remove();
		$(".tableAddEvent").remove();
		$(".calendar").empty();

		lineOfTable=0;
		weekDayNum=0;
		dayOfchoosenMonth=1;
		day=1;

		if((choosenMonth>11)||(choosenMonth<0)){
			choosenMonth=0;
			choosenYear++;
			if (choosenYear%4==0){//Если год високосный то дней в феврале 1-29
				monthDays[1]=29;
			}else{
				monthDays[1]=28;
			}
		}
		
		$("#currentMonth").text(monthsName[choosenMonth] + " " + choosenYear);
		
		choosenMonthFirstDay = new Date(choosenYear, choosenMonth, 1).getDay();
		if(choosenMonthFirstDay == 0){
			choosenMonthFirstDay = 7;
		}

		choosenMonthLastDay = new Date(choosenYear, choosenMonth, monthDays[choosenMonth]).getDay();
		if(choosenMonthLastDay == 0){
			choosenMonthLastDay = 7;
		}
		

		if(choosenMonthFirstDay!=1){
			$(".calendar").append("<tr></tr>");

			if(choosenMonth==0){
				for(i=31-(choosenMonthFirstDay-2);i<=31;i++){
					$("tr").eq(lineOfTable).append("<td><p><span>" + weekDayName[weekDayNum] + "</span>, <span>" + i + "</span><p></td>");
					weekDayNum++;
				}
			}else{
				for(i=monthDays[choosenMonth-1]-(choosenMonthFirstDay-2);i<=monthDays[choosenMonth-1];i++){
					$("tr").eq(lineOfTable).append("<td><p><span>" + weekDayName[weekDayNum] + "</span>, <span>" + i + "</span></p></td>");
					weekDayNum++;
				}
			}
			day = choosenMonthFirstDay;
		}

		if(choosenMonthFirstDay==1){
			$(".calendar").append("<tr></tr>");
		}

		while(dayOfchoosenMonth!=monthDays[choosenMonth]+1){
			if(lineOfTable==0){
				if((dayOfchoosenMonth==todayDay)&&(choosenMonth==todayMonth)&&(choosenYear==todayYear)){
					$("tr").eq(lineOfTable).append("<td id='currentDay'><p><span>" + weekDayName[weekDayNum] + "</span>, <span>" + dayOfchoosenMonth + "</span></p></td>");
					weekDayNum++;
				}else{
					$("tr").eq(lineOfTable).append("<td><p><span>" + weekDayName[weekDayNum] + "</span>, <span>" + dayOfchoosenMonth + "</span></p></td>");
					weekDayNum++;
				}
			}else{
				if((dayOfchoosenMonth==todayDay)&&(choosenMonth==todayMonth)&&(choosenYear==todayYear)){
					$("tr").eq(lineOfTable).append("<td id='currentDay'><p><span>" + dayOfchoosenMonth + "</span></p></td>");
					weekDayNum++;
				}else{
					$("tr").eq(lineOfTable).append("<td><p><span>" + dayOfchoosenMonth + "</span></p></td>");
					weekDayNum++;
				}
			} 

			day++;
			dayOfchoosenMonth++;
			
			if(day==8){
				day=1;
				lineOfTable++;
				$(".calendar").append("<tr></tr>");
			}
			
		}

		if(choosenMonthLastDay!=7){
			dayOfNextMonth=1;
			for(i=choosenMonthLastDay+1;i<=7;i++){
				$("tr").eq(lineOfTable).append("<td><p><span>" + dayOfNextMonth + "</span><p></td>");
				dayOfNextMonth++;
			}
		}
	}
}
