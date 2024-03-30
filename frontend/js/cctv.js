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

// opacity effect
// Function to gradually increase the opacity of the content
function fadeInContent() {
  var content = document.getElementById('cctv-content');
  content.style.opacity = 1;
}

// Call the function after the page has loaded
window.onload = function () {
  fadeInContent();
};

const usernameSpots = document.querySelectorAll('.username');
usernameSpots.forEach((el) => (el.textContent = localStorage.getItem('name')));
