document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value
    searchBooks(query)
});

function searchBooks(query) {
    const apiKey = 'AIzaSyBUxaXZahhKJphNWrXSk0ypvZP_HEjlq7w'
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results')
            resultsDiv.innerHTML = ''

            if (data.items) {
                data.items.forEach(item => {
                    const bookDiv = document.createElement('div')
                    bookDiv.classList.add('book')
//set photo
                    const thumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'https://via.placeholder.com/100x150'
                    const title = item.volumeInfo.title || 'Oops! No title available'
                    const authors = item.volumeInfo.authors ? item.volumeInfo.authors.join(', '): 'Oops! No authors available'

                    bookDiv.innerHTML = `
                        <img src="${thumbnail}" alt="${title}">
                        <div class="info">
                            <h3>${title}</h3>
                            <p>${authors}</p>
                        </div>`

                    resultsDiv.appendChild(bookDiv);
                })
            } else { resultsDiv.innerHTML = '<p>Oops! No results found.</p>'}
        })
        .catch(error => {
            console.error('Error fetching data:', error)
            document.getElementById('results').innerHTML = '<p>Oops! We could not fetch the data. Please try again in a moment.</p>'
        })
}



