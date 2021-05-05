/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    book: {
      bookList: '.books-list',
      image_id: 'data-id',
      image: '.books-list .book__image',
      filter: '.filters',
      input: '[name="filter"]',
    },
  };

  const templates = {
    books: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  function renderBooks() {
    /* generate HTML based on template */
    for (const book of dataSource.books) {
      const generatedHTML = templates.books(book);
      console.log('generated html:', generatedHTML);
      const ratingWidth = (book.rating * 10) + '%';
      const ratingBgc = determineRatingBgc(ratingWidth);
      const ratingFilling = document.querySelector('book__rating__fill');
      /* create element using utils.create elementFromHTML */
      const element = utils.createDOMFromHTML(generatedHTML);
      /* find book container */
      const bookContainer = document.querySelector(select.book.bookList);
      /* add element to menu */
      bookContainer.appendChild(element);

    }
  }


  let favoriteBooks = [];
  let filters = [];
  function initActions() {
    //const favorites = document.querySelectorAll(select.book.image);
    const bookList = document.querySelector(select.book.bookList);
    //const favorite = document.querySelector(select.book.image);
    const filter = document.querySelector(select.book.filter);
    console.log('filter', filter);
    //const input = document.querySelector(select.book.input);
    //console.log('input', input);

    //for (const favorite of favorites) {

    bookList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      if (event.target.offsetParent.classList.contains('book__image')) {
        console.log('favorite', event.target);
        const favorite = event.target.offsetParent.classList;

        if (!favorite.contains('favorite')) {
          favorite.add('favorite');
          console.log('favorite', favorite);
          if (event.target.offsetParent.classList.tagName == 'a'); {
            favoriteBooks.push(event.target.offsetParent.classList.value);
          }
        }
        else {
          favorite.remove('favorite');
          //const indexOfFavorite = favoriteBooks.indexOf(bookId.value);
          //favoriteBooks.splice(indexOfFavorite, 1);
        }
      }
    });
    //}
    console.log('favoriteBooks', favoriteBooks);
    filter.addEventListener('change', function (event) {
      event.preventDefault();
      if (event.target.tagName.toUpperCase() == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter') {
        console.log('inputValue', event.target.value);
        if (event.target.checked) {
          filters.push(event.target.value);
        }
        else {
          const indexOfUnchecked = filters.indexOf(event.target.value);
          filters.splice(indexOfUnchecked, 1);
        }
      }
      console.log('FILTERED', filters);
      filterBooks();
    });
  }

  function filterBooks() {
    let shouldBeHidden = false;
    for (const bookId in dataSource.books) {
      const book = dataSource.books[bookId];
      for (const filter of filters) {
        console.log('book', book.details[filter]);
        if (!book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
        else {
          shouldBeHidden = false;
        }
      }

      if (shouldBeHidden) {
        const bookElement = document.querySelector('.book__image[data-id="' + book.id + '"]');
        bookElement.classList.add('hidden');
      }
      else {
        const bookElement = document.querySelector('.book__image[data-id="' + book.id + '"]');
        bookElement.classList.remove('hidden');
      }
    }
  }

  function determineRatingBgc(rating) {
    if (rating < 6) {
      return 'background: linear - gradient(to bottom,  #fefcea 0 %, #f1da36 100 %)';
    }
    else if (rating > 6 && rating <= 8) {
      return 'background: linear - gradient(to bottom, #b4df5b 0 %,#b4df5b 100 %)';
    }
    else if (rating > 8 && rating <= 9) {
      return 'background: linear - gradient(to bottom, #299a0b 0 %, #299a0b 100 %)';
    }
    else if (rating > 9) {
      return 'background: linear - gradient(to bottom, #ff0084 0 %,#ff0084 100 %)';
    }
  }
  renderBooks();
  initActions();
}
