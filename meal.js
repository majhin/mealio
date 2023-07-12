const search = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const allMeals = document.getElementById('allMeals');

fetch('https://www.themealdb.com/api/json/v1/1/random.php')
.then(res => {
    if (res.ok) {
        res.json()
        .then(data => console.log(data))
    } else {
        console.log('try later')
    }
})
