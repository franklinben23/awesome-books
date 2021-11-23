let library = [];

class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

function adder() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  let id;
  if (library.length > 0) {
    const lastItem = library[library.length - 1];
    const lastIndex = lastItem.id;
    id = lastIndex + 1;
  } else {
    id = 1;
  }
  const book = new Book(title.value, author.value, id);
  title.value = '';
  author.value = '';
  return book;
}

function removeBook(id) {
  library = library.filter((bookObj) => bookObj.id !== id);
  localStorage.setItem('library', JSON.stringify(library));
  window.location.reload();
}

function addBook(bookObj) {
  const bookList = document.getElementById('book-list');
  const book = document.createElement('LI');
  book.innerHTML = `Title: ${bookObj.title} <br> Author: ${bookObj.author}`;
  const deletetBtn = document.createElement('button');
  deletetBtn.innerHTML = 'Delete';
  deletetBtn.addEventListener('click', () => {
    removeBook(bookObj.id);
  });

  book.appendChild(deletetBtn);
  bookList.appendChild(book);
}

const addbtn = document.getElementById('add-btn');
addbtn.addEventListener('click', () => {
  const book = adder();
  library.push(book);
  addBook(book);
  localStorage.setItem('library', JSON.stringify(library));
});

function saver() {
  library.forEach((book) => {
    addBook(book);
  });
}

window.onload = function () {
  library = JSON.parse(localStorage.getItem('library' || '[]'));
  if (library === null) {
    library = [];
    return;
  }
  saver();
};
