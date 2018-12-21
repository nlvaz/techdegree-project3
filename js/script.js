//global variables & constants selecting/creating important components
const $nameField = $('input[id="name"]');
const $jobRoleSelect = $('select[id="title"]');
const $jobRoleOther = $('input[id="other-title"]');
const $shirtDesign = $('select[id="design"]');
const $shirtColorDiv = $('div[id="colors-js-puns"]');
const $colorOptions = $shirtColorDiv.children().eq(1);
const $colors = $colorOptions.children();
const $numOfColors = $colors.length;
const $paymentInfo = $('#payment');
const $creditInfo = $('#credit-card');
const $payPal = $creditInfo.next();
const $bitcoin = $payPal.next();
//constants for color functions
const firstIndexPuns = 0;
const firstIndexHeart = 3;

//function to show or hide job role input depending on selected option
$jobRoleSelect.on('click', e => {
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
$shirtDesign.on('click', e => {
	const shirtTheme = e.target.value;

	if(shirtTheme === "Select Theme")
		$shirtColorDiv.hide();
	else {
		$shirtColorDiv.show();
		colorsShown(shirtTheme);
	}
});

//eventListener to determine which acitivities have been checked & to compile them into an array

//function to initially hide payment method info shown
const hidePayMethod = () => {
	$bitcoin.hide();
	$payPal.hide();
	$creditInfo.hide();
}

//function for credit card info validation

//function to show proper information depending on payment method selected
const showPayMethod = pMethod => {
	hidePayMethod();
	if(pMethod === 'credit card' || pMethod === 'select_method') {
		$creditInfo.show();
		$paymentInfo.eq(1).attr('selected', true);
	}
	else if(pMethod === 'paypal') {
		$payPal.show();
	}
	else {
		$bitcoin.show();
	}
}

//eventListener to hide/display payment info depending on user selection
$paymentInfo.on('click', e => {
	const payMethod = e.target.value;
	showPayMethod(payMethod);
});

//initial formatting of page
$nameField.focus();
$jobRoleOther.hide();
$paymentInfo.eq(1).attr.('selected', true);
showPayMethod('credit card');



