
/**
 * Main application class
 */
class TinderCats {

  constructor () {

    // define dom nodes elements
    this.card = document.getElementById('main-card')
    this.pic = document.getElementById('main-card-img')
    this.label = document.getElementById('main-card-label')
    this.liked_container = document.getElementById('liked-cats-container')

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

    // store liked data
    this.storeLike(src, label)

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
   * Timeout helps us to keep smooth transitions
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
    setTimeout(() => {

      let element = this.list[this.counter]
      this.pic.src = element.src
      this.label.innerText = element.label

      // transition in - with timeout delay
      setTimeout(() => {

        this.card.classList.remove('rollOut')
        this.card.classList.add('rollIn')

      }, 400)

    }, 300)

  }

  /**
   * Store liked data in the list and
   * append the element to the document
   * inside the modal body
   */
  storeLike (src, label) {

    // store data in the likedList
    this.likedList.push({ src, label })

    // append the card to the document
    let element = `<div class="col-4 col-md-3 p-1"><img class="img-fluid rounded" src="${ src }" alt="${ label }"/></div>`

    this.liked_container.insertAdjacentHTML('beforeend', element)

  }

  /**
   * Get the json list with the pics and labels data
   */
  initList () {

    return [

      {

        label : 'Looking for happy cats',
        src : 'http://www.cutestpaw.com/wp-content/uploads/2016/02/Meow..jpg'

      },
      {

        label : 'Need someone right now',
        src : 'http://www.cutestpaw.com/wp-content/uploads/2016/02/Kitty-yoga.%281%29.jpg'

      },
      {

        label : 'Feeling the holidays',
        src : 'http://www.cutestpaw.com/wp-content/uploads/2016/02/The-very-dangerous-cat-bear..jpg'

      },
      {

        label : 'That\'s how I do',
        src : 'http://www.cutestpaw.com/wp-content/uploads/2016/02/Nom-nom-nom....jpg'

      },
      {

        label : 'It was a long day',
        src : 'http://www.cutestpaw.com/wp-content/uploads/2016/02/Yawn..jpeg'

      },
      {

        label : 'Sure about that ?',
        src : 'http://www.cutestpaw.com/wp-content/uploads/2016/02/Curious-cat..jpg'

      },
      {

        label : '#like4like #ineedfood',
        src : 'http://www.cutestpaw.com/wp-content/uploads/2016/02/Please-I-needz-da-tunaz....jpg'


      }

    ]

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
