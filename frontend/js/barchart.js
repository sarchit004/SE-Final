// barchart.js
function changeProfile(profileName) {
  var profileImage = document.getElementById('profileImage');
  switch (profileName) {
    case 'jessica':
      profileImage.src = '../images/jessica.png';
      break;
    case 'mom':
      profileImage.src = '../images/mom.png';
      break;
    case 'dad':
      profileImage.src = '../images/dad.png';
      break;
    case 'son':
      profileImage.src = '../images/son.png';
      break;
    case 'daughter':
      profileImage.src = '../images/daughter.png';
      break;
    default:
      profileImage.src = '../images/default.png';
      break;
  }
}

// for pop-up
function toggleMenuSettings() {
  var subMenuSettings = document.getElementById('subMenu-settings');
  subMenuSettings.classList.toggle('open-menu');
}

function toggleMenuNotification() {
  var subMenuNotification = document.getElementById('subMenu-notification');
  subMenuNotification.classList.toggle('open-menu');
}

// closing window with clicking away
document.addEventListener('click', function (event) {
  var subMenuSettings = document.getElementById('subMenu-settings');
  var subMenuNotification = document.getElementById('subMenu-notification');
  var isClickInsideSettings = document
    .getElementById('settings-button')
    .contains(event.target);
  var isClickInsideNotification = document
    .getElementById('notification-icon')
    .contains(event.target);

  if (!isClickInsideSettings && !isClickInsideNotification) {
    subMenuSettings.classList.remove('open-menu');
    subMenuNotification.classList.remove('open-menu');
  }
});

// create a line chart
function createLineChart() {
  // Get the canvas element
  var ctx = document.getElementById('lineChart').getContext('2d');

  // Create the line chart
  var lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Energy Saved (kWh)',
          data: [30, 35, 40, 45, 50, 55, 60], // Data adjusted to start from 30
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true, // Start from 30
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          title: {
            display: true,
            text: 'Energy Saved (kWh)',
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
          ticks: {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          title: {
            display: true,
            text: 'Month',
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
      },
    },
  });

  return lineChart;
}

// Initialize the line chart
var lineChart = createLineChart();

const usernameSpots = document.querySelectorAll('.username');
usernameSpots.forEach((el) => (el.textContent = localStorage.getItem('name')));
