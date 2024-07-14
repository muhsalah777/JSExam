// Loading Screen
function loadScrean(){
    $(".loadingScreen").fadeOut(1000,function(){
        $(".loadingScreen").removeClass('d-flex')
    })
}
loadScrean()

function innerLoadin(){
    $(".inner-loading-screen").fadeIn(0,function(){
        $(".inner-loading-screen").removeClass('d-none')
    })
}
function innerLoadOut(){
    $(".inner-loading-screen").fadeOut(1000,function(){
        $(".inner-loading-screen").addClass('d-none')
    })
}

// 
// 

// Side Nav Menu
$(".goInsideOutside").on('click',function(){
    let width = $(".sideNav .navTab").outerWidth()
    let left = $(".sideNav").css('left')
    if (left == '0px'){
    $(".sideNav").animate({left:`-${width}px`},1000)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".moveUp").animate({top:100},1000)
    } else {
    $(".sideNav").animate({left:0},1000)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    $(".moveUp").animate({top:0},2000)
    }
})
function closeNav(){
    let width = $(".sideNav .navTab").outerWidth()
    $(".sideNav").animate({left:`-${width}px`},1000)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".moveUp").animate({top:100},1000)
}
closeNav()

// 
// 

// Search
function showSearchInputs() {
    closeNav()
    // console.log("aloooo")
    let searchContainer = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white pl" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white pl" type="text" placeholder="Search By First Letter">
        </div>
    </div>`
    document.getElementById("searchContainer").innerHTML = searchContainer
}

async function searchByName(searCh) {
    closeNav()
    innerLoadin()
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searCh}`)
    data = await data.json()

    data.meals ? displayMeals(data.meals) : displayMeals([])
}

async function searchByFLetter(searCh) {
    closeNav()
    innerLoadin()
    term == "" ? term = "a" : "";
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searCh}`)
    data = await data.json()

    data.meals ? displayMeals(data.meals) : displayMeals([])
    
}
let ser = " "
searchByName(ser)

function displayMeals(arr) {
    let temp = "";
    for (let i = 0; i < arr.length; i++) {
        temp += `
        <div class="col-md-3">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="item position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>`
    }
    innerLoadOut()
    document.getElementById("rowData").innerHTML = temp
}

// 
// 

// categories
let categoriesList = []
async function getCategories() {
    innerLoadin()
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
	data = await data.json()
    // console.log(data)
    
	categoriesList = data.categories
    closeNav()
    displaycategories()
    innerLoadOut()
}

function displaycategories(){
    
    let temp = ""
    categoriesList.forEach((i)=>{
        let {strCategoryThumb,strCategory,strCategoryDescription } = i
        temp+=`<div class="col-md-3">
                <div onclick="getCategoryMeals('${strCategory}')" class="item position-relative overflow-hidden rounded-2 cursor-pointer">
                <img src="${strCategoryThumb}" class="w-100" alt="">
                <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>${strCategory}</h3> 
               <p>${strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
             </div>
        </div>`
    })
    document.getElementById("rowData").innerHTML = temp
}

async function getCategoryMeals(category) {
    innerLoadin()
    
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    data = await data.json()

    displayMeals(data.meals.slice(0, 20))
    innerLoadOut()
}

// 
// 

// area
let areaList = []
async function getArea(){
    innerLoadin()
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    data = await data.json()
    
    areaList = data.meals
    // console.log(areaList)
    closeNav()
    displayAreaList()
}

function displayAreaList(){
    innerLoadOut()
    let temp = ""
    areaList.forEach((i)=>{
        let {strArea} = i
        temp+=` <div class="col-md-3">
                <div onclick="getAreaMeals('${strArea}')" class="rounded-2 text-center cursor-pointer text-white">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3 class="text-white">${strArea}</h3>
                </div>
        </div>`
    })
    document.getElementById("rowData").innerHTML = temp
}

async function getAreaMeals(area) {
    innerLoadin()

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    data = await data.json()

    displayMeals(data.meals.slice(0, 20))
    innerLoadOut()
}

// 
// 

// ingredients
let ingredientsList = []
async function getIngredients(){
    innerLoadin()
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    data = await data.json()
    ingredientsList = data.meals
    closeNav()
    displayIngredientsList()
}

function displayIngredientsList(){
    innerLoadOut()
    let temp = ""
    ingredientsList.forEach((i)=>{
        let {strIngredient,strDescription} = i
        temp+=`<div class="col-md-3">
                        <div onclick="getIngredientsMeals('${strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                        <h3 class="text-white text-center">${strIngredient}</h3>
                        <p class="text-white text-center">${strDescription}</p>
                </div>
        </div>`
    })
    document.getElementById("rowData").innerHTML = temp
}

async function getIngredientsMeals(ingredients) {
    innerLoadin()

    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    data = await data.json()

    displayMeals(data.meals.slice(0, 20))
    innerLoadOut()

}

// 
// 

// Contact Us
let sUbMiTBtn;
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;


function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}

let signUpArray = []



function saveData(){
    // console.log("alooooo")

    let signupName = document.getElementById('nameInput')
    let signupEmail = document.getElementById('emailInput')
    let signupPhone = document.getElementById('phoneInput')
    let signupAge = document.getElementById('ageInput')
    let signupPassword = document.getElementById('passwordInput')
    let signupRepassword = document.getElementById('repasswordInput')
if (localStorage.getItem("users")){

    signUpArray = JSON.parse(localStorage.getItem("users"))
}

    let signUp = {
        name: signupName.value,
        email: signupEmail.value,
        phone: signupPhone.value,
        age: signupAge.value,
        password: signupPassword.value,
        repassword: signupRepassword.value,
    }

    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()){
        signUpArray.push(signUp)
        localStorage.setItem("users",JSON.stringify(signUpArray))
    } else {
        sUbMiTBtn.setAttribute("disabled", true)
    }
    
    
    
}

function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        sUbMiTBtn.removeAttribute("disabled")
    } else {
        sUbMiTBtn.setAttribute("disabled", true)
    }
}


function showContacts() {
    closeNav()
    let temp = " "
     temp+= `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="sUbMiTBtn" onclick="saveData()" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `
    document.getElementById("rowData").innerHTML = temp
    
    sUbMiTBtn = document.getElementById("sUbMiTBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

// 
// 

// meal details
async function getMealDetails(mealID) {
   closeNav()
    innerLoadin()

    
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    data = await data.json();

    displayMealDetails(data.meals[0])
    innerLoadOut()

}

function displayMealDetails(meal) {

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }

    let temp = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class="text-white">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2 class="text-white">Instructions</h2>
                <p class="text-white">${meal.strInstructions}</p>
                <h3 class="text-white"><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3 class="text-white"><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3 class="text-white">Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3 class="text-white">Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`

    document.getElementById("rowData").innerHTML = temp
}