//global variables selecting/creating important components
const $nameField = $('input[id="name"]');
const $jobRoleSelect = $('select[id="title"]');
const $jobRoleOther = $('input[id="other-title"]');
const $shirtDesign = $('select[id="design"]');
const $shirtColorDiv = $('div[id="colors-js-puns"]');
const $colorOptions = $shirtColorDiv.children().eq(1);
const $colors = $colorOptions.children();
const $numOfColors = $colors.length;

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
	for(c=0; c<$numOfColors; c++) {
		$colors.eq(c).show();
	}
}
//function to calculate which colors should be shown
const colorsShown = theme => {
	resetColors();
	const firstIndexPuns = 0;
	const firstIndexHeart = 3;
	let startNum;
	let limit;
	let initialShown;

	if(theme === "js puns") {
		initialShown = firstIndexPuns;
		startNum = firstIndexHeart;
		limit = $numOfColors;

		$colors.eq(initialShown).attr('selected', true);
	}
	else {
		initialShown = firstIndexHeart;
		startNum = firstIndexPuns;
		limit = firstIndexHeart;

		$colors.eq(initialShown).attr('selected', true);
	}

	for(c=startNum;c<limit;c++) {
		$colors.eq(c).hide();
	}

}

//function to show color options until a theme is chosen and to show or hide appropriate color options
$shirtDesign.on('click', e => {
	const shirtTheme = e.target.value;

	if(shirtTheme === "Select Theme")
		$shirtColorDiv.hide();
	else {
		$shirtColorDiv.show();
		colorsShown(shirtTheme);
	}
});