// questions array
var quizArray = [ 
	{ question: "5 + 2?", choices: ["3", "7", "6", "8"], correctAnswer:"7" },
	{ question: "1 + 1?", choices: ["2", "3", "0", "9"], correctAnswer:"2" },
	{ question: "9 - 4?", choices: ["0", "13", "5", "6"], correctAnswer:"5" }
];
var total = 0;
var current = 0;
var radioArray = [];

function makeHeading() {
	//create the elements
	var quizHeading = document.createElement("h1");
	// add id to h1 tag so you can reference this later
	quizHeading.setAttribute("id", "quizHeading");
	// OR create child nodes manually
	var h1Text = document.createTextNode("Easy Math Quiz");
	// and add them as child nodes to the new elements
	quizHeading.appendChild(h1Text);
	// and we still need to attach them to the document!
	document.getElementById("quizContainer").appendChild(quizHeading);
};

function makeQuizQuestion() {
	var quizQuestion = document.createElement("h2");
	quizQuestion.setAttribute("id", "quizQuestion");
	var questionText = document.createTextNode(quizArray[0].question);
	quizQuestion.appendChild(questionText);
	document.getElementById("quizContainer").appendChild(quizQuestion);
};

function makeRadioButtons() {
	var form = document.createElement("form");
	// document.getElementById("quizContainer").appendChild(form);
	document.getElementById("quizContainer").insertBefore(form, quizContainer.childNodes[2]);
	form.setAttribute("id", "form");
	form.setAttribute("method","post");				
	for(i = 0; i < quizArray[current].choices.length; i++) {
		// radio buttons
		radioArray[i] = document.createElement("input")
		radioArray[i].setAttribute("id", "radioId");
		radioArray[i].setAttribute("type", "radio");
		radioArray[i].setAttribute("name", "name");
		radioArray[i].setAttribute("value", quizArray[current].choices[i]);
		// document.getElementById("form").appendChild(radioArray[i]);
		document.getElementById("form").appendChild(radioArray[i]);
		// radio button text answers
		var radioButtonText = document.createTextNode(quizArray[current].choices[i]);
		radioArray[i].appendChild(radioButtonText);
		// document.getElementById("form").appendChild(radioButtonText);
		document.getElementById("form").appendChild(radioButtonText);
		// new line
		var br = document.createElement("br");
		// document.getElementById("form").appendChild(br);				
		document.getElementById("form").appendChild(br);
	};
};

function sumTotal() {
	for(j=0; j<radioArray.length; j++) {
		if(radioArray[j].checked) {
			if(radioArray[j].value === quizArray[current].correctAnswer) {
				console.log(radioArray[j].value);
				total++;
				console.log("got here");
			}
			else {
				console.log("Wrong");
			}
		}
	}; 
};

function makeSubmitButton() {
	// submit button
	var submitButton = document.createElement("input");
	submitButton.setAttribute("type", "submit");
	submitButton.setAttribute("value", "Next Question");
	submitButton.setAttribute("id", "submitButton");
	document.getElementById("quizContainer").appendChild(submitButton);
	// add click event to submit button
	submitButton.addEventListener("click", function() {
		if(current < quizArray.length - 1) {
			sumTotal();
			var str = document.getElementById("quizQuestion").innerHTML;
			str = quizArray[++current].question;
			document.getElementById("quizQuestion").innerHTML = str;
			removeQuizQuestion();
			makeRadioButtons();
		}
		else {
			sumTotal();
			finishedQuiz();
		}
	})
};


function removeQuizQuestion() {
	if(document.getElementById("form")) {
		var delQuestion = document.getElementById("form");
		delQuestion.parentNode.removeChild(delQuestion);			
	}
	else {
		console.log("form is null");
		finishedQuiz();
	}
};


function finishedQuiz() {
	quizContainer.parentNode.removeChild(quizContainer);
	var newQuizContainer = document.createElement("div");
	newQuizContainer.setAttribute("id", "newQuizContainer");
	document.body.appendChild(newQuizContainer);
	var totalHeading = document.createElement("h1");
	totalHeading.setAttribute("id", "totalHeading")
	var totalText = document.createTextNode("Your total score is " + total);
	totalHeading.appendChild(totalText);
	document.getElementById("newQuizContainer").appendChild(totalHeading);
	retakeButton();
};

function retakeButton() {
	// submit button
	var retakeButton = document.createElement("input");
	retakeButton.setAttribute("type", "submit");
	retakeButton.setAttribute("value", "Take Quiz Again?");
	retakeButton.setAttribute("id", "retakeButton");
	document.getElementById("newQuizContainer").appendChild(retakeButton);
	// add click event to submit button
	retakeButton.addEventListener("click", function() {
		newQuizContainer.parentNode.removeChild(newQuizContainer);
		total = 0;
		current = 0;
		var quizContainer = document.createElement("div");
		quizContainer.setAttribute("id", "quizContainer");
		document.body.appendChild(quizContainer);
		makeQuiz();
	})
};


function makeQuiz() {
	makeHeading();
	makeQuizQuestion();
	makeRadioButtons();
	makeSubmitButton();
};

makeQuiz();