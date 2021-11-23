let library = [];

function adder(){
  const book = {};
  book.title = document.getElementById('title').value;
  book.author = document.getElementById('author').value; 
  if (library.length > 0) {
    let lastItem = library[library.length - 1];
    let lastIndex = lastItem.id;
    book.id = lastIndex + 1;
  }
  else {
    book.id = 1
  }
  return book
}

function addBook(bookObj) {
  const bookList = document.getElementById('book-list')
  const book = document.createElement("LI");
  book.innerHTML = `Title: ${bookObj.title} <br> Author: ${bookObj.author}`;
  const deletetBtn = document.createElement('button');
  deletetBtn.innerHTML = "Delete";
  deletetBtn.addEventListener('click', () => {
    removeBook(bookObj.id);
  })

  book.appendChild(deletetBtn);
  bookList.appendChild(book);
}

let addbtn = document.getElementById('add-btn');
addbtn.addEventListener('click', () => {
  let book = adder();
  library.push(book);
  addBook(book);
  localStorage.setItem('library', JSON.stringify(library));
})

function saver () {
  library.forEach((book) => {
    addBook(book);
  })
}

window.onload = function(){
  library = JSON.parse(localStorage.getItem('library' || '[]'));
  if (library === null){
    library = [];
    return
  }

  saver();
}

function removeBook(id) {
  library = library.filter((bookObj) => bookObj.id !== id);
  localStorage.setItem('library', JSON.stringify(library));
  location.reload();
}