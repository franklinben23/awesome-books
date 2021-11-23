class Book {
  constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

class Library {
  constructor(){
    this.data = [];
  }

  addBook(book) {
    this.data.push(book);
    localStorage.setItem('library', JSON.stringify(this.data));
    updateDisplay(book);
  }

  removeBook(id) {
    this.data = this.data.filter((bookObj) => bookObj.id !== id);
    localStorage.setItem('library', JSON.stringify(this.data));
    window.location.reload();
  }
}

const library = new Library();

function adder() {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  let id;
  if (library.data.length > 0) {
    const lastItem = library[library.data.length - 1];
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

function updateDisplay(bookObj) {
  const bookList = document.getElementById('book-list');
  const book = document.createElement('LI');
  book.innerHTML = `Title: ${bookObj.title} <br> Author: ${bookObj.author}`;
  const deletetBtn = document.createElement('button');
  deletetBtn.innerHTML = 'Delete';
  deletetBtn.addEventListener('click', () => {
    library.removeBook(bookObj.id);
  });

  book.appendChild(deletetBtn);
  bookList.appendChild(book);
}

const addbtn = document.getElementById('add-btn');
addbtn.addEventListener('click', () => {
  const book = adder();
  library.addBook(book);
  addBook(book);
  localStorage.setItem('library', JSON.stringify(library.data));
});

function saver() {
  library.data.forEach((book) => {
    updateDisplay(book);
  });
}

window.onload = function () {
  library.data = JSON.parse(localStorage.getItem('library' || '[]'));
  if (library.data === null) {
    library.data = [];
    return;
  }
  saver();
};
