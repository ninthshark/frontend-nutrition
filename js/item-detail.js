const itemdetail = JSON.parse(localStorage.getItem("itemdetail"));
const table = document.querySelector("table");
const foodName = document.querySelector(".food_name");
foodName.innerText = `${itemdetail.food_name}`;

const html = `
      <tr>
      <td>Protein</td>
      <td>${itemdetail.protein}<span class="unit">g</span></td>
    </tr>
    <tr>
      <td>Carbohydrate</td>
      <td>${itemdetail.carbohydrate}<span class="unit">g</span></td>
    </tr>
    <tr>
      <td>&emsp;Of Which Sugars</td>
      <td>${itemdetail.sugars}<span class="unit">g</span></td>
    </tr>
    <tr>
      <td>Energy (kcal)</td>
      <td>${itemdetail.energy_kcal}</td>
    </tr>
    <tr>
      <td>Fat</td>
      <td>${itemdetail.fat}<span class="unit">g</span></td>
    </tr>
    <tr>
      <td>Saturates</td>
      <td>${itemdetail.saturated_fat}<span class="unit">g</span></td>
    </tr>
    <tr>
      <td>Fibre</td>
      <td>${itemdetail.fibre}<span class="unit">g</span></td>
    </tr>
    <tr>
      <td>Sodium</td>
      <td>${itemdetail.sodium}<span class="unit">mg</span></td>
    </tr>
      `;
table.insertAdjacentHTML("beforeend", html);
