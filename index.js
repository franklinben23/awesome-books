class Library {
  constructor() {
    this.data = [];
  }

  createBook(title, author) {
    const book = {};
    book.title = title;
    book.author = author;
    if (this.data.length > 0) {
      const lastItem = this.data[this.data.length - 1];
      const lastIndex = lastItem.id;
      book.id = lastIndex + 1;
    } else {
      book.id = 1;
    }
    return book;
  }

  addBook(book) {
    this.data.push(book);
    localStorage.setItem('library', JSON.stringify(this.data));
    this.updateDisplay(book);
  }

  removeBook(id) {
    this.data = this.data.filter((bookObj) => bookObj.id !== id);
    localStorage.setItem('library', JSON.stringify(this.data));
    window.location.reload();
  }

  updateDisplay(bookObj) {
    const bookList = document.getElementById('book-list');
    const book = document.createElement('LI');
    book.innerHTML = `Title: ${bookObj.title} <br> Author: ${bookObj.author}`;
    const deletetBtn = document.createElement('button');
    deletetBtn.innerHTML = 'Delete';
    deletetBtn.classList.add("button");
    deletetBtn.addEventListener('click', () => {
      this.removeBook(bookObj.id);
    });

    book.appendChild(deletetBtn);
    bookList.appendChild(book);
  }

  saver() {
    this.data.forEach((book) => {
      this.updateDisplay(book);
    });
  }
}

const library = new Library();

const addbtn = document.getElementById('add-btn');
addbtn.addEventListener('click', () => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const book = library.createBook(title.value, author.value);
  library.addBook(book);
  localStorage.setItem('library', JSON.stringify(library.data));
  title.value = '';
  author.value = '';
});

window.onload = () => {
  library.data = JSON.parse(localStorage.getItem('library' || '[]'));
  if (library.data === null) {
    library.data = [];
    return;
  }
  library.saver();
};
