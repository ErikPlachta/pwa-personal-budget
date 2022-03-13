
//-- Array used to hold transaction data
export var transactions = [];
//-- Managing chart from chart.js using module from CDN -> https://cdn.jsdelivr.net/npm/chart.js@2.8.0
import {populateChart } from './chart.js';
import { get_TimePassed, get_DateTimeFormatted } from './helpers.js';

//-- manage updating UI
function updateUI(){
  // re-run logic to populate ui with new record
  populateChart();
  populateTable();
  populateTotal();
}

//-- Getting transaction data to pupulate ui
fetch("/api/transaction")
  .then(response => { return response.json(); })
  .then(data => {
    // save db data on global variable
    transactions = data;
    //-- fill data in UI based on results
    updateUI();
    // populateTotal();
    // populateTable();
    // populateChart();
});

function updateForm(results) {
  
  if(results.value > 0){
    console.log(results.value)
  }
  
  // let nameEl = document.querySelector("#t-name");
  // let amountEl = document.querySelector("#t-amount");
  // let errorEl = document.querySelector(".form .error");
  // clear form
  document.querySelector("#t-name").value = "";
  document.querySelector("#t-amount").value = "";
  document.querySelector(".form .error").value = "";
  
}

function populateTotal() {
  // reduce transaction amounts to a single total value
  let total = transactions.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);

  let totalEl = document.querySelector("#total");
  totalEl.textContent = total;
}

function populateTable() {
  let tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";

  transactions.forEach(transaction => {
    // create and populate a table row
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${transaction.name}</td>
      <td>${transaction.value}</td>
      <td>${get_DateTimeFormatted(transaction.date)}</td>
      <td>${get_TimePassed(transaction.date)}</td>
    `;

    tbody.appendChild(tr);
  });
}

function sendTransaction(isAdding) {
  let nameEl = document.querySelector("#t-name");
  let amountEl = document.querySelector("#t-amount");
  let errorEl = document.querySelector(".form .error");

  // validate form
  if (nameEl.value === "" || amountEl.value === "") {
    errorEl.textContent = "Missing Information";
    return;
  }
  else {
    errorEl.textContent = "";
  }

  // create record
  let transaction = {
    name: nameEl.value,
    value: amountEl.value,
    date: new Date().toISOString()
  };

  // if subtracting funds, convert amount to negative number
  if (!isAdding) {
    //-- gaurntees it's negative number coming in no matter what's in UI
    transaction.value = -Math.abs(transaction.value);
  }

  // add to beginning of current array of data
  transactions.unshift(transaction);
  
  
  //-- add update to UI
  updateUI();

  //-- Send to server
  fetch("/api/transaction", {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  })
  .then(response => {    
    return response.json();
  })
  .then(data => {
    if (data.errors) {
      errorEl.textContent = "Missing Information";
    }
    else {
      // clear form
      updateForm(data);
    }
  })
  .catch(err => {
    // fetch failed, so save in indexed db
    saveRecord(transaction);
    // clear form
    updateForm(err);
  });
}

document.querySelector("#add-btn").onclick = function() {
  sendTransaction(true);
};

document.querySelector("#sub-btn").onclick = function() {
  sendTransaction(false);
};
