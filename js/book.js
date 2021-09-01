const searchButton = document.getElementById('search-button');
const inputField = document.getElementById('search-input')
const errorDiv = document.getElementById('error')

const loadData = () => {
    searchButton.addEventListener('click', function () {
        const inputText = inputField.value;
        // clear input data
        inputField.value = '';
        if (inputText === '') {
            errorDiv.innerHTML = `<p class="bg-danger text-center p-3 m-3 fw-bold text-white rounded">No Result Found</p>`

        }
        else {
            document.getElementById('error').classList.add('d-none')
            const url = `http://openlibrary.org/search.json?q=${inputText}`

            fetch(url)
                .then(res => res.json())
                .then(data => getBook(data.docs))
        }
    })

}
loadData()

const getBook = (books) => {
    // total get result
    const totalResult = document.getElementById('total-result')
    totalResult.innerText = `Total  ${books.length} Result found`

    const displayBook = document.getElementById('book-contaner')
    //clear display result
    displayBook.textContent = '';

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