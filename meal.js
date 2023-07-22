import { singleSuggestion, mealDetails, allFavMeals } from "./components.js";
import { fetchByLetter, fetchByID } from "./fetch.js";

const search = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const allMeals = document.getElementById("allMeals");
const searchSuggestions = document.getElementById("searchSuggestions");
const detailsPage = document.getElementById("detailsPage");
const detailsPageCont = document.getElementById("detailsPageCont");
console.log(localStorage);
const favorites = [];

function loadFromLocal() {
	if (localStorage.getItem("Mealio")) {
		let allFavs = JSON.parse(localStorage.getItem("Mealio"));
		for (let i = 0; i < allFavs.length; i++) {
			let id = Number(allFavs[i].id);
			favorites.push(id);
		}
	} else {
		localStorage.setItem("Mealio", JSON.stringify([]));
	}
}
loadFromLocal();

async function renderAllFavs() {
	if (localStorage.getItem("Mealio")) {
		let allFavs = await JSON.parse(localStorage.getItem("Mealio"));
		if (allFavs.length == 0) {
			allMeals.innerHTML = "Your Liked Meals Will Show Here :D";
			return;
		}
		allMeals.innerHTML = "";
		let completedInnerHtml;
		for (let i = 0; i < allFavs.length; i++) {
			let { name, area, category, photo, id } = allFavs[i];
			let singleFav = allFavMeals(name, area, category, photo, true, id);
			completedInnerHtml
				? (completedInnerHtml = completedInnerHtml + singleFav)
				: (completedInnerHtml = singleFav);
		}
		allMeals.innerHTML = completedInnerHtml;
	}
}
renderAllFavs();

function renderSearchSuggestions(suggestions) {
	searchSuggestions.innerHTML = "";
	searchSuggestions.classList.remove("searchSuggestions");
	let completedInnerHtml;
	for (let i = 0; i < suggestions.length; i++) {
		let liked = false;
		for (let j = 0; j < favorites.length; j++) {
			if (Number(suggestions[i].idMeal) === favorites[j]) {
				liked = true;
			}
		}
		let oneItem = singleSuggestion(
			suggestions[i].idMeal,
			suggestions[i].strMeal,
			{ alreadyLiked: liked }
		);
		completedInnerHtml
			? (completedInnerHtml = completedInnerHtml + oneItem)
			: (completedInnerHtml = oneItem);
	}
	searchSuggestions.innerHTML = completedInnerHtml;
	searchSuggestions.classList.add("searchSuggestions");
}

const handleSearch = async (searchText) => {
	fetchByLetter(searchText)
		.then((results) => {
			// You can now use the results variable here
			renderSearchSuggestions(results);
		})
		.catch((error) => {
			searchSuggestions.classList.add("searchSuggestions");
			searchSuggestions.innerHTML = `${error}`;
		});
};

const popTheDetails = async (id) => {
	id = Number(id);
	let innerHTML;
	let alreadyLiked;
	await fetchByID(id).then((meal) => {
		console.log(meal);
		let {
			strMeal,
			strArea,
			strCategory,
			strMealThumb,
			idMeal,
			strInstructions,
		} = meal;
		for (let i = 0; i < favorites.length; i++) {
			if (favorites[i] === id) {
				alreadyLiked = true;
				break;
			}
		}
		innerHTML = mealDetails(
			strMeal,
			strArea,
			strCategory,
			strMealThumb,
			alreadyLiked,
			idMeal,
			strInstructions
		);
	});
	detailsPage.classList.add("detailsPageAnimate");
	searchSuggestions.innerHTML = "";
	searchSuggestions.classList.remove("searchSuggestions");
	detailsPage.innerHTML = innerHTML;
};

const addToFav = async (id) => {
	id = Number(id);
	let favIcon = document.getElementById(`unliked#${id}`);
	favIcon.setAttribute("src", "Assets/favouriteRed.png");
	favIcon.setAttribute("id", `liked#${id}`);
	favorites.push(id);
	await fetchByID(id).then((meal) => {
		let item = {
			id: meal.idMeal,
			name: meal.strMeal,
			area: meal.strArea,
			category: meal.strCategory,
			photo: meal.strMealThumb,
		};
		let allFavs = JSON.parse(localStorage.getItem("Mealio"));
		allFavs.push(item);
		localStorage.setItem("Mealio", JSON.stringify(allFavs));

		console.log(JSON.parse(localStorage.getItem("Mealio")));
	});
	renderAllFavs();
	console.log("added", favorites);
};

const removeFromFavs = (id) => {
	id = Number(id);
	let allIDs = document.querySelectorAll(`[id='liked#${id}']`);
	for (let i = 0; i < allIDs.length; i++) {
		allIDs[i].setAttribute("src", "Assets/favourite.png");
		allIDs[i].setAttribute("id", `unliked#${id}`);
	}
	for (let i = 0; i < favorites.length; i++) {
		if (favorites[i] === id) {
			favorites.splice(i, 1);
			break;
		}
	}
	let allFavs = JSON.parse(localStorage.getItem("Mealio"));
	for (let i = 0; i < allFavs.length; i++) {
		if (Number(allFavs[i].id) === id) {
			allFavs.splice(i, 1);
			break;
		}
	}
	localStorage.setItem("Mealio", JSON.stringify(allFavs));
	renderAllFavs();
	console.log(JSON.parse(localStorage.getItem("Mealio")));
	console.log("removed", favorites);
};

const debounce = (fn, delay) => {
	let timerId = null;
	return (...args) => {
		clearTimeout(timerId);
		timerId = setTimeout(() => fn(...args), delay);
	};
};

const onInput = debounce(handleSearch, 300);

search.addEventListener("input", (e) => {
	if (e.target.value && e.target.value != " ") {
		onInput(e.target.value);
	} else {
		searchSuggestions.innerHTML = "";
		searchSuggestions.classList.remove("searchSuggestions");
	}
});

search.addEventListener("click", (e) => {
	if (e.target.value && e.target.value != " ") {
		onInput(e.target.value);
	}
});

window.addEventListener("click", (e) => {
	console.log(e);
	if (e.target.className == "singleSuggestion") {
		//Function to call the detail page prompt
		let id = e.target.id.split("#")[1];
		popTheDetails(id);
	} else if (e.target.className == "favIcon") {
		let id = e.target.id.split("#")[1];
		if (e.target.id.split("#")[0] === "unliked") {
			addToFav(id);
		} else {
			removeFromFavs(id);
		}
	} else if (e.target.className == "para") {
		//Function to call the detail page prompt

		let id = e.target.id.split("#")[1];
		popTheDetails(id);
	} else if (e.target.id == "searchSuggestions") {
		//Ye comment Thakur ne likha hai
	} else if (e.target.id == "detailsPage") {
		//Ye wala Thanos ne likha hai
	} else {
		searchSuggestions.innerHTML = "";
		searchSuggestions.classList.remove("searchSuggestions");
		detailsPage.classList.remove("detailsPageAnimate");
		detailsPage.innerHTML = "";
	}
});
