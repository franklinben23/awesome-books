let library = [];

function adder(){
  const book = {};
  book.title = document.getElementById('title').value;
  book.author = document.getElementById('author').value;
  return book
}

function addBook(bookObj) {
  const bookList = document.getElementById('book-list')
  const book = document.createElement("LI");
  book.innerHTML = `Title: ${bookObj.title} <br> Author: ${bookObj.author}`;
  bookList.appendChild(book)
}

let addbtn = document.getElementById('add-btn');
addbtn.addEventListener('click', () => {
  let book = adder();
  library.push(book);
  addBook(book)
  localStorage.setItem('library', JSON.stringify(library));
})

window.onload = function(){
  library = JSON.parse(localStorage.getItem('library' || '[]'));
  if (library === null){
    library = [];
    return
  }

  library.forEach((book) => {
    addBook(book);
  })
}