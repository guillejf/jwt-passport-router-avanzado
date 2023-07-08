const API_URL = 'http://localhost:3000';
function handleLogIn() {
  fetch(API_URL + '/jwt-login', {
    method: 'POST',
    body: JSON.stringify({ email: 'pepe@pepe.com', password: '123' }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((json) => {
      alert(JSON.stringify(json.payload));
      console.log(json.payload);
      localStorage.setItem('token', json.payload);
    });
}

function handleFetchProfile() {
  fetch(API_URL + '/jwt-profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })
    .then((res) => res.json())
    .then((json) => {
      alert(JSON.stringify(json.payload));
      console.log(json);
    });
}
