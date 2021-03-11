const searchTerm = document.querySelector(".searchbar");
const submitBtn = document.querySelector("button");
const form = document.querySelector("form");
const resultList = document.querySelector(".list");
const itemDetail = document.querySelector(".item-detail");
const resultFound = document.querySelector(".total-results");

// pagination
const pagination = document.querySelector(".pagination");
const first = document.querySelector(".first");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const last = document.querySelector(".last");
const currentPage = document.querySelector(".current-page");
const totalPage = document.querySelector(".total-page");

let localResult = [];
let page = 0;
let current_page = 1;
let items_per_page = 15;
let total_page = 0;

function displayResult(data, items) {
  if (data.length > items) {
    data.slice(page, items).forEach((item) => {
      itemDisplay(item);
    });

    pagination.style.display = "flex";
  } else {
    data.forEach((item) => {
      itemDisplay(item);
    });
    pagination.style.display = "none";
  }
  currentPage.innerText = current_page;
  total_page = Math.ceil(data.length / items_per_page);
  totalPage.innerText = total_page;
}

const mainUrl =
  "https://ancient-lowlands-31543.herokuapp.com/api/json/v0.1/search/";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  resultList.innerHTML = "";
  current_page = 1;
  page = 0;

  const text = searchTerm.value.trim();

  const result = async () => {
    const response = await fetch(`${mainUrl}${text}`);
    const data = await response.json();
    data.reverse();

    // copy response locally
    localResult = [...data];

    resultList.innerHTML = "";
    resultFound.style.display = "block";
    resultFound.innerText = `About: ${data.length} results`;

    displayResult(localResult, items_per_page);

    searchTerm.focus();
  };
  resultList.innerHTML = `<div class="loader"></div>`;
  result();
  first.disabled = previous.disabled = true;
  last.disabled = next.disabled = false;
});

function getItemDetail(id) {
  localStorage.getItem("itemdetail")
    ? localStorage.removeItem("itemdetail")
    : null;

  const url = `${mainUrl}id/${id}`;

  const detail = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    localStorage.setItem("itemdetail", JSON.stringify(data));
  };
  detail();
  setInterval(() => {
    window.location.href = `item-detail.html`;
  }, 500);
}

next.addEventListener("click", () => {
  resultList.innerHTML = "";
  page += items_per_page;
  localResult.slice(page, page + items_per_page).forEach((item) => {
    itemDisplay(item);
  });
  current_page += 1;
  currentPage.innerText = current_page;

  if (current_page === total_page) {
    next.disabled = true;
    last.disabled = true;
  }
  first.disabled = false;
  previous.disabled = false;
});

first.addEventListener("click", () => {
  resultList.innerHTML = "";
  page = 0;
  localResult.slice(page, page + items_per_page).forEach((item) => {
    itemDisplay(item);
  });
  current_page = 1;
  currentPage.innerText = current_page;
  first.disabled = true;
  previous.disabled = true;
  next.disabled = false;
  last.disabled = false;
});

last.addEventListener("click", () => {
  resultList.innerHTML = "";
  page = localResult.length - (localResult.length % items_per_page);
  localResult.slice(page).forEach((item) => {
    itemDisplay(item);
  });
  current_page = total_page;
  currentPage.innerText = current_page;

  next.disabled = true;
  last.disabled = true;
  first.disabled = false;
  previous.disabled = false;
});

previous.addEventListener("click", () => {
  resultList.innerHTML = "";
  page -= items_per_page;
  localResult.slice(page, page + items_per_page).forEach((item) => {
    itemDisplay(item);
  });
  current_page -= 1;
  currentPage.innerText = current_page;

  if (current_page === 1) {
    first.disabled = true;
    previous.disabled = true;
  }

  next.disabled = false;
  last.disabled = false;
});

function itemDisplay(item) {
  resultList.insertAdjacentHTML(
    "afterbegin",
    `<div class="item-list">
    <li class="item-detail" ><span onclick="getItemDetail('${item._id}')">${item.food_name}</span></li>
    <div class="item-list-info">
    <span class="info-nutrient">Per 100g - Calories: ${item.energy_kcal}kcal | Fat: ${item.fat}g | Carbs: ${item.carbohydrate}g | Protein: ${item.protein}g</span>
    </div>
    </div>`
  );
}
