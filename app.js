"use strict";

const DataStore = require("./DataStore");

const numberStore1 = new DataStore({ name: "numbers1" });
const calculate = new DataStore({ name: "calculate" });
let page = 1;
const itemsPage = 10;
let totalPage = 0;

drawData();

// create add todo window button
document.getElementById("generate").addEventListener("click", function() {
  const n1 = [];
  const n2 = [];

  n1.push(getRandomArbitrary(1, 51));
  n1.push(getRandomArbitrary(1, 51));
  n1.push(getRandomArbitrary(1, 51));
  n1.push(getRandomArbitrary(1, 51));
  n1.push(getRandomArbitrary(1, 51));
  n2.push(getRandomArbitrary(1, 13));
  n2.push(getRandomArbitrary(1, 13));
  let f = new Date();
  n2.push(
    f.getDate() +
      "/" +
      (f.getMonth() + 1) +
      "/" +
      f.getFullYear() +
      " " +
      f.getHours() +
      ":" +
      f.getMinutes() +
      ":" +
      f.getSeconds()
  );

  numberStore1.addTodo([n1, n2]);
  drawData();
});

document.getElementById("delete").addEventListener("click", function() {
  numberStore1.deleteAll();
  drawData();
});

document.getElementById("next").addEventListener("click", function() {
  if (page < Math.ceil(numberStore1.store.todos.length / itemsPage)) {
    page++;
    drawData();
  }
});

document.getElementById("preview").addEventListener("click", function() {
  if (page > 1) {
    page--;
    drawData();
  }
});

document.getElementById("calculate").addEventListener("click", function() {
  const todos = numberStore1.getTodos().todos;
  let sum = 0;
  let moda = [];
  todos.forEach(element => {
    element[0].forEach(cell => {
      sum += cell;
      moda[cell] = moda[cell] ? moda[cell] + 1 : 1;
    });
    element[1].forEach((cell, key) => {
      if (key < 2) {
        sum += cell;
        moda[cell] = moda[cell] ? moda[cell] + 1 : 1;
      }
    });
  });

  let maxNumber = 0;
  let keyNumber = 0;
  moda.forEach((element, key) => {
    if (element > maxNumber) {
      maxNumber = element;
      keyNumber = key;
    }
  });
  let media = sum / (todos.length * 7);
  let f = new Date();
  calculate.addTodo([
    media,
    keyNumber,
    f.getDate() +
      "/" +
      (f.getMonth() + 1) +
      "/" +
      f.getFullYear() +
      " " +
      f.getHours() +
      ":" +
      f.getMinutes() +
      ":" +
      f.getSeconds()
  ]);

  document.getElementById("media").innerText = `Media: ${media}`;
  document.getElementById("moda").innerText = `Moda: ${keyNumber}`;
});

function drawData() {
  totalPage = Math.ceil(numberStore1.getTodos().todos.length / itemsPage);
  document.getElementById("actualPage").innerText = page;
  document.getElementById("info").innerText = `Show ${page} of ${totalPage}`;

  const updatedTodos = numberStore1
    .getTodos()
    .todos.slice((page - 1) * itemsPage, (page - 1) * itemsPage + itemsPage);
  const numbers1 = document.getElementById("numbers1");
  const numbers2 = document.getElementById("numbers2");
  numbers1.innerHTML = "";
  numbers2.innerHTML = "";
  let contador = 1;

  updatedTodos.forEach(element => {
    const div1 = document.createElement("div");
    div1.className = "row";
    element[0].forEach(cell => {
      let divCell1 = document.createElement("div");
      divCell1.innerHTML = cell;
      divCell1.className = "cell";
      divCell1.name = contador++;
      div1.appendChild(divCell1);
    });
    numbers1.appendChild(div1);

    const div2 = document.createElement("div");
    div2.className = "row";
    element[1].forEach((cell, key) => {
      let divCell1 = document.createElement("div");
      divCell1.innerHTML = cell;
      divCell1.className = key == 2 ? "cellDate" : "cell";
      divCell1.name = contador++;
      div2.appendChild(divCell1);
    });
    numbers2.appendChild(div2);
  });
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
