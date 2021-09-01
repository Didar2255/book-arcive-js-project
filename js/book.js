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
    books.forEach(book => {
        console.log(book)
    })
}