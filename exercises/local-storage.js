/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...

const storageFavsRAW = localStorage.getItem('favorites')
const parsedData = JSON.parse(storageFavsRAW)
const data = parsedData ?? { items: [] }




// * * Create a function that sets the background to be red for the item with an id listed in favorites LS
const setRedBackgroundColorFromLS = () => {
  if (storageFavsRAW) {
    parsedData.items.forEach((elm) => {
      const reloadedBox = document.getElementById(elm) 
      reloadedBox.style.backgroundColor = 'red'
      reloadedBox.dataset.fav = 'true'
    })
    return data.items = parsedData.items
  }
  return data 
}


// * * Create a function that adds an id to favorites LS by id passed as an argument
const addIdToFavoritesLS = (numb) => {  
  data.items.push(numb)
  localStorage.setItem('favorites', JSON.stringify(data))
  return data
}

// * * Create a function that deletes an id from favorites LS by id passed as an argument
const removeIdFromFavoritesLS = (numb) => {
  const updatedData = data.items.filter(elm => elm != numb)
  data.items = updatedData
  localStorage.setItem('favorites', JSON.stringify(data))
  return data
}

// * * Create a callback function that updates the element background color and does the
const callEmBack = (e) => {
  const item = e.target
  if (item.id) {    
    if (item.dataset.fav == 'true') {
      item.style.backgroundColor = 'white'
      item.dataset.fav = false
      removeIdFromFavoritesLS(item.id)
    } else if (item.dataset.fav == 'false') {
      item.style.backgroundColor = 'red'
      item.dataset.fav = true
      addIdToFavoritesLS(item.id)
    }
  }
  return item
}
setRedBackgroundColorFromLS()
document.querySelector('.cardsContainer').addEventListener('click', callEmBack)
