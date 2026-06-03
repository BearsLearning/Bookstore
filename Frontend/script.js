const API_URL = 'http://localhost:3000/books';
const IMAGE_URL = 'http://localhost:3000/images';

loadBooks();

function loadBooks() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data=>{  
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';
    data.forEach(book => {
        bookList.innerHTML += `
        <div class="book-card">
            <img src="${IMAGE_URL}/${book.image}" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Category: ${book.category}</p>
            <p>$${book.price}</p>
            <button
                class="delete-btn"
                onclick="deleteBook(${book.id})">Delete
            </button>
        </div>
        `;
    });
});}

function addBook() {
    const formData = new FormData();
    formData.append('title', document.getElementById('title').value);
    formData.append('author', document.getElementById('author').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('price', parseFloat(document.getElementById('price').value));

    const fileInput = document.getElementById('imageFile');
    if (fileInput && fileInput.files.length > 0) {
        formData.append('image', fileInput.files[0]);
    }

    fetch(API_URL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('category').value = '';
        document.getElementById('price').value = '';
        if (fileInput) fileInput.value = '';
        loadBooks();
    });
};

function deleteBook(id) {
    fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        loadBooks();
    });
};

function searchBooks() {
    const keyword = document.getElementById("search").value.trim();
    if (!keyword) {
        loadBooks();
        return;
    }
    fetch(`${API_URL}/search/${encodeURIComponent(keyword)}`).then(response => response.json())
    .then(data => {
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = '';
        data.forEach(book => {
            bookList.innerHTML += `
            <div class="book-card">
                <img src="${IMAGE_URL}/${book.image}" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Category: ${book.category}</p>
                <p>$${book.price}</p>
            </div>
            `;
        });
    });
};