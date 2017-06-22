/**
 * Ajax helper class
 */
class AjaxHelper {

  constructor () {}

  getData (url, callback) {

    let xmlhttp = new XMLHttpRequest()

    xmlhttp.onreadystatechange = () => {

        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText)
        }

    }

    xmlhttp.open('get', url, true)
    xmlhttp.send()

  }

}


/**
 * Main application class
 */
class TinderCats {

  constructor () {

    // define dom nodes elements
    this.card = document.getElementById('main-card')
    this.pic = document.getElementById('main-card-img')
    this.label = document.getElementById('main-card-label')

    // helper class used to make get request to the server
    this.helper = new AjaxHelper()

    // initialize and fill the list of contents
    this.list = this.initList()

    // inizialite counter
    this.counter = 0

    // initialize an empty list for liked contents
    this.likedList = []

  }

  like () {

    // get current picture url and text
    const src = this.pic.src
    const label = this.label.innerText

    // store data in the likedList
    this.likedList.push({ src, label })

    // load next card
    this.loadNext()

  }

  reject () {

    // load next card
    this.loadNext()

    // we do not care to save what you reject

  }

  /**
   * Update card picture and card text
   */
  loadNext () {

    // prevent to load while the list is empty
    if (this.list.length <= 0) {

      return

    }

    // transition out
    this.card.classList.add('rollOut')

    // increment counter
    this.counter++

    // check for no more contents
    // and restart from the beginning of the list
    if (this.counter >= this.list.length) {

      this.counter = 0

    }

    // update card contents - img and label
    let element = this.list[this.counter]
    this.pic.src = element.src
    this.label.innerText = element.label

    // transition in
    this.card.classList.remove('rollOut')
    this.card.classList.add('rollIn')

  }

  /**
   * Get the json list with the pics and labels data
   */
  initList () {

    this.helper.getData( "./assets/list.json", data => {

      try {

        this.list = JSON.parse(data)

      } catch (e) {

        console.warn(e)

      }

    })

    // return empty array while waiting to fill the list
    return []

  }

}


/**
 * Instantiate Main Class
 */
let TCats = new TinderCats()


/**
 * Add Event Listeners to controllers
 */
document.getElementById('action-like').onclick = e => { TCats.like() }
document.getElementById('action-reject').onclick = e => { TCats.reject() }
