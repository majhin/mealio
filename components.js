const unliked = "./Assets/favourite.png";
const liked = "./Assets/favouriteRed.png";

//Provide HTML for a single search suggestion
export function singleSuggestion(meal_ID, meal_NAME, { alreadyLiked }) {
	return (
		`<div id="div#${meal_ID}" class="singleSuggestion">` +
		`<p id="para#${meal_ID}" class="para">${meal_NAME}</p>` +
		`<img id="${
			alreadyLiked ? "liked" : "unliked"
		}#${meal_ID}" class="favIcon" src="${
			alreadyLiked ? liked : unliked
		}" alt="" srcset="">` +
		`</div>`
	);
}

//Provide HTML for the details page
export function mealDetails(
	meal_Name,
	meal_AREA,
	meal_CATEGORY,
	meal_PHOTO,
	alreadyLiked,
	meal_ID,
	meal_INSTRUCTIONS
) {
	return (
		`<div id="detailsPageCont" class="detailsPageCont">` +
		`<div class="detailsPageImage">` +
		`<img class="detailsPageImage" src="${meal_PHOTO}" alt="" srcset="">` +
		`</div>` +
		`<div class="detailsPageText">` +
		`<div class="detailsPageTextData">${meal_Name} <img id="close#${meal_ID}" class="close" src="./Assets/close.png" alt="" srcset=""></div>` +
		`<div class="detailsPageTextData">${meal_AREA} <img id="${
			alreadyLiked == true ? "liked" : "unliked"
		}#${meal_ID}" class="favIcon" src="${
			alreadyLiked == true ? liked : unliked
		}" alt="" srcset=""></div>` +
		`<div class="detailsPageTextData">${meal_CATEGORY}</div>` +
		`</div>` +
		`</div>` +
		`<div>` +
		`<p>${meal_INSTRUCTIONS}</p>`
	);
}

//Provide HTML for a single saved favorite meal
export function allFavMeals(
	meal_Name,
	meal_AREA,
	meal_CATEGORY,
	meal_PHOTO,
	alreadyLiked,
	meal_ID
) {
	return (
		`<div id="detailsPageCont" class="singleFavMealCont">` +
		`<div class="detailsPageImage">` +
		`<img class="detailsPageImage" src="${meal_PHOTO}" alt="" srcset="">` +
		`</div>` +
		`<div class="detailsPageText">` +
		`<div class="detailsPageTextData">${meal_Name}</div>` +
		`<div class="detailsPageTextData">${meal_AREA}</div>` +
		`<div class="detailsPageTextData">${meal_CATEGORY}</div>` +
		`</div>` +
		`<div> <img id="${
			alreadyLiked ? "liked" : "unliked"
		}#${meal_ID}" class="favIcon" src="${
			alreadyLiked ? liked : unliked
		}" alt="" srcset="">` +
		`<img id="moreInfo#${meal_ID}" class="moreInfo" src="./Assets/information.png" alt="" srcset="">` +
		`</div>` +
		`</div>`
	);
}
