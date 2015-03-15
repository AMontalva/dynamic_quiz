// OOP version of script.js

function Quiz(name, quizArray, total, current, radioArray) {
	this.name = name;
	this.quizArray = quizArray;
	this.total = total;
	this.current = current;
	this.radioArray = radioArray;
}

Quiz.prototype.makeHeading = function() {
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
}


Quiz.prototype.makeQuizQuestion = function() {
	var quizQuestion = document.createElement("h2");
	quizQuestion.setAttribute("id", "quizQuestion");
	var questionText = document.createTextNode(this.quizArray[0].question);
	quizQuestion.appendChild(questionText);
	document.getElementById("quizContainer").appendChild(quizQuestion);
};


Quiz.prototype.makeRadioButtons = function() {
	var form = document.createElement("form");
	// document.getElementById("quizContainer").appendChild(form);
	document.getElementById("quizContainer").insertBefore(form, quizContainer.childNodes[2]);
	form.setAttribute("id", "form");
	form.setAttribute("method","post");				
	for(i = 0; i < this.quizArray[this.current].choices.length; i++) {
		// radio buttons
		this.radioArray[i] = document.createElement("input")
		this.radioArray[i].setAttribute("id", "radioId");
		this.radioArray[i].setAttribute("type", "radio");
		this.radioArray[i].setAttribute("name", "name");
		this.radioArray[i].setAttribute("value", this.quizArray[this.current].choices[i]);
		// document.getElementById("form").appendChild(radioArray[i]);
		document.getElementById("form").appendChild(this.radioArray[i]);
		// radio button text answers
		var radioButtonText = document.createTextNode(this.quizArray[this.current].choices[i]);
		this.radioArray[i].appendChild(radioButtonText);
		// document.getElementById("form").appendChild(radioButtonText);
		document.getElementById("form").appendChild(radioButtonText);
		// new line
		var br = document.createElement("br");
		// document.getElementById("form").appendChild(br);				
		document.getElementById("form").appendChild(br);
	};
};


Quiz.prototype.sumTotal = function() {
	for(j=0; j<this.radioArray.length; j++) {
		if(this.radioArray[j].checked) {
			if(this.radioArray[j].value === this.quizArray[this.current].correctAnswer) {
				console.log(this.radioArray[j].value);
				this.total++;
				console.log("got here");
			}
			else {
				console.log("Wrong");
			}
		}
	}; 
};

Quiz.prototype.makeSubmitButton = function() {
	// submit button
	var submitButton = document.createElement("input");
	submitButton.setAttribute("type", "submit");
	submitButton.setAttribute("value", "Next Question");
	submitButton.setAttribute("id", "submitButton");
	document.getElementById("quizContainer").appendChild(submitButton);
	// add click event to submit button
	console.log(this.quizArray);
	this.submitEventListener();
};

// click submit button event
Quiz.prototype.submitEventListener = function() {
	var submit = document.getElementById("submitButton");
	submit.addEventListener("click", function() {
		if(this.current < this.quizArray.length - 1) {
			this.sumTotal();
			var str = document.getElementById("quizQuestion").innerHTML;
			str = this.quizArray[++this.current].question;
			document.getElementById("quizQuestion").innerHTML = str;
			this.removeQuizQuestion();
			this.makeRadioButtons();
		}
		else {
			this.sumTotal();
			this.finishedQuiz();
		}
	}.bind(this), false);
};


Quiz.prototype.removeQuizQuestion = function() {
	if(document.getElementById("form")) {
		var delQuestion = document.getElementById("form");
		delQuestion.parentNode.removeChild(delQuestion);			
	}
	else {
		console.log("form is null");
		finishedQuiz();
	}
};


Quiz.prototype.finishedQuiz = function() {
	quizContainer.parentNode.removeChild(quizContainer);
	var newQuizContainer = document.createElement("div");
	newQuizContainer.setAttribute("id", "newQuizContainer");
	document.body.appendChild(newQuizContainer);
	var totalHeading = document.createElement("h1");
	totalHeading.setAttribute("id", "totalHeading")
	var totalText = document.createTextNode("Your total score is " + this.total);
	totalHeading.appendChild(totalText);
	document.getElementById("newQuizContainer").appendChild(totalHeading);
	this.retakeButton();
};


Quiz.prototype.retakeButton = function() {
	// submit button
	var retakeButton = document.createElement("input");
	retakeButton.setAttribute("type", "submit");
	retakeButton.setAttribute("value", "Take Quiz Again?");
	retakeButton.setAttribute("id", "retakeButton");
	document.getElementById("newQuizContainer").appendChild(retakeButton);
	this.retakeEventListener();
};

// click retake button event
Quiz.prototype.retakeEventListener = function() {
	var retake = document.getElementById("retakeButton");
	retake.addEventListener("click", function() {
		newQuizContainer.parentNode.removeChild(newQuizContainer);
		this.total = 0;
		this.current = 0;
		var quizContainer = document.createElement("div");
		quizContainer.setAttribute("id", "quizContainer");
		document.body.appendChild(quizContainer);
		this.makeQuiz();
	}.bind(this), false);
};

Quiz.prototype.makeQuiz = function() {
	this.makeHeading();
	this.makeQuizQuestion();
	this.makeRadioButtons();
	this.makeSubmitButton();
};


var quizQuestionArray = [ 
	{ question: "5 + 2?", choices: ["3", "7", "6", "8"], correctAnswer:"7" },
	{ question: "1 + 1?", choices: ["2", "3", "0", "9"], correctAnswer:"2" },
	{ question: "9 - 4?", choices: ["0", "13", "5", "6"], correctAnswer:"5" }
];


var emptyArray = []
quiz = new Quiz("Easy Math Quiz", quizQuestionArray, 0, 0, emptyArray);

quiz.makeQuiz();