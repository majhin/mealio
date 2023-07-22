export const fetchByLetter = (searchText) => {
	return new Promise((resolve, reject) => {
		let searchType;
		searchText.length == 1 ? (searchType = "f") : (searchType = "s");
		let url = `https://www.themealdb.com/api/json/v1/1/search.php?${searchType}=${searchText}`;
		fetch(url).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					if (data.meals != null) {
						let results = data.meals;
						if (results.length > 8) {
							results = data.meals.slice(0, 7);
						}
						resolve(results);
					} else {
						reject("No Meals Found :(");
					}
				});
			} else {
				console.log(res);
			}
		});
	});
};

export const fetchByID = (id) => {
	return new Promise((resolve, reject) => {
		let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
		fetch(url).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					if (data.meals != null) {
						let meal = data.meals[0];
						resolve(meal);
					}
				});
			} else {
				console.log(res);
			}
		});
	});
};

export const fetchSurprise = () => {
	return new Promise((resolve, reject) => {
		let url = `https://www.themealdb.com/api/json/v1/1/random.php`;
		fetch(url).then((res) => {
			if (res.ok) {
				res.json().then((data) => {
					if (data.meals != null) {
						let meal = data.meals[0];
						resolve(meal);
					}
				});
			} else {
				console.log(res);
			}
		});
	});
};
