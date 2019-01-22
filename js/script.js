//global variables & constants selecting/creating important components
const $form = $('form');
const $nameField = $('input[id="name"]');
const $email = $('input[id="mail"]');
const $jobRoleSelect = $('select[id="title"]');
const $jobRoleOther = $('input[id="other-title"]');
const $shirtDesign = $('select[id="design"]');
const $shirtColorDiv = $('div[id="colors-js-puns"]');
const $colorOptions = $shirtColorDiv.children().eq(1);
const $colors = $colorOptions.children();
const $numOfColors = $colors.length;
const $activitiesDiv = $('.activities');
const $activities = $('.activities input:checkbox');
const $paymentInfo = $('#payment');
const $paymentOptions = $paymentInfo.children();
const $creditInfo = $('#credit-card');
const $payPal = $creditInfo.next();
const $bitcoin = $payPal.next();
const $registerButton = $('button');
//constants for color functions
const firstIndexPuns = 0;
const firstIndexHeart = 3;

//eventListener for email field for real-time error message
$email.on('keyup', e => {
	removeErrMsg();
	let valid = isValidEmail(e.target.value);
});

//function to show or hide job role input depending on selected option
$jobRoleSelect.on('change', e => {
	if(e.target.value === "other")
		$jobRoleOther.show();
	else
		$jobRoleOther.hide();
});

//resets colors shown and which color option is selected depending on the theme passed to the function
const resetColorsShown = theme => {
	if(theme === "js puns")
		$colors.eq(firstIndexHeart).attr('selected', false);
	else
		$colors.eq(firstIndexPuns).attr('selected', false);

	for(c=0; c<$numOfColors; c++) {
		$colors.eq(c).show();
	}
}
//function to calculate which colors should be shown/hidden depending on theme passed and sets the selected option based on the theme
const colorsShown = theme => {
	resetColorsShown(theme);
	let startNum;
	let limit;

	if(theme === "js puns") {
		initialShown = firstIndexPuns;
		startNum = firstIndexHeart;
		limit = $numOfColors;

		$colors.eq(firstIndexPuns).attr('selected', true);
	}
	else {
		initialShown = firstIndexHeart;
		startNum = firstIndexPuns;
		limit = firstIndexHeart;

		$colors.eq(firstIndexHeart).attr('selected', true);
	}

	for(c=startNum;c<limit;c++) {
		$colors.eq(c).hide();
	}

}

//eventListener to get value of theme clicked on by user; calls colorsShown function if necessary
$shirtDesign.on('change', e => {
	const shirtTheme = e.target.value;

	if(shirtTheme === "Select Theme")
		$shirtColorDiv.hide();
	else {
		$shirtColorDiv.show();
		colorsShown(shirtTheme);
	}
});

//function to reset checkboxes by re enabling them all
const resetBoxes = () => {
	for(let c = 0; c < $activities.length; c++) {
		$activities.eq(c).prop("disabled", false);
	}
}

//function to disable proper activities depending on what has already be checked
const filterActs = $acts => {
	resetBoxes();
	for(let i = 0; i < $acts.length; i++) {
		let $current = $acts.eq(i).parent();
		for(let j = 0; j < $activities.length; j++) {
			let $check = $activities.eq(j).parent();
			if($check.html() !== $current.html()) {
				if($current.html().includes('Tuesday') && $check.html().includes('Tuesday')) {
					if($current.html().includes("9am-12pm") && $check.html().includes("9am-12pm")) {
						$check.children().prop("disabled", true);
					}
					else if($current.html().includes("1pm-4pm") && $check.html().includes("1pm-4pm")) {
						$check.children().prop("disabled", true);
					}
				}
			}
		}
	}
}

//function to determine and display price total
const deterPrice = acts => {
	let total = 0;
	let loopStart = 0;

	for(let i = loopStart; i < acts.length; i++) {
		if(acts.eq(i).attr("name") === "all") {
			total += 200;
			loopStart = 1;
		}
		else
			total += 100;
	}

	return total;
}

//function to remove total p element if present
const resetTotal = () => {
	const p = $(".activities p");

	if(p != undefined)
		p.remove();
}

//eventListener to determine which acitivities have been checked and to show total
$activitiesDiv.on('change', e => {
	resetTotal();
	let total = deterPrice($activities.filter(":checked"));
	let p = document.createElement("p");

	filterActs($activities.filter(":checked"));

	p.textContent = "Total: $" + total;
	$activitiesDiv.append(p);

});


//function to initially hide payment method info shown
const hidePayMethod = () => {
	$bitcoin.hide();
	$payPal.hide();
	$creditInfo.hide();
}

//function to show proper information depending on payment method selected
const showPayMethod = pMethod => {
	hidePayMethod();
	if(pMethod === 'credit card') {
		$creditInfo.show();
		$paymentOptions.eq(1).attr('selected', true);
	}
	else if(pMethod === 'paypal') {
		$payPal.show();
	}
	else {
		$bitcoin.show();
	}
}

//eventListener to hide/display payment info depending on user selection
$paymentInfo.on('change', e => {
	const payMethod = e.target.value;
	showPayMethod(payMethod);
});

//eventListener for when register button is clicked
$form.on("submit", event => {
	removeErrMsg();
	const validName = isValidName($nameField.val());
	const validMail = isValidEmail($email.val());
	const activities = activitySelected();
	let validPayInfo;

	if($paymentInfo.val() === "credit card") {
		validPayInfo = isValidCard();
		if(!validPayInfo) {
			event.preventDefault();
		}
	}

	if(!validName || !validMail || !activities) {
		event.preventDefault();
	}


});

/****** FORM VALIDATION FUNCTIONS ******/
const isValidName = uName => {
	let valid = /^[a-zA-Z]+ ?([a-zA-Z]+)? ?$/.test(uName);


	if(valid === false) {
		errorMsg($nameField, "Please enter a name.");
	}

	return valid;
}

const isValidEmail = email => {
	let valid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);

	if(valid === false) {
			errorMsg($email, "Please enter a valid email.");
	}

	return valid;
}

const activitySelected = () => {
	const selectedActs = $activities.filter(":checked");
	let valid = true;

	if(selectedActs.length === 0) {
		valid = false;
		errorMsg($activitiesDiv, "Please select at least one activity.");
	}

	return valid;
}

const isValidCard = () => {
	const $cardNum = $('#cc-num');
	const $zipCode = $('#zip');
	const $cvv = $('#cvv');
	let valid = true;

	if(!/^[0-9]{13,16}$/.test($cardNum.val())) {
		if($cardNum.val().length === 0)
			errorMsg($cardNum, "Please enter a credit card number.");
		else
			errorMsg($cardNum, "Please enter a number that is between 13 and 16 digits long.");

		valid = false;
	}
	if(!/^[0-9]{5}$/.test($zipCode.val())) {
		if($zipCode.val().length === 0)
			errorMsg($zipCode, "Please enter your area code.");
		else
			errorMsg($zipCode, "Please enter your 5 digit area code.");

		valid = false;
	}
	if(!/^[0-9]{3}$/.test($cvv.val())) {
		if($cvv.val().length === 0)
			errorMsg($cvv, "Please enter a CVV number.");
		else
			errorMsg($cvv, "Please enter the three digit number on the back of your card.");

		valid = false;
	}

	return valid;
}

//function to create error messages and insert them after the element passed
const errorMsg = (element, msg) => {
	let p = document.createElement("p");

	p.classList.add("error");
	p.textContent = msg;
	element.after(p);
}

const removeErrMsg = () => {
	$("p.error").remove();
}


//initial formatting of page
$nameField.focus();
$jobRoleOther.hide();
$shirtColorDiv.hide();
$paymentOptions.eq(0).attr('disabled', 'disabled');
showPayMethod('credit card');
$("form").attr("novalidate", true);



