

const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
];


const data = {
    labels: labels,
    datasets: [
      
      {
        label: 'Deposit',
        backgroundColor: 'rgb(0, 100, 200)',
        borderColor: 'rgb(0, 100, 200)',
        data: [5, 5, 5, 1, 20, 5, 3],
        // stack: 'combined'
      },
      {
        label: 'Expense',
        backgroundColor: 'rgba(200, 0, 0,.5)',
        borderColor: 'rgb(200, 50, 0)',
        data: [5, 5, 5, 1, 20, 5, 3],
        // stack: 'combined'
      },
      {
        label: 'Balance',
        backgroundColor: 'rgba(50, 200, 100,.5)',
        borderColor: 'rgb(50, 200, 0)',
        data: [100, 50, 75, 100, 125,25],
        stack: 'combined',
        type: 'bar'
      }
  ]
};


// const config = {
//     type: 'line',
//     data: data,
//     options: {
//       interaction: {
//         intersect: false,
//         mode: 'index',
//       },
//  }
// };

const config = {
  type: 'line',
  data: data,
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Budget Concept with Balance Expense and Deposits'
      }
    },
    scales: {
      y: {
        stacked: true
      }
    }
  },
};

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );