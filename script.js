document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    // Generate initial user list
    generateUserList(userData, stocksData);

    // Attach save and delete button event listeners
    registerSaveAndDeleteEvents(userData, stocksData);
});

function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = ''; // Clear the previous list

    users.map(({ user, id }) => {
        const listItem = document.createElement('li');
        listItem.innerText = user.lastname + ', ' + user.firstname;
        listItem.setAttribute('id', id);
        userList.appendChild(listItem);
    });

    // Register the event listener on the list
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
}

function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find(user => user.id == userId); // Use "==" for type coercion

    if (user) {
        populateForm(user);
        renderPortfolio(user, stocks);
    }
}


function populateForm(data) {
    const { user, id } = data;
    const formFields = ['firstname', 'lastname', 'address', 'city', 'email'];
    const formValues = [user.firstname, user.lastname, user.address, user.city, user.email];

    document.querySelector('#userID').value = id;

    // Use a loop to populate fields
    formFields.forEach((field, index) => {
        document.querySelector(#${field}).value = formValues[index];
    });
}


function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = ''; // Clear the list from previous render

    portfolio.map(({ symbol, owned }) => {
        const symbolEl = document.createElement('p');
        const sharesEl = document.createElement('p');
        const actionEl = document.createElement('button');

        symbolEl.innerText = symbol;
        sharesEl.innerText = Owned: ${owned};
        actionEl.innerText = 'View';
        actionEl.setAttribute('id', symbol);

        portfolioDetails.appendChild(symbolEl);
        portfolioDetails.appendChild(sharesEl);
        portfolioDetails.appendChild(actionEl);
    });

    // Register event listener on the portfolio list
    portfolioDetails.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            viewStock(event.target.id, stocks);
        }
    });
}


function viewStock(symbol, stocks) {
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock) {
        document.querySelector('#stockName').textContent = stock.name;
        document.querySelector('#stockSector').textContent = stock.sector;
        document.querySelector('#stockIndustry').textContent = stock.subIndustry;
        document.querySelector('#stockAddress').textContent = stock.address;
        document.querySelector('#logo').src = logos/${symbol}.svg;
    }
}


function registerSaveAndDeleteEvents(users, stocks) {
    const saveButton = document.querySelector('#saveButton');
    const deleteButton = document.querySelector('#deleteButton');

    saveButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent form submission
        const id = document.querySelector('#userID').value;
        const index = users.findIndex(user => user.id == id);

        if (index !== -1) {
            const updatedUser = {
                ...users[index],
                user: {
                    firstname: document.querySelector('#firstname').value,
                    lastname: document.querySelector('#lastname').value,
                    address: document.querySelector('#address').value,
                    city: document.querySelector('#city').value,
                    email: document.querySelector('#email').value
                }
            };

            users.splice(index, 1, updatedUser); // Update the user data
            generateUserList(users, stocks); // Re-render the list
        }
    });

    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        const userId = document.querySelector('#userID').value;
        const index = users.findIndex(user => user.id == userId);

        if (index !== -1) {
            users.splice(index, 1); // Delete the user from the array
            generateUserList(users, stocks); // Re-render the list
        }
    });
}


const updatedUsers = users.map(user =>
    user.id == id ? { ...user, user: updatedUser } : user
);

generateUserList(updatedUsers, stocks);
