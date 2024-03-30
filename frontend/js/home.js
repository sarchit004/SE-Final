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

// for content
function showContent(contentId) {
  // Log the content ID to check if the function is being called
  console.log('Showing content:', contentId);

  // Hide all content sections
  const contentSections = document.querySelectorAll('.content');
  contentSections.forEach((section) => {
    section.classList.remove('active');
  });

  // Show the clicked content section
  const selectedContent = document.getElementById(contentId);
  if (selectedContent) {
    selectedContent.classList.add('active');
    // Log to verify if the selected content section is found
    console.log('Selected content:', selectedContent);
  } else {
    // Log an error if the content section is not found
    console.error('Content section not found:', contentId);
  }
}
// show home content by default

document.addEventListener('DOMContentLoaded', function () {
  // Show the home content section by default
  showContent('home-content');
});

// =============================================================================================
document.addEventListener('DOMContentLoaded', function () {
  // Get all toggle buttons in the document
  const toggleButtons = document.querySelectorAll("input[type='checkbox']");

  // Add event listener for change event on each toggle button
  toggleButtons.forEach(function (toggleButton) {
    toggleButton.addEventListener('change', function (event) {
      // Get the closest parent template div
      const templateDiv = event.target.closest('.templates');

      // Get the paragraph with class "temp-current" inside the template div
      const tempCurrent = templateDiv.querySelector('.temp-current');

      // Check if the toggle button is checked (on) or not checked (off)
      if (event.target.checked) {
        // If the toggle button is checked (on), update the text content to 'On'
        tempCurrent.textContent = 'On';
      } else {
        // If the toggle button is not checked (off), update the text content to 'Off'
        tempCurrent.textContent = 'Off';
      }
    });
  });
});
// for toggle button
document.addEventListener('DOMContentLoaded', function () {
  // Get all toggle buttons and text elements
  const checkboxes = document.querySelectorAll('.switch input');
  const textElements = document.querySelectorAll(
    '.temp-current-temp, .temp-current-air, .temp-current-lights, .temp-current-thermo'
  );

  // Add event listener for change event on each toggle button
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', function () {
      // Update the text content of the corresponding text element
      const parentTemplate = this.closest(
        '.temperature-template, .air-conditioner-template, .lights-template, .thermostat'
      );
      const textElement = parentTemplate.querySelector(
        '.temp-current-temp, .temp-current-air, .temp-current-lights, .temp-current-thermo'
      );
      textElement.textContent = this.checked ? 'On' : 'Off';
    });
  });
});

// for water tank
document.addEventListener('DOMContentLoaded', function () {
  const waterTankSelect = document.getElementById('water-tank');
  const waterTankText = document.querySelector(
    '.water-level-template p:last-child'
  );

  waterTankSelect.addEventListener('change', function () {
    const selectedOption = waterTankSelect.value;
    switch (selectedOption) {
      case 'empty':
        waterTankText.textContent = 'Water empty';
        break;
      case 'half-full':
        waterTankText.textContent = 'Water half full';
        break;
      case 'full':
        waterTankText.textContent = 'Water full';
        break;
      default:
        break;
    }
  });
});

// for toggle button
document.addEventListener('DOMContentLoaded', function () {
  // Set initial state of main switch to on
  const mainSwitch = document.querySelector('.custom-switch-fridge');
  mainSwitch.checked = true;

  // Initialize main switch status text
  const mainSwitchStatus = document.querySelector('.main-switch-status');
  mainSwitchStatus.textContent = 'On';

  // Initialize all the light status elements based on the main switch state
  const lightStatuses = document.querySelectorAll('.light-status');
  lightStatuses.forEach(function (lightStatus) {
    lightStatus.textContent = 'On';
  });

  // Initialize all the unique switches based on the main switch state
  const uniqueSwitches = document.querySelectorAll('.unique-switch input');
  uniqueSwitches.forEach(function (uniqueSwitch) {
    uniqueSwitch.checked = true;
  });

  // Get the main control element
  const mainControl = document.querySelector('.main-control');

  // Add event listener for change event on the main control element
  mainControl.addEventListener('change', function (event) {
    // Check if the target of the event is the main switch toggle input
    if (event.target.matches('.custom-switch-fridge')) {
      const isOn = event.target.checked;
      // Update main switch state and synchronize lights
      updateMainSwitchState(isOn);
    }
  });

  // Add event listener for change event on each unique switch
  uniqueSwitches.forEach(function (uniqueSwitch) {
    uniqueSwitch.addEventListener('change', function (event) {
      // Get the light status element next to the unique switch
      const lightStatus = event.target
        .closest('.all-room')
        .querySelector('.light-status');
      // Update light status based on unique switch state
      lightStatus.textContent = event.target.checked ? 'On' : 'Off';
    });
  });

  // Function to update main switch state and synchronize lights
  function updateMainSwitchState(isOn) {
    // Update main switch status text
    const mainSwitchStatus = document.querySelector('.main-switch-status');
    mainSwitchStatus.textContent = isOn ? 'On' : 'Off';

    // Update all the light status elements based on the main switch state
    const lightStatuses = document.querySelectorAll('.light-status');
    lightStatuses.forEach(function (lightStatus) {
      lightStatus.textContent = isOn ? 'On' : 'Off';
    });

    // Update all the unique switches based on the main switch state
    uniqueSwitches.forEach(function (uniqueSwitch) {
      uniqueSwitch.checked = isOn;
    });
  }
});

// for effect

const fadeInContent = document.querySelector('.content');

// Use GSAP to create the fade-in animation
gsap.to(fadeInContent, {
  opacity: 1,
  duration: 1,
  delay: 0.5,
});

const handleLogout = () => {
  localStorage.removeItem('id');
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  window.location.href = 'http://localhost:8080/html/login.html';
};

const usernameSpots = document.querySelectorAll('.username');
usernameSpots.forEach((el) => (el.textContent = localStorage.getItem('name')));

// for door status 

// Add click event listener to each door status element
document.querySelectorAll('.door-status').forEach(function(doorStatusElement) {
  // Add click event listener to each door status element
  doorStatusElement.addEventListener('click', function(event) {
      // Check if the clicked door status element belongs to main door, hallway door, or garage door
      if (doorStatusElement.classList.contains('main-door-status') ||
          doorStatusElement.classList.contains('hallway-door-status') ||
          doorStatusElement.classList.contains('garage-door-status')) {
          // Toggle the text content of the clicked door status element
          doorStatusElement.textContent = doorStatusElement.textContent.trim() === 'Closed' ? 'Open' : 'Closed';
          // Show notification message based on the door status
          var doorName = doorStatusElement.dataset.alertMessage;
          var doorStatus = doorStatusElement.textContent.trim();
          var notificationMessage = doorName + ' ' + (doorStatus === 'Open' ? 'Opened' : 'Closed');
          // Create a new div element for the notification message
          var notificationDiv = document.createElement('div');
          notificationDiv.textContent = notificationMessage;
          // Append the new notification message to the userinfo-notification element
          document.querySelector('.userinfo-notification').appendChild(notificationDiv);
      }
  });
});


// water tank notifictaion 
document.addEventListener('DOMContentLoaded', function () {
  const waterTankSelect = document.getElementById('water-tank');
  const waterTankText = document.querySelector('.water-level-template p:last-child');
  const notificationContainer = document.querySelector('.userinfo-notification');

  waterTankSelect.addEventListener('change', function () {
    const selectedOption = waterTankSelect.value;
    let notificationMessage = '';

    switch (selectedOption) {
      case 'empty':
        notificationMessage = 'Water tank is empty';
        break;
      case 'half-full':
        notificationMessage = 'Water tank is half full';
        break;
      case 'full':
        notificationMessage = 'Water tank is full';
        break;
      default:
        break;
    }

    // Display notification message
    const notification = document.createElement('div');
    notification.classList.add('notification-item');
    notification.textContent = notificationMessage;
    notificationContainer.appendChild(notification);

    // Scroll to bottom
    notificationContainer.scrollTop = notificationContainer.scrollHeight;
  });
});
// thermostat notifictaion 
document.addEventListener('DOMContentLoaded', function () {
  const thermostatSwitch = document.querySelector('.thermostat input[type="checkbox"]');
  const thermostatText = document.querySelector('.thermostat .temp-current-thermo');
  const notificationContainer = document.querySelector('.userinfo-notification');

  thermostatSwitch.addEventListener('change', function () {
    if (thermostatSwitch.checked) {
      thermostatText.textContent = 'On';
      // Display notification message when thermostat is turned on
      const notification = document.createElement('div');
      notification.classList.add('notification-item');
      notification.textContent = 'Thermostat is turned on';
      notificationContainer.appendChild(notification);
    } else {
      thermostatText.textContent = 'Off';
      // Display notification message when thermostat is turned off
      const notification = document.createElement('div');
      notification.classList.add('notification-item');
      notification.textContent = 'Thermostat is turned off';
      notificationContainer.appendChild(notification);
    }

    // Scroll to bottom
    notificationContainer.scrollTop = notificationContainer.scrollHeight;
  });
});
