
//-- Array used to hold transaction data
export var transactions = [];
//-- Managing chart from chart.js using module from CDN -> https://cdn.jsdelivr.net/npm/chart.js@2.8.0
import {populateChart } from './chart.js';
import { get_TimePassed, get_DateFormatted, get_TimeFormatted } from './helpers.js';

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
});

function updateForm(results) {
  
  //-- update message saying missing info
  if(results == null){ 

    let messageBackground = 'var(--c-succ';
    let messageTitle = '';
    let message = '';

    if(document.querySelector("#t-name").value == ""){
      console.log("no description");
      messageTitle = "Warning:";
      messageBackground = "var(--c-warn)";
      message = "Must include a transaction description!";
    }
    
    if(document.querySelector("#t-amount").value == ""){
      messageTitle = "Warning:";
      messageBackground = "var(--c-warn)";
      message = message + " Must include an amount!";
    }

    document.querySelector("#message-title").textContent = messageTitle;
    document.querySelector("#message-results").textContent = message;
    return;
  }


  if(results.value > 0){ 
    //-- update with msg saying deposit
  }
  if(results.value < 0){ 
    //-- update with msg saying withdraw
  }

  document.querySelector("#t-name").value = "";
  document.querySelector("#t-amount").value = "";
  document.querySelector("#message-results").textContent = "";
  
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
    
    let transactionType;
    if(transaction.value > 0 ){ transactionType = 'Deposit' }
    if(transaction.value < 0 ){ transactionType = 'Withdraw' }
    if(transaction.value === 0 ){ transactionType = 'Note' }


    if(transaction.value > 0 ){ transaction.value = transaction.value }
    if(transaction.value < 0 ){ transactionType = 'Withdraw' }
    if(transaction.value === 0 ){ transactionType = 'Note' }

    // create and populate a table row
    let tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${get_DateFormatted(transaction.date)}</td>
      <td>${transaction.name}</td>
      <td>${transactionType}</td>
      <td>$ ${transaction.value}</td>
      <td>${get_TimeFormatted(transaction.date)}</td>
      <td>${get_TimePassed(transaction.date)}</td>
    `;

    tbody.appendChild(tr);
  });
}

function sendTransaction(isAdding) {
  let nameEl = document.querySelector("#t-name");
  let amountEl = document.querySelector("#t-amount");
  let errorEl = document.querySelector("#message-results");

  // validate form
  if (nameEl.value === "" || amountEl.value === "") {
    updateForm(null)
    return;
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
