//Static index webpage functions

//Show all skill categoy
var skillCatContainers = document.getElementsByClassName("category-container");
var seeAllCatBtn = document.querySelector(".see-sll-skill-cat-container");

//Pressed see all category button in index.ejs
function seeAllCatPressed(){
	for(var i = 4; i < skillCatContainers.length; i++){
		if(skillCatContainers[i].classList.contains("d-none")){
			skillCatContainers[i].classList.remove("d-none");
			console.log("remove d-none");
		}
		else{
			skillCatContainers[i].classList.add("d-none");
			console.log("add d-none");
		}
	}
}

//Check to see if see all category button exzists then adds listener
if(seeAllCatBtn){
	seeAllCatBtn.addEventListener("click", seeAllCatPressed);
}

//-- Pop up authentication form start --

//Grab form elements
var loginBtn = document.getElementsByClassName("auth-choice-container")[0];
var signUpBtn =  document.getElementsByClassName("auth-choice-container")[1];
var exitBtn = document.getElementsByClassName("exit-icon")[0];
var registerForm = document.getElementsByClassName("register-form")[0];
var loginForm = document.getElementsByClassName("login-form")[0];
var authenticationTab = document.getElementsByClassName("forground-form-container")[0];
var loginNavBtn = document.getElementsByClassName("nav-login")[0];
var signUpNavBtn = document.getElementsByClassName("nav-register")[0];

//Be warned. The naming scheme here is a mess
function signUpPressed(){
	if(signupOrLoginActive() === "login"){//if login is active
		var makeVisable = "register";
		toggleStyle(makeVisable);
		toggleForm(makeVisable);
	}
}
function loginPressed(){
	if(signupOrLoginActive() === "signup"){//if signup is active
		var makeVisable = "login";
		toggleStyle(makeVisable);
		toggleForm(makeVisable);
	}
}
function exitPressed(){
	authenticationTab.classList.add("d-none");
}
function signUpNavPressed(){
	authenticationTab.classList.remove("d-none");
	signUpPressed();
}
function loginNavPressed(){
	authenticationTab.classList.remove("d-none");
	loginPressed();
}
function signupOrLoginActive(){
	console.log(signUpBtn.classList.contains("pressed-btn"));
	if(signUpBtn.classList.contains("pressed-btn")){
		return "signup"
	}
	else{
		return "login"
	}
}
function toggleStyle(makeFocus){
	if(makeFocus === "login"){
		signUpBtn.classList.remove("make-border-left");
		signUpBtn.classList.remove("make-border-right");
		loginBtn.classList.add("make-border-right");
		loginBtn.classList.remove("make-border-down");
		signUpBtn.classList.add("make-border-down");
	}
	else{
		signUpBtn.classList.add("make-border-left");
		signUpBtn.classList.add("make-border-right");
		loginBtn.classList.remove("make-border-right");
		loginBtn.classList.add("make-border-down");
		signUpBtn.classList.remove("make-border-down");
	}
}
function toggleForm(makeVisable){
	if(makeVisable == "login"){
		signUpBtn.classList.remove("pressed-btn");
		registerForm.classList.add("d-none");
		loginForm.classList.remove("d-none");
	}
	else{
		signUpBtn.classList.add("pressed-btn");
		loginForm.classList.add("d-none");
		registerForm.classList.remove("d-none");
	}
}

signUpBtn.addEventListener("click", signUpPressed);
loginBtn.addEventListener("click", loginPressed);
exitBtn.addEventListener("click", exitPressed);
if(loginNavBtn && signUpNavBtn){
	loginNavBtn.addEventListener("click", loginNavPressed);
	signUpNavBtn.addEventListener("click", signUpNavPressed);
}

//-- Pop up authentication form end --

//Nav scroll to 
var navSkill = document.getElementById("nav-skills");
var navResume = document.getElementById("nav-resume");
var navProject = document.getElementById("nav-projects");
var sections = document.getElementsByClassName("section-container");

//Detect Safari 
let safariAgent = navigator.userAgent.indexOf("Safari") > -1; 
//Detect Chrome 
let chromeAgent = navigator.userAgent.indexOf("Mozilla") > -1

navSkill.addEventListener("click", () => {
	
	if(!safariAgent || (chromeAgent && safariAgent)){
		window.scrollBy({
			top: (sections[0].offsetTop - 90),
			left: 0,
			behavior: 'smooth'
		});
	}
	else{
		window.scrollBy(0, (sections[0].offsetTop - 90));
	}	
});

navProject.addEventListener("click", () => {
	console.log(navigator.userAgent);
	
	if(!safariAgent || (chromeAgent && safariAgent)){
		window.scrollBy({
			top: (sections[1].offsetTop - 90),
			left: 0,
			behavior: 'smooth'
		});
	}
	else{
		window.scrollBy(0, (sections[1].offsetTop - 90));
	}	
});

//Skill see all button functionality
var su = document.querySelectorAll(".skill-ul");
su.forEach((suel, i) => {
	var sl = document.querySelectorAll(".sl-" + (i + 1));
	var btn = document.querySelector(".sas-0" + (i + 1));
	if(!btn){
		return;
	}
	btn.addEventListener("click", () => {
		if (!btn.classList.contains("pressed-button")){
			btn.classList.add("pressed-button");
			btn.innerHTML = "See less";
			sl.forEach((el, i) => {
				if(i > 3)
				el.classList.remove("d-none");
			});
		}
		else{
			btn.classList.remove("pressed-button");
			btn.innerHTML = "See all"
			sl.forEach((el, i) => {
				if(i > 3)
				el.classList.add("d-none");
			});
		}
	});
	
});

//Project see all button functionality
var projects = document.querySelectorAll(".project-col-container");
var proBtn = document.querySelector(".see-all-projects");
if(proBtn){
   proBtn.addEventListener("click", () => {
		if(proBtn.classList.contains("pressed-button")){
			for(var i = 3; i < projects.length; i++){
				proBtn.classList.remove("pressed-button");
				proBtn.innerHTML = "See all";
				projects[i].classList.add("d-none");
			}
		}
		else{
			for(var i = 3; i < projects.length; i++){
				proBtn.classList.add("pressed-button");
				proBtn.innerHTML = "See less";
				projects[i].classList.remove("d-none");
			}
		}
	});
}

//Index search button functionality
class indexSearch{
	constructor(id){
		this.id = id;
		this.container = document.querySelector(`#${id}`);
		this.buttonFunctionality = 'show search';
	}
	
	pressedSeeSearchInput = (event) => {
		let inputEle = event.target.querySelector('.search-form-input');
		let descriptionEle = event.target.querySelector('.search-description');
		let titleEle = event.target.querySelector('.section-title');
		hideEle(titleEle);
		hideEle(descriptionEle);
		showEle(inputEle);
	}

	makeSearch = (e) => {
		e.preventDefault();
		let priority = e.target.getAttribute('id').split('-')[0];
		let search = e.target.querySelector(`.search-input-ele`).value;
		let action = `/search?search=${search}&priority=${priority}`;
		e.target.setAttribute('action', action);
		e.target.submit();
	}
}

searchContainers = [];

function createOrFindSearchFucntions(id){
	let nothingFound = true;
	let desiredSearch;
	searchContainers.forEach((search, i) => {
		if(search.id === id){
			nothingFound = false;
			desiredSearch = search;
		}
	});
	if(nothingFound){
		desiredSearch = new indexSearch(id);
		searchContainers.push(desiredSearch);
	}

	return desiredSearch;
}
onSearchPressed = (e) => {
	e.preventDefault();
	let id = e.target.getAttribute('id');
	let indexSearch = createOrFindSearchFucntions(id);
	if(indexSearch.buttonFunctionality === 'show search'){
		indexSearch.pressedSeeSearchInput(e);
		indexSearch.buttonFunctionality = 'make search';
		console.log(indexSearch.container);
	}
	else if(indexSearch.buttonFunctionality === 'make search'){
		indexSearch.makeSearch(e);
	}
}