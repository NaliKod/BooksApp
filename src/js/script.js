/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    book: {
      bookList: '.books-list',
      image_id: 'data-id',
      image: '.books-list .book__image',
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
      /* create element using utils.create elementFromHTML */
      const element = utils.createDOMFromHTML(generatedHTML);
      /* find book container */
      const bookContainer = document.querySelector(select.book.bookList);
      /* add element to menu */
      bookContainer.appendChild(element);
    }
  }


  let favoriteBooks = [];
  function initActions() {
    //const favorites = document.querySelectorAll(select.book.image);
    const bookList = document.querySelector(select.book.bookList);
    //const favorite = document.querySelector(select.book.image);
    //console.log('favorites', favorites);

    //for (const favorite of favorites) {

    bookList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      if (event.target.offsetParent.classList.contains('.book__image')) {
        const bookId = event.target.getAttribute(select.book.image_id);
        if (!event.target.classList.contains('favorite')) {
          event.tagret.classList.add('favorite');
          //console.log('favorite', favorite);
          favoriteBooks.push(bookId);
        }
        else {
          event.target.classList.remove('favorite');
          const indexOfFavorite = favoriteBooks.indexOf(bookId);
          favoriteBooks.splice(indexOfFavorite, 1);
        }
      }
    });
    //}
    console.log('favoriteBooks', favoriteBooks);
  }

  renderBooks();
  initActions();
}
