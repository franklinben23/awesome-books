let library = [];

function adder(){
  const book = {};
  book.title = document.getElementById('title').value;
  book.author = document.getElementById('author').value;
  return book
}

adder()