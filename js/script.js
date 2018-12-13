//global variables selecting/creating important components
const $nameField = $('input[id="name"]');
const $jobRoleSelect = $('select[id="title"]');
const $jobRoleOther = $('input[id="other-title"]');
const $shirtDesign = $('select[id="design"]');
const $shirtColorDiv = $('div[id="colors-js-puns"]');
const $colorOptions = $shirtColorDiv.children().eq(1);
const $numOfColors = $colorOptions.length;

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

//resets colors shown
const resetColors = () => {
	for(c=0; c<$numOfColors; c++)
		$colorOptions.children().eq(c).show();
}
//function to calculate which colors should be shown
const colorsShown = theme => {
	resetColors();
	let startNum;
	let limit;

	if(theme === "js puns") {
		startNum = 2;
		limit = $numOfColors;
	}
	else if(theme === "heart js") {
		startNum = 0;
		limit = 2;
	}

	for(c=startNum;c<limit;c++)
		$colorOptions.children().eq(c).hide();


}

//function to show color options until a theme is chosen and to show or hide appropriate color options
$shirtDesign.on('click', e => {
	const shirtTheme = e.target.value;

	if(shirtTheme === "Select Theme")
		$shirtColorDiv.hide();
	else
		$shirtColorDiv.show();
		colorsShown(shirtTheme);
});