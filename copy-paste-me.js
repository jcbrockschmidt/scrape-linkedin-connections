/* INSTRUCTIONS:
 *  - Open someone's list of connections by going to their profile and selecting "X Connections" (where X is some number).
 *  - Zoom out until the entire page--namely the navigation panel--is visible. If you don't do this, the buttons to navigate to the next page may not be loaded and the script won't be able to change pages.
 *  - Open the developer console
 *  - Copy and paste this script into the developer console to load the script.
 *  - Run `scrape()` to gather the connections on the page and `gotoNextPage()` to change pages. Do this until all pages have been visited.
 *  - Display the `csvData` variable in the console to see all the scraped connections in CSV format. You should copy this data to a file.
 */

var csvData = "name,subtitle,location,link\n";

function scrape() {
    let people = document.getElementsByClassName("reusable-search__result-container");
    console.log(typeof(people));
    for (let person of people) {
	let titles = person.getElementsByClassName("entity-result__title-line");
	let link = titles[0].getElementsByClassName("app-aware-link")[0];
	let titleSpan = link.getElementsByTagName("span")[0].getElementsByTagName("span")[0];
	let name = titleSpan.innerText;
	let subtitle = person.getElementsByClassName("entity-result__primary-subtitle")[0].innerText;
	let location = person.getElementsByClassName("entity-result__secondary-subtitle")[0].innerText;
	let profileLink = link.href;

	console.log(name);
	console.log(subtitle);
	console.log(profileLink);
	console.log(location);

	csvData += '"' + [name, subtitle, location, profileLink].join('","') + '"';
	csvData += "\n";
    }
}

function gotoNextPage() {
    window.scrollTo(0,document.body.scrollHeight);
    let buttons = document.getElementsByClassName("artdeco-pagination__pages")[0].getElementsByClassName("artdeco-pagination__indicator");
    console.log(buttons);
    let clickNow = false;
    for (let btnContain of buttons) {
	window.scrollTo(0, document.body.scrollHeight);
	let btn = btnContain.getElementsByTagName("button")[0];
	if (clickNow) {
	    btn.click();
	    break;
	} else {
	    if (btn.getAttribute("aria-current")) {
		clickNow = true;
	    }
	}
    }
}
