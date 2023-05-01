parasails.registerPage('dashboard', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    xList: [],
    yList: [],
    formErrors:{}
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    this.xList = this.xList ? this.xList : [];
    this.yList = this.yList ? this.yList : []; 
  },

  mounted: async function() {
    
    const ctx = document.getElementById('myChart');
    const ctx2 = document.getElementById('myChart2');
    const ctx3 = document.getElementById('myChart3');
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: this.xList,
      datasets: [{
        label: 'Quantity in Kg',
        data: this.yList,
        borderWidth: 1,
        borderColor: '#EA00E0',
        backgroundColor: 'rgba(239, 207, 93, 0.587)'
        
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  });

  new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: this.xList,
      datasets: [{
        label: 'Quantity in Kg',
        data: this.yList,
        borderColor: '#F38FEE ',
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(230, 230, 250)',
          'rgb(255, 165, 0)',
          'rgb(255, 177, 109)',
          'rgb(165, 42, 42)',
          'rgb(128, 128, 128)',
          'rgb(127, 255, 212)',
          'rgb(0, 123, 167)',
        ],
        hoverOffset: 4,
      }]
    },
    options: {
      type: 'pie',
     
    }
  });


  new Chart(ctx3, {
    type:'bar',
    data: {
      labels: this.xList,
  datasets: [{
    label: 'Quantity in Kg',
    data: this.yList,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)',
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)',
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  })
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    

  }
});
