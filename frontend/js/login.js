// Use GSAP to create the fade-in animation
gsap.from('.bar', { opacity: 0, duration: 1, delay: 0.5, y: -50 });

const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(loginForm);
  const res = Object.fromEntries(formData);

  // Perform form validation
  const isEmptyField = Object.values(res).some((value) => value.trim() === '');
  if (isEmptyField) {
    console.log('Please fill in all fields');
    return; // Prevent further execution
  }

  // console.log(res);
  const data = JSON.stringify(res);
  //   console.log(data);

  fetch('http://localhost:8000/api/user/login', {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('name', res.name);
      localStorage.setItem('id', res.id);
      localStorage.setItem('email', res.email);
      if (res.email === localStorage.getItem('email')) {
        window.location.href = 'http://localhost:8080/html/home.html';
      }

      console.log(res.email === localStorage.getItem('email'));
    })
    .catch((error) => console.error('Error:', error));
});
