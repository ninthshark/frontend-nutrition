const searchTerm = document.getElementById("search");
const submitBtn = document.querySelector("button");
const form = document.querySelector("form");
const resultList = document.querySelector(".list");
const itemDetail = document.querySelector(".item-detail");
const resultFound = document.querySelector(".total-results");

// pagination
const first = document.querySelector(".first");
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");
const last = document.querySelector(".last");
const currentPage = document.querySelector(".current-page");
const totalPage = document.querySelector(".total-page");

let localResult = [];
let page = 0;
let current_page = 1;
let items_per_page = 10;
let total_page = 0;
let last_page = 0;

function displayResult(data, items) {
  if (data.length > items) {
    data.slice(page, items).forEach((item) => {
      resultList.insertAdjacentHTML(
        "afterbegin",
        `<li class="item-detail" ><span onclick="getItemDetail('${item._id}')">${item.food_name}</span></li>`
      );
    });
  } else {
    data.forEach((item) => {
      resultList.insertAdjacentHTML(
        "afterbegin",
        `<li class="item-detail" ><span onclick="getItemDetail('${item._id}')">${item.food_name}</span></li>`
      );
    });
  }
  total_page = Math.ceil(data.length / items_per_page);
  totalPage.innerText = total_page;
}

const mainUrl = "http://localhost:3000/ingredients/";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  resultList.innerHTML = "";

  const text = searchTerm.value.trim();

  // if (text === "") return;

  const result = async () => {
    const response = await fetch(`${mainUrl}${text}`);
    const data = await response.json();
    data.reverse();

    localResult = [...data];
    console.log(localResult);

    resultFound.style.display = "block";
    resultFound.innerText = `Found: ${data.length}`;

    displayResult(localResult, 10);

    // data.forEach((item) => {
    //   resultList.insertAdjacentHTML(
    //     "afterbegin",
    //     `<li class="item-detail" ><span onclick="getItemDetail('${item._id}')">${item.food_name}</span></li>`
    //   );
    // });

    searchTerm.value = "";
    searchTerm.focus();
  };

  result();
});

function getItemDetail(id) {
  localStorage.getItem("itemdetail")
    ? localStorage.removeItem("itemdetail")
    : null;

  console.log(id);

  const url = `${mainUrl}item/${id}`;

  const detail = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    localStorage.setItem("itemdetail", JSON.stringify(data));
  };
  detail();
  setInterval(() => (window.location.href = "item-detail.html"), 700);
}

displayResult(localResult, 10);

next.addEventListener("click", () => {
  page === localResult.length - 10 ? (page = 0) : (page += 10);
  resultList.innerHTML = "";
  localResult.slice(page, page + 10).forEach((item) => {
    resultList.insertAdjacentHTML(
      "afterbegin",
      `<li class="item-detail" ><span onclick="getItemDetail('${item._id}')">${item.food_name}</span></li>`
    );
  });
  current_page += 1;
  console.log(current_page);
  currentPage.innerText = current_page;
  disabledBtn();
});

previous.addEventListener("click", () => {
  page === 0 ? (page = localResult.length - 10) : (page -= 10);
  resultList.innerHTML = "";

  localResult.slice(page, page + 10).forEach((item) => {
    resultList.insertAdjacentHTML(
      "afterbegin",
      `<li class="item-detail" ><span onclick="getItemDetail('${item._id}')">${item.food_name}</span></li>`
    );
  });
  current_page -= 1;
  console.log(current_page);
  currentPage.innerText = current_page;
  disabledBtn();
});

first.addEventListener("click", () => {
  page = 0;
  resultList.innerHTML = "";

  localResult.slice(page, page + 10).forEach((item) => {
    resultList.insertAdjacentHTML(
      "afterbegin",
      `<li class="item-detail" ><span onclick="getItemDetail('${item._id}')">${item.food_name}</span></li>`
    );
  });
  current_page = 1;
  console.log(current_page);
  currentPage.innerText = current_page;
  disabledBtn();
});

last.addEventListener("click", () => {
  page = localResult.length - 10;
  resultList.innerHTML = "";

  localResult.slice(page, page + 10).forEach((item) => {
    resultList.insertAdjacentHTML(
      "afterbegin",
      `<li class="item-detail" ><span onclick="getItemDetail('${item._id}')">${item.food_name}</span></li>`
    );
  });
  current_page = total_page;

  console.log(current_page);
  currentPage.innerText = current_page;
  disabledBtn();
});

function disabledBtn() {
  current_page === 1 ? (previous.disabled = true) : (previous.disabled = false);
  current_page === total_page
    ? (next.disabled = true)
    : (next.disabled = false);
}
