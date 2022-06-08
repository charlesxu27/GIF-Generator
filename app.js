// API key
const API_KEY = "RNtYFS9Q4vYDV1E5LLJsw58nQdlOZReC"
const limit = 9
const rating = 'g'

let currentPageNum = 1
let offset = 0

// DOM references
searchFormElement = document.querySelector("form")
searchInputElement = document.querySelector("#search")
searchButtonElement = document.querySelector("#submit-button")
gifDivElement = document.querySelector("#gif-div")
seeMoreButtonElement = document.querySelector("#see-more")

searchButtonElement.addEventListener("click", handleFormSubmit)
seeMoreButtonElement.addEventListener("click", handleShowMore)

seeMoreButtonElement.classList.add('hidden')  // hide seeMoreButton


let searchTerm = ""

async function getResults(search) {
    console.log("*** Calling getResults ***")
    let apiURL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${search}&rating=${rating}&limit=${limit}&offset=${offset}`;
    console.log(`Calling URL: ${apiURL}`)
    let response = await fetch(apiURL);  // make API call
    let data = await response.json();  // convert dynamic json to static JS object
    console.log(data);
    return data;
}


function displayResults(data) {
    console.log("*** Calling displayResults ***")
    if (data) {
        console.log("Data exists!")
    }
    const gifs = data.data.map(
        gif => (
            gifDivElement.innerHTML += `
            <img src="${gif.images.original.url}" alt="${gif.title}">
            `
        )
    )
}

async function handleFormSubmit(event) {
    console.log("*** Calling handleFormSubmit ***")

    event.preventDefault()  // why do I need this?
    gifDivElement.innerHTML = `` // clear gif area before new search
    searchTerm = searchInputElement.value
    console.log(`The searched term is: ${searchTerm}`)
    const data = await getResults(searchTerm)
    displayResults(data)
    searchInputElement.value = ""  // clear search term box
    seeMoreButtonElement.classList.remove('hidden')  // unhide seeMoreButton
}

async function handleShowMore(event) {
    offset = currentPageNum*limit
    const data = await getResults(searchTerm)
    displayResults(data)
    currentPageNum += 1
    console.log(`Page Number: ${currentPageNum}`)
}

async function showTrending() {
    console.log("*** Calling Show Trending ***")
    let apiURL = `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&rating=${rating}&limit=${limit}&offset=${offset}`;
    console.log(`Calling URL: ${apiURL}`)
    let response = await fetch(apiURL);  // make API call
    let data = await response.json();  // convert dynamic json to static JS object
    console.log(data);
    displayResults(data);
}

window.onload = function () {
    // load trending gifs
    showTrending()
}