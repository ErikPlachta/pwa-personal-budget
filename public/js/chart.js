let myChart;

import {transactions} from './index.js';

export function populateChart() {
  // copy array and reverse it
  let reversed = transactions.slice().reverse();
  let sum = 0;

  // create date labels for chart
  let labels = reversed.map(t => {
    let date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });

  // create incremental values for chart
  let data = reversed.map(t => {
    sum += parseInt(t.value);
    return sum;
  });

  // remove old chart if it exists
  if (myChart) {
    myChart.destroy();
  }

  let ctx = document.getElementById("myChart").getContext("2d");

  myChart = new Chart(ctx, {
    type: 'line',
      data: {
        labels,
        datasets: [{
            label: "Balance",
            fill: true,
            backgroundColor: "rgba(10,200,10,.5)",
            data
        }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
          yAxes: [
            {
              stacked: true,
              gridLines: {
                display: true,
                color: "rgba(0,0,0,1)"
              },
              ticks: {
                suggestedMax: 1000,
                suggestedMin: -1000,
                callback: function(value, index, ticks) {
                    return '$ ' + value;
                }

              }
            }
            ],
        }
      }
    
  });
}
