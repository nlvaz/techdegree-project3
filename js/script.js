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

//reset colors show function
const resetColors = () => {
	for(c=0; c<$numOfColors; c++)
		$colorOptions.children().eq(c).show();
}
//function to calculate which colors should be shown
const colorsShown = theme => {
	resetColors();

	for(c=0; c<$numOfColors; c++)
		if(theme === "js puns" && c>2)
			$colorOptions.children().eq(c).hide();
		else if(theme === "heart js" && c<3)
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