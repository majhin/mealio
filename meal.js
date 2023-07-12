const search = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const allMeals = document.getElementById('allMeals');
const searchSuggestions = document.getElementById('searchSuggestions')


function renderSearchSuggestions (suggestions) {
    searchSuggestions.innerHTML = "";
    const searchList = document.createElement("ul")
    searchList.setAttribute('id', 'searchList')
    for (let i=0; i<suggestions.length; i++) {
        const li = document.createElement("li")
        li.innerText = suggestions[i].strMeal
        searchList.appendChild(li);
    }
    searchSuggestions.appendChild(searchList)
}

async function handleSearch (searchText) {
    let searchType;
    (searchText.length == 1) ? searchType = "f" : searchType = "s";
    let url = `https://www.themealdb.com/api/json/v1/1/search.php?${searchType}=${searchText}`;
    await fetch(url)
    .then(res => {
        if (res.ok) {
            res.json()
            .then(data => {
                if (data.meals != null) {
                    console.log(data)
                    let results = data.meals;
                    if (results.length > 8) {
                        results = data.meals.slice(0,7)
                    }
                    
                    console.log(results)
                    renderSearchSuggestions(results)
                    
                } else { 
                    searchSuggestions.innerHTML = "<h5>No meal found</h5>";
                    console.log("No meal found")
                }
            })
        } else {
            console.log(res)
        }
    })
}


search.addEventListener("input", e =>{
    console.log(e)
    if (e.target.value && e.target.value != " "){
        handleSearch(e.target.value);
    } else {
        searchSuggestions.innerHTML = "";
    }
})

search.addEventListener("click", e =>{
    if (e.target.value && e.target.value != " "){
        handleSearch(e.target.value);
    }
})

window.addEventListener("click", e =>{
    console.log(e)
    if (e.target !== "li" || e.target !== "div#searchSuggestions"){
        searchSuggestions.innerHTML = "";
    }
})