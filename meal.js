import { singleSuggestion, mealDetails, allFavMeals } from "./components.js";
import { fetchByLetter, fetchByID, fetchSurprise } from "./fetch.js";

const search = document.getElementById("search");
const surprise = document.getElementById("surprise");
const allMeals = document.getElementById("allMeals");
const searchSuggestions = document.getElementById("searchSuggestions");
const detailsPage = document.getElementById("detailsPage");
const favorites = [];

//loads favorites from local into favorites array if any, else create a collection for the meal models
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

//renders all the favorites present in the local storage
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

//renders all the suggestions during search
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

//handles the search functionality by fetching as per user input and calls render on it
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

//renders the detail page
function renderDetail(meal) {
	let alreadyLiked;
	let { strMeal, strArea, strCategory, strMealThumb, idMeal, strInstructions } =
		meal;
	for (let i = 0; i < favorites.length; i++) {
		if (favorites[i] === Number(idMeal)) {
			alreadyLiked = true;
			break;
		}
	}
	let innerHTML = mealDetails(
		strMeal,
		strArea,
		strCategory,
		strMealThumb,
		alreadyLiked,
		idMeal,
		strInstructions
	);
	detailsPage.classList.add("detailsPageAnimate");
	searchSuggestions.innerHTML = "";
	searchSuggestions.classList.remove("searchSuggestions");
	detailsPage.innerHTML = innerHTML;
}

//fetches the meal who's details are asked and calls render on it
const popTheDetails = async (id) => {
	id = Number(id);
	await fetchByID(id).then((meal) => {
		renderDetail(meal);
	});
};

//fetches the surprise meal and calls render function on it
async function surpriseMe() {
	await fetchSurprise().then((meal) => {
		renderDetail(meal);
	});
}

//adds to the favorites array (quick access) and local storage (persistence for data)
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
	});
	renderAllFavs();
};

//removes from the favorites array (quick access) and local storage (persistence for data)
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
};

//debounce function for better performance
const debounce = (fn, delay) => {
	let timerId = null;
	return (...args) => {
		clearTimeout(timerId);
		timerId = setTimeout(() => fn(...args), delay);
	};
};
//caller function for debounce
const onInput = debounce(handleSearch, 300);

//Event listeners
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

surprise.addEventListener("click", (e) => {
	surpriseMe();
});

window.addEventListener("click", (e) => {
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
	} else if (e.target.className == "moreInfo") {
		//Function to call the detail page prompt

		let id = e.target.id.split("#")[1];
		popTheDetails(id);
	} else if (e.target.className == "close") {
		detailsPage.classList.remove("detailsPageAnimate");
		detailsPage.innerHTML = "";
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
