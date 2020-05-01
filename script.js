var isMobileBool;
var mobileScreen = 500;
var currentPanelNo;
var panelNo = 0;
var screenWidth = window.innerWidth;
var timeDelay = 500;
var panelCurrent;


const panel1 = $('#synopsisACT');
const panel2 = $('#synopsisRMC');
const panel3 = $('#synopsisANM');
const panel4 = $('#synopsisAHF');
const allPanels = $('.hiddenClass');

var nums = [, , , , 5, 6, 7, 8, 9, 10]
var populate = function (arr, id) {

    for (item in arr) {
        var attr1 = document.createAttribute("value");
        attr1.value = arr[item];
        // var attr = document.createAttribute("onclick");
        // attr.value = clickChecker(id);
        var node = document.createElement("OPTION");
        var textnode = document.createTextNode(arr[item]);
        // node.setAttributeNode(attr);
        node.setAttributeNode(attr1);
        node.appendChild(textnode);
        document.getElementById(id).appendChild(node)
    }
}

var loader = function () {
    populate(nums, "seats-STA")
    populate(nums, "seats-STP")
    populate(nums, "seats-STC")
    populate(nums, "seats-FCA")
    populate(nums, "seats-FCP")
    populate(nums, "seats-FCC")
    expiry()
}


function selectedBooking(movie_id, day, hour){
    document.getElementById('hidden1').value = day;
	document.getElementById('hidden2').value = hour;
	document.getElementById('hidden3').value = movie_id;
	document.getElementById("seats-STA").dataset.price = 0;
	document.getElementById("seats-STP").dataset.price = 0;
	document.getElementById("seats-STC").dataset.price = 0;
	document.getElementById("seats-FCA").dataset.price = 0;
	document.getElementById("seats-FCP").dataset.price = 0;
	document.getElementById("seats-FCC").dataset.price = 0;
	
	document.getElementById("seats-STA").selectedIndex = 0;
	document.getElementById("seats-STP").selectedIndex = 0;
	document.getElementById("seats-STC").selectedIndex = 0;
	document.getElementById("seats-FCA").selectedIndex = 0;
	document.getElementById("seats-FCP").selectedIndex = 0;
	document.getElementById("seats-FCC").selectedIndex = 0;
	
	document.getElementById("demo").value = 0;

}

var pricing = {
    discounted: {
        standard: {
            adult: 14,
            concession: 12.5,
            child: 11,
        },
        firstClass: {
            adult: 24,
            concession: 22.5,
            child: 21,
        }
    },
    normal: {
        standard: {
            adult: 19.8,
            concession: 17.5,
            child: 15.3,
        },
        firstClass: {
            adult: 30,
            concession: 27,
            child: 24,
        }
    }
}

function dataChecker(id,data){
    if(id == 'seats-STA'){
        dayChecker('standard', 'adult', data, id)
    }
    if(id == 'seats-STP'){
        dayChecker('standard', 'concession', data, id)
    }
    if(id == 'seats-STC'){
        dayChecker('standard', 'child', data, id)
    }
    if(id == 'seats-FCA'){
        dayChecker('firstClass', 'adult', data, id)
    }
    if(id == 'seats-FCP'){
        dayChecker('firstClass', 'concession', data, id)
    }
    if(id == 'seats-FCC'){
        dayChecker('firstClass', 'child', data, id)
    }       
}

var dayChecker = function (d1,d2,data,id){
    var mDay = document.getElementById('hidden1').value;
    var hDay = document.getElementById('hidden2').value;

    if(mDay == 'SAT' || mDay == 'SUN'){
        if(hDay == 'T12'){
            var price = pricing.discounted[d1][d2] * data;
        }
        else{
            var price = pricing.normal[d1][d2] * data;
        }
    }
    else if(mDay == 'MON' || mDay == 'WED'){
        var price = pricing.discounted[d1][d2] * data;
    }
    else {
        var price = pricing.normal[d1][d2] * data;
    }
    document.getElementById(id).dataset.price = price;
    console.log(price.toFixed(2));
    round();
}

function round(){
    var total_price = parseFloat(document.getElementById("seats-STA").dataset.price) +  parseFloat(document.getElementById("seats-STP").dataset.price) + parseFloat(document.getElementById("seats-STC").dataset.price) + parseFloat(document.getElementById("seats-FCA").dataset.price) + parseFloat(document.getElementById("seats-FCP").dataset.price) + parseFloat(document.getElementById("seats-FCC").dataset.price);
    console.log(total_price);
	var twoPlaces = total_price.toFixed(2);

    document.querySelector('#demo').value = twoPlaces;
}



window.onscroll = function() 
{
    var articles = document.getElementsByTagName('main')[0].getElementsByTagName('article');
    var navlinks = document.getElementsByTagName('nav')[0].getElementsByTagName('a');
    var n = -1;
    while (n < articles.length - 1 && articles[n + 1].offsetTop <= window.scrollY) {
        n++;
    }
    for (var a = 0; a < navlinks.length; a++) {
        navlinks[a].classList.remove('active');
    }
    if (n >= 0) {
        navlinks[n].classList.add('active');
    }
}


function totalAmount(id){
    var e = document.getElementById(id);
    var strUser = e.options[e.selectedIndex].text;
    // document.getElementById('total').value = "20";
    // console.log(strUser);
    dataChecker(id, strUser);
}


var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) 
{
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) 
{ 
    showSlides(slideIndex = n);
}

//for the slide-shows
function showSlides(n) 
{
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('PAGE LOADED');
    // $("html,body").animate({scrollTop: 0}, 'slow');
});

//determines whether or not the user is mobile-based
function isMobile() 
{
    if (screenWidth < mobileScreen) {
        isMobileBool = true;
    } else {
        isMobileBool = false;
    }
    console.log(isMobileBool.toString());
}

$(function() 
{
    $('#synopsis-area').hide();
});

$('#moviePanelACT').on('click', function() {
    console.log(panelNo);

    if (panelNo !== 1 && panelNo !== 0) {
        panelHide();
        setTimeout(panelShow(1), 2000);
    } else {
        panelShow(1);
    }
});

$('#moviePanelRMC').on('click', function() {
    console.log(panelNo);

    if (panelNo !== 2 && panelNo !== 0) {
        panelHide();
        setTimeout(panelShow(2), timeDelay);

    } else {
        panelShow(2);
    }
});

$('#moviePanelANM').on('click', function() {
    console.log(panelNo);

    if (panelNo !== 3 && panelNo !== 0) {
        panelHide();
        setTimeout(panelShow(3), timeDelay);
    } else {
        panelShow(3);
    }
});

$('#moviePanelAHF').on('click', function() {
    console.log(panelNo);

    if (panelNo !== 4 && panelNo !== 0) {
        panelHide();
        setTimeout(panelShow(4), timeDelay);

    } else {
        panelShow(4);
    }
});

$('.hideBtn').on('click', function() {
    panelHide();
});

function panelShow(currentPanelNo) {
    panelNo = currentPanelNo;
    console.log(panelNo);

    if (panelNo === 1) {
        panelCurrent = panel1;
        allPanels.hide();
    } else if (panelNo === 2) {
        panelCurrent = panel2;
        allPanels.hide();
    } else if (panelNo === 3) {
        panelCurrent = panel3;
        allPanels.hide();
    } else if (panelNo === 4) {
        allPanels.hide();
        panelCurrent = panel4;
    }

    $('#synopsis-area').slideDown(500);
    setTimeout(function() 
    {
        panelCurrent.show();

    }, 400);
}

function panelHide() 
{
    $('#synopsis-area').slideUp(500);

    panelNo = 0;
}

//Change the chosen movie in the booking form
// function showAvengers()
// {
//     var selectedMovie = 'Avengers';
//     document
//     var movieID = "ACT";
//     formMovieName = 'ACT';
//     document.getElementById("selected-movie").innerHTML = selectedMovie;   
// }

// //Change the chosen movie in the booking form
// function showTopEndWedding()
// {
//     var selectedMovie = 'Top End Wedding';
//     formMovieName = 'RMC';
//     document.getElementById("selected-movie").innerHTML = selectedMovie;
// }

// //Change the chosen movie in the booking form
// function showDumbo()
// {
//     var selectedMovie = 'Dumbo';
//     formMovieName = 'ANM';
//     document.getElementById("selected-movie").innerHTML = selectedMovie;
// }

// //Change the chosen movie in the booking form
// function showTheHappyPrince()
// {
//     var selectedMovie = 'The Happy Prince';
//     formMovieName = 'AHF';
//     document.getElementById("selected-movie").innerHTML = selectedMovie;
// }

var selectedMovieDay = '';
var selectedMovieTime = '';
//show the information for the booking chosen
// function selectedBooking(dateTime,movie,discount,movieDay,movieTime)
// {
//     //could eliminate the discount from the parameter
//     //if(movieDay == "MON" || movieDay == "WED" || movieTime = "T12") ? discounted = true : discounted = false;

//     discount ? discounted = true : discounted = false;
//     document.getElementById("warning-cost").style.visibility = "hidden";
//     formMovieDay = movieDay;
//     formMovieTime = movieTime;
//     document.getElementById("selected-movie").innerHTML = movie+" "+dateTime;
//     selectedMovieDay = formMovieDay;
//     selectedMovieTime = formMovieTime;
// }

//Check the input values for the form
function checkCard() 
{
    var visaRegEx = /[0-9]{4} {0,1}[ ] {0,1}[0-9]{4} {0,1}[ ] {0,1}[0-9]{4} {0,1}[ ] {0,1}[0-9]{4}/;
    var card = document.getElementById("card").value;
    var image = document.getElementById('visa');
    if (visaRegEx.test(card) && card.length <= 19 && card.toString()[0] == 4) 
    {
        image.style.visibility = 'visible';
    } 
    else 
    {
        image.style.visibility = 'hidden';
    }
}

    function checkForm(){
        var name = document.getElementById('name').value;
        var mobileNumber = document.getElementById('mobile').value;
        var mobileRegex = /^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){7,9}$/;
        var emailAddress = document.getElementById('email').value;
        var cardNumber = document.getElementById('card').value;
        var expiryMonth = document.getElementById('mm').value;
        var expiryYear = document.getElementById('yy').value;
        var count= 0;
        var date = new Date();
        var currentMonth = date.getMonth()+1;
        var currentYear = date.getFullYear();

        console.log(selectedMovieDay);
        console.log("Date" + selectedMovieTime);
        
        document.getElementById('selected-movie-day').value = selectedMovieDay;
        document.getElementById('selected-movie-time').value = selectedMovieTime;
        
        if(name==""){
            var error1 = document.getElementById('error1');
            error1.innerHTML = "Name Cannot Be Blank";
            error1.style.color = "red";
            count++;
        }
         if(!mobileRegex.test(mobileNumber)){
            var error2 = document.getElementById('error2');
            error2.innerHTML = "Invalid Number";
            error2.style.color = "red";
            count++;
        }
        if(emailAddress==""){
            var error3 = document.getElementById('error3');
            error3.innerHTML = "Invalid Email Address";
            error3.style.color = "red";
            count++;
        }

        if(cardNumber == ""){
            var error4 = document.getElementById('error4');
            error4.innerHTML = "Invalid Card Number";
            error4.style.color = "red";
            count++;
        }

        if(expiryMonth<currentMonth+1){
            var error5 = document.getElementById('error5');
            error5.innerHTML = "Month cannot be less than current month";
            error5.style.color = "red"
            count++;
        }
    
        if(count>0){
            return false;
        }
        else{
            clearError();
            return true;
        }
        
        
    }

    function clearError(){
        var error1 = document.getElementById('error1');
        var error2 = document.getElementById('error2');
        var error3 = document.getElementById('error3');
        var error4 = document.getElementById('error4');
        var error5 = document.getElementById('error5');
        
        error1.innerHTML = "";
        error1.style.removeProperty('color');

        error2.innerHTML = "";
        error2.style.removeProperty('color');

        error3.innerHTML = "";
        error3.style.removeProperty('color');

        error4.innerHTML = "";
        error4.style.removeProperty('color');

        error5.innerHTML = "";
        error5.style.removeProperty('color');
    }


    


$(document).ready(function() { 


    $('input[name=cust[name]]').change(function(){
         $('form').submit();
    });
    $('input[name=cust[email]]').change(function(){
        $('form').submit();
   });
   $('input[name=cust[mobile]]').change(function(){
    $('form').submit();
    });
    $('input[name=cust[card]]').change(function(){
        $('form').submit();
    });
    $('input[name=cust[expiry]]').change(function(){
        $('form').submit();
    });

    $('select[name=seats[STA]]').change(function(){
        $('form').submit();
    });
    $('input[name=movie[id]').change(function(){
        $('form').submit();
    });
 
   });
 
 