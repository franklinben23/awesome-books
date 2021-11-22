let library = [];

function adder(){
  const book = {};
  book.title = document.getElementById('title').value;
  book.author = document.getElementById('author').value;
  library.push(book);
}

function addBook(bookObj) {
  const bookList = document.getElementById('book-list')
  const book = document.createElement("LI");
  book.innerHTML = bookObj.title
  bookList.appendChild(book)
}