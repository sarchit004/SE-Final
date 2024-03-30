console.log('Registration');

const form = document.querySelector('.contactForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const res = Object.fromEntries(formData);

  // Perform form validation
  const isEmptyField = Object.values(res).some((value) => value.trim() === '');
  if (isEmptyField) {
    console.log('Please fill in all fields');
    return; // Prevent further execution
  }

  // console.log(res);
  const data = JSON.stringify(res);

  fetch('http://localhost:8000/api/user/request', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((error) => console.error('Error:', error));
});
