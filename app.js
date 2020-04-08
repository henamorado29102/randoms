"use strict";

const DataStore = require("./DataStore");

const numberStore1 = new DataStore({ name: "numbers1" });
const calculateStore = new DataStore({ name: "calculate" });
let page = 1;
let page1 = 1;
const itemsPage = 10;
const itemsPage1 = 10;
let totalPage = Math.ceil(numberStore1.getTodos().todos.length / itemsPage);
let totalPage1 = Math.ceil(calculateStore.getTodos().todos.length / itemsPage);
drawData();
drawCalculateData()

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
  totalPage = Math.ceil(numberStore1.getTodos().todos.length / itemsPage);
  drawData();
});

document.getElementById("delete").addEventListener("click", function() {
  var opcion = confirm("Vas a Eliminar todos los registros. Estas seguro?");
  if (opcion == true) {
    numberStore1.deleteAll();
    drawData();
  }
});

document.getElementById("next").addEventListener("click", function() {
  if (page < totalPage) {
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

document.getElementById("go").addEventListener("click", function() {
  let p = document.getElementById("page").value;
  if (p > 0 && p <= totalPage) {
    page = p;
    drawData();
  }else{
    document.getElementById("page").value = page;
  }
});

document.getElementById("calculate").addEventListener("click", function() {
  const todos = numberStore1.getTodos().todos;
  let sum = 0;
  let moda = [];

  let sum_b = 0;
  let moda_b = [];

  todos.forEach(element => {
    element[0].forEach(cell => {
      sum += cell;
      moda[cell] = moda[cell] ? moda[cell] + 1 : 1;
    });
    element[1].forEach((cell, key) => {
      if (key < 2) {
        sum_b += cell;
        moda_b[cell] = moda_b[cell] ? moda_b[cell] + 1 : 1;
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

  maxNumber = 0;
  let keyNumber_b = 0;
  moda_b.forEach((element, key) => {
    if (element > maxNumber) {
      maxNumber = element;
      keyNumber_b = key;
    }
  });

  let media = Math.round(sum / (todos.length * 5));
  let media_b = Math.round(sum_b / (todos.length * 2));
  let f = new Date();
  calculateStore.addTodo([[
    media,
    keyNumber],
    [media_b,
    keyNumber_b,
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
  ]]);
  totalPage1 = Math.ceil(calculateStore.getTodos().todos.length / itemsPage);
  drawCalculateData();
});

document.getElementById("delete1").addEventListener("click", function() {
  var opcion = confirm("Vas a Eliminar todos los registros. Estas seguro?");
  if (opcion == true) {
    calculateStore.deleteAll();
    drawCalculateData();
  }
});

document.getElementById("next1").addEventListener("click", function() {
  if (page1 < totalPage1) {
    page1++;
    drawCalculateData();
  }
});

document.getElementById("preview1").addEventListener("click", function() {
  if (page1 > 1) {
    page1--;
    drawCalculateData();
  }
});

document.getElementById("go1").addEventListener("click", function() {
  let p = document.getElementById("page1").value;
  if (p > 0 && p <= totalPage1) {
    page1 = p;
    drawCalculateData();
  }else{
    document.getElementById("page1").value = page;
  }
});


function drawData() {
  document.getElementById("actualPage").innerText = page;
  document.getElementById("page").value = page;
  document.getElementById(
    "info"
  ).innerText = `Show ${page} of ${totalPage} Pages`;

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

function drawCalculateData(){
  document.getElementById("actualPage1").innerText = page1;
  document.getElementById("page1").value = page1;
  document.getElementById(
    "info1"
  ).innerText = `Show ${page1} of ${totalPage1} Pages`;

  const updatedTodos = calculateStore
    .getTodos()
    .todos.slice((page - 1) * itemsPage, (page - 1) * itemsPage + itemsPage);
  const calculate1 = document.getElementById("calculate1");
  const calculate2 = document.getElementById("calculate2");
  calculate1.innerHTML = "";
  calculate2.innerHTML = "";
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
    calculate1.appendChild(div1);

    const div2 = document.createElement("div");
    div2.className = "row";
    element[1].forEach((cell, key) => {
      let divCell1 = document.createElement("div");
      divCell1.innerHTML = cell;
      divCell1.className = key == 2 ? "cellDate" : "cell";
      divCell1.name = contador++;
      div2.appendChild(divCell1);
    });
    calculate2.appendChild(div2);
  });
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
