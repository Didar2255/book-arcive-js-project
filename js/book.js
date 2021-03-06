const searchButton = document.getElementById('search-button');
const inputField = document.getElementById('search-input')
const errorDiv = document.getElementById('error')

// fetch api data 

const loadData = () => {
    searchButton.addEventListener('click', function () {
        const inputText = inputField.value;
        // clear input data
        inputField.value = '';
        // error hendel
        if (inputText === '') {
            errorDiv.innerHTML = `<p class="bg-danger text-center p-3 m-3 fw-bold text-white rounded ">Please enter book name</p>`
        }
        else {
            document.getElementById('error').classList.add('d-none')
            document.getElementById('spinner').classList.remove('d-none')
            const url = `https://openlibrary.org/search.json?q=${inputText}`
            fetch(url)
                .then(res => res.json())
                .then(data => getBook(data.docs))
        }
    })

}
loadData()

// display result section
const getBook = (books) => {
    // erro control

    if (!books.length) {
        const error = document.getElementById('error');
        error.innerHTML = `<p class="bg-danger text-center p-3 m-3 fw-bold text-white rounded">No Result Found</p>`
        error.classList.remove('d-none')
    }
    else {
        // total get result
        const totalResult = document.getElementById('total-result')
        totalResult.innerText = `Total  ${books.length} Result found`

        const displayBook = document.getElementById('book-contaner')
        //clear display result
        displayBook.textContent = '';

        books.forEach(book => {
            const div = document.createElement('div')
            div.classList.add('col')
            const [firstAuthorName] = [book.author_name]
            div.innerHTML = `
    <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i : ''}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
        <h4 class="card-title">${book.title}</h4>
        <p><span class="fw-bold">Author : </span>${firstAuthorName}</p>
        <p><span class="fw-bold">Publish Year :</span> ${book.first_publish_year}</p>
        </div>
    </div>
    `
            displayBook.appendChild(div)
        })
    }
    document.getElementById('spinner').classList.add('d-none')
}