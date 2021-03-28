//Location to store helper functions needed around the app
var middle = {};
var express = require("express");
var app = express();
let Projects = require('../models/project');

middle.tempLog = (msg) => {
	console.log("-*Delete later*-");
	console.log(msg);
}

//create new project object
middle.assembleProject = (req) => {
	var body = req.body;
	console.log(body['skill-ele-0']);
	
	var visitableProject = "false";
	var visitableScorce = "false";
	if(body.visitableProject === "on"){
		visitableProject = "true";
	}
	if(body.visitableScorce === "on"){
		visitableScorce = "true";
	}
	
	
	var projectObj = {
		thumbnail: body.imgUrl,
		title: body.title,
		description: body.description,
		hasVisit: visitableProject,
		visit: body.visitUrl,
		hasGitHub: visitableScorce,
		github: body.githubUrl,
		skill: middle.createSkillArray(req)
	}
	
	console.log(projectObj);

	return projectObj;
}

middle.createSkillArray = req => {
	let body = req.body;
	let skills = [];
	let i = 0;

	while(req.body[("skill-ele-" + i)]){
		let skill = (body[("skill-ele-" + i)]).toString();
		if (skill === ''){
			continue;
		}
		skills.push(skill);

		i++;
	}

	return skills;
}

//create new skill catetegory object
middle.assembleSkillCat = (req) => {
	var body = req.body;
	var skillCat;
	var skills = middle.createSkillArray(req);
	var skillTitle = body["category-ele"];
	
	skillCat = {
		category: skillTitle,
		skill: skills
	}
	
	return skillCat;
}

//create new local user
middle.assembleLocalUser = (username, name, hash) => {
	var newUser = {
		username: username,
		name: name,
		id: null,
		password: hash,
		type: "local",
		email: null
	}
	
	return newUser;
}

//loop though users and find matching local username
middle.findIndexOfLocalUser = (users, username) => {
	var correctUserIndex = -1;
	
	//loop through and find index of user with correct username
	for(var i = 0; i < users.length; i++){
		if(users[i].type === "local" && users[i].username === username){
			correctUserIndex = i;
			break;
		}
	}
	
	return correctUserIndex;
}

//loop through users and find one with matching google id
middle.findIndexOfOAuthUser = function(users, profile){
	var returnVal = -1;
	users.forEach((user, i) => {
		if(user.id && user.id.toString() == profile.id.toString()){
			returnVal = i;
		}
	});
	return returnVal;
}

//Create new user object
middle.assembleOAuthUser = function(profile, type){
	var user = {
		username: profile.displayName,
		name: profile.displayName,
		id: profile.id,
		password: "null",
		type: type
	};
		
	return user
}

//Create new user object
middle.assembleGithubUser = function(profile, type){
	var user = {
		username: profile.username,
		name: profile.username,
		id: profile.id,
		password: "null",
		type: type
	};
		
	return user
}

middle.cleanSearch = search => {
	if(!search || search.length <= 2){
		if(!search){
			return search;
		}
		return search.toLowerCase();
	}
	let retSearch = search.toLowerCase();
	let lastTwoIndexes = retSearch.slice((retSearch.length - 2));
	if(lastTwoIndexes === 'js' || lastTwoIndexes === 'db'){
		retSearch = retSearch.slice(0, (retSearch.length - 2));
	}
	return retSearch;
}
middle.getProjectsThatMatchSearch = searchRaw => {
	let search = middle.cleanSearch(searchRaw);
	return new Promise((resolve, reject) => {
		Projects.find({}, (err, projects) => {
			if(err){
				reject({msg: 'Error in middle utils getProjects of search project.find because ' + err.message});
			}
			if(projects.length <= 0){
				reject({message: 'No projects saved in databace'});
			}
			let matchedProjects = [];
			projects.forEach(project => {
				let projectObj = project.toObject();
				for(let i = 0; i < project.skill.length; i++){
					let skill = middle.cleanSearch(project.skill[i]);
					//console.log(`Comparing ${search} to ${skill}`);
					if(search === skill){
						matchedProjects.push(projectObj);
						break;
					}
				}
			});
			resolve(matchedProjects);
		});
	});
}

module.exports = middle;