const apiUrl = "https://v1.slashapi.com/test-14/google-sheets/8zTaeLRAUN/Sheet1";
const itemsPerPage = 4;
let currentPage = 1;
let data = [];

// Function to fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const responseData = await response.json();
    data = responseData.data;
    renderCards();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Function to render cards with data from the API for the current page
function renderCards() {
  const container = document.querySelector(".cards");
  container.innerHTML = '';

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  currentData.forEach((item) => {
    const card = createCard(item);
    container.appendChild(card);
  });

  renderPagination(data.length);
}

// Function to render pagination buttons
function renderPagination(totalItems) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = '';

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    if (i === currentPage) {
      button.className = "active";
    }
    button.addEventListener("click", () => handlePaginationClick(i));
    paginationContainer.appendChild(button);
  }
}

// Function to handle pagination button click
function handlePaginationClick(page) {
  currentPage = page;
  renderCards();
}

// Function to create a card element
function createCard(dataItem) {
  const card = document.createElement("div");
  card.className = "card";

  const image = document.createElement("img");
  image.src = dataItem.imagesLink;
  card.appendChild(image);

  const cardContent = document.createElement("div");
  cardContent.className = "card-content";
  card.appendChild(cardContent);

  const title = document.createElement("div");
  title.className = "card-title";
  title.textContent = dataItem.title;
  cardContent.appendChild(title);

  const description = document.createElement("div");
  description.className = "card-description";
  description.textContent = `Type: ${dataItem.type}`;
  cardContent.appendChild(description);

  const actions = document.createElement("div");
  actions.className = "card-actions";
  
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => editItem(dataItem));
  actions.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteItem(dataItem));
  actions.appendChild(deleteButton);

  cardContent.appendChild(actions);

  return card;
}

// Function to edit an item
function editItem(item) {
  const titleInput = document.getElementById("title");
  const urlInput = document.getElementById("url");
  const typeInput = document.getElementById("type");
  titleInput.value = item.title;
  urlInput.value = item.url;
  typeInput.value = item.type;
}

// Function to delete an item
function deleteItem(item) {
  data = data.filter((dataItem) => dataItem !== item);
  renderCards();
}

// Function to add an item to the API and update the UI
async function addItem() {
  const title = document.getElementById("title").value;
  const url = document.getElementById("url").value;
  const type = document.getElementById("type").value;

  if (title && url && type) {
    try {
      const newItem = { title, url, type };
      data.push(newItem);
      await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
      renderCards();
      clearFormInputs();
    } catch (error) {
      console.error("Error adding item:", error);
      showErrorMessage("Error adding item. Please try again later.");
    }
  } else {
    showErrorMessage("Please fill in all fields.");
  }
}

function clearFormInputs() {
  document.getElementById("title").value = '';
  document.getElementById("url").value = '';
  document.getElementById("type").value = '';
}

function showErrorMessage(message) {
  const errorElement = document.querySelector(".error");
  errorElement.textContent = message;
}

// Call the function to render initial cards
fetchData();
