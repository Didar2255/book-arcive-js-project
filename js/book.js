const searchButton = document.getElementById('search-button');
const inputField = document.getElementById('search-input')

const loadData = () => {
    searchButton.addEventListener('click', function () {
        const inputText = inputField.value;
        // clear input data
        inputField.value = '';
        const url = `http://openlibrary.org/search.json?q=${inputText}`
        fetch(url)
            .then(res => res.json())
            .then(data => getBook(data.docs))

    })

}
loadData()

const getBook = (books) => {
    // console.log(books)
    const displayBook = document.getElementById('book-contaner')
    //clear display result
    displayBook.textContent = '';
    //error control
    if (books.numFound === 0) {
        const errorMessage = document.getElementById('error')
        errorMessage.innerHTML = `
      <p>Enter vaild book name</p>
      `
    }

    books?.forEach(book => {
        console.log(book)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}.jpg" class="card-img-top" alt="...">
            <div class="card-body">
            <h4 class="card-title"> Book name : ${book.title}</h4>
            <h5>Author name : ${book.author_alternative_name}</h5>
            <h5>Publish date : ${book.publish_date}</h5>
            </div>
        </div>
        `
        displayBook.appendChild(div)
    })
}