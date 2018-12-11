//global variables selecting/creating important components
const $nameField = $('input[id="name"]');
const $jobRoleSelect = $('select[id="title"]');
const $jobRoleOther = $('input[id="other-title"]');
const $shirtDesign = $('select[id="design"]');
const $shirtColorDiv = $('div[id="colors-js-puns"]');

//initial formatting of page
$nameField.focus();
$jobRoleOther.hide();
$shirtColorDiv.hide();


//function to show or hide job role input depending on selected option
$jobRoleSelect.on('click', e => {
	if(e.target.value === "other")
		$jobRoleOther.show();
	else
		$jobRoleOther.hide();
});

//function to show color options until a theme is chosen and to show or hide appropriate color options
$shirtDesign.on('click', e => {
	if(e.target.value != "Select Theme")
		$shirtColorDiv.show();
	else
		$shirtColorDiv.hide();
});