const unliked = "./Assets/favourite.png";
const liked = "./Assets/favouriteRed.png";

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
		`<div id="detailsPageCont" class="border detailsPageCont">` +
		`<div class="border detailsPageImage">` +
		`<img class="detailsPageImage" src="${meal_PHOTO}" alt="" srcset="">` +
		`</div>` +
		`<div class="border detailsPageText">` +
		`<div class="border detailsPageTextData">${meal_Name} <img id="${
			alreadyLiked == true ? "liked" : "unliked"
		}#${meal_ID}" class="favIcon" src="${
			alreadyLiked == true ? liked : unliked
		}" alt="" srcset=""></div>` +
		`<div class="border detailsPageTextData">${meal_AREA}</div>` +
		`<div class="border detailsPageTextData">${meal_CATEGORY}</div>` +
		`</div>` +
		`</div>` +
		`<div>` +
		`<p>${meal_INSTRUCTIONS}</p>`
	);
}

export function allFavMeals(
	meal_Name,
	meal_AREA,
	meal_CATEGORY,
	meal_PHOTO,
	alreadyLiked,
	meal_ID
) {
	return (
		`<div id="detailsPageCont" class="border singleFavMealCont">` +
		`<div class="border detailsPageImage">` +
		`<img class="detailsPageImage" src="${meal_PHOTO}" alt="" srcset="">` +
		`</div>` +
		`<div class="border detailsPageText">` +
		`<div class="border detailsPageTextData">${meal_Name} <img id="${
			alreadyLiked ? "liked" : "unliked"
		}#${meal_ID}" class="favIcon" src="${
			alreadyLiked ? liked : unliked
		}" alt="" srcset=""></div>` +
		`<div class="border detailsPageTextData">${meal_AREA}</div>` +
		`<div class="border detailsPageTextData">${meal_CATEGORY}</div>` +
		`</div>` +
		`<div><p id="moreInfo#${meal_ID}" class="para">More Info</p></div>` +
		`</div>`
	);
}
