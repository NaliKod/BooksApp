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

  class BooksList {
    constructor() {
      const thisBookList = this;
      thisBookList.initData();
      thisBookList.renderBooks();
      thisBookList.getElements();
      thisBookList.initActions();

    }

    initData() {
      this.data = dataSource.books;
    }

    getElements() {
      this.dom = {};
      this.dom.list = document.querySelector(select.book.bookList);
      this.dom.filter = document.querySelector(select.book.filter);
    }

    renderBooks() {
      /* generate HTML based on template */
      for (const book of this.data) {
        const ratingWidth = (book.rating * 10) + '%';
        const ratingBgc = this.determineRatingBgc(book.rating);
        const generatedHTML = templates.books({
          name: book.name,
          price: book.price,
          image: book.image,
          id: book.id,
          rating: book.rating,
          ratingWidth: ratingWidth,
          ratingBgc: ratingBgc
        });
        /* create element using utils.create elementFromHTML */
        console.log(generatedHTML);
        const element = utils.createDOMFromHTML(generatedHTML);
        /* find book container */
        const bookContainer = document.querySelector(select.book.bookList);
        /* add element to menu */
        bookContainer.appendChild(element);
        //console.log('ratingDom',ratingDom);
      }
    }

    initActions() {
      let favoriteBooks = [];
      const thisBookList = this;
      let bookId = [];
      this.dom.list.addEventListener('dblclick', function (event) {
        event.preventDefault();
        if (event.target.offsetParent.classList.contains('book__image')) {
          console.log('favorite', event.target);
          const favorite = event.target.offsetParent;
          thisBookList.bookId = bookId;
          if (!favorite.classList.contains('favorite')) {
            favorite.classList.add('favorite');
            console.log('favorite', favorite);
            if (event.target.offsetParent.classList.tagName == 'a'); {
              bookId = favorite.getAttribute('data-id');
              favoriteBooks.push(bookId);
              console.log('favoritesBooksId', favoriteBooks);
            }
          }
          else {
            favorite.classList.remove('favorite');
            const indexOfFavorite = favoriteBooks.indexOf(bookId);
            favoriteBooks.splice(indexOfFavorite, 1);
          }
        }
      });

      console.log('favoriteBooks', this.favoriteBooks);
      this.dom.filter.addEventListener('change', function (event) {
        event.preventDefault();
        let filters = [];
        thisBookList.filters = filters;
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
        thisBookList.filterBooks();
        //console('func',thisBookList.filterBooks);
        console.log('FILTERED', filters);
      });
    }

    filterBooks() {
      //let filters = [];
      const thisBookList = this;
      let shouldBeHidden = false;
      for (const bookId in this.data) {
        const book = this.data[bookId];
        for (const filter of thisBookList.filters) {
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

    determineRatingBgc(rating) {
      if (rating < 6) {
        return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%)';
      }
      else if (rating > 6 && rating <= 8) {
        return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      }
      else if (rating > 8 && rating <= 9) {
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      }
      else if (rating > 9) {
        return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
    }
  }
  new BooksList();
}
