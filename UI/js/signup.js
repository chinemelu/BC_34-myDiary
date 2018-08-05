const username = document.getElementById('signup-username'),
  usernameErrorMessage = document.getElementById('signup-username-error'),
  email = document.getElementById('signup-email'),
  emailErrorMessage = document.getElementById('signup-email-error'),
  password = document.getElementById('signup-password'),
  passwordErrorMessage = document.getElementById('signup-password-error'),
  signupButton = document.querySelector('#signup-button');

const errors = {};

username.addEventListener('blur', () => {
  if (!username.value) {
    errors.username = 'Username is required';
    usernameErrorMessage.classList.add('is-visible');
    usernameErrorMessage.innerHTML = errors.username;
  } else if (username.value && username.value.length < 4 || username.value.length > 15) {
    errors.username = 'Username must contain between 4  - 15 characters';
    usernameErrorMessage.classList.add('is-visible');
    usernameErrorMessage.innerHTML = errors.username;
  } else if (!(/^[A-Za-z0-9]*$/).test(username.value)) {
    errors.username = 'Username should consist of only alphanumeric \n'
    + 'characters and must contain no spaces between characters';
    usernameErrorMessage.classList.add('is-visible');
    usernameErrorMessage.innerHTML = errors.username;
  } else {
    usernameErrorMessage.classList.remove('is-visible');
  }
});

email.addEventListener('blur', () => {
  if (!email.value) {
    errors.email = 'Email is required';
    emailErrorMessage.classList.add('is-visible');
    emailErrorMessage.innerHTML = errors.email;
  } else if (username.value
    && (!(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).test(email.value))) {
    errors.email = 'Email is invalid';
    emailErrorMessage.classList.add('is-visible');
    emailErrorMessage.innerHTML = errors.email;
  } else {
    emailErrorMessage.classList.remove('is-visible');
  }
});

password.addEventListener('blur', () => {
  if (!password.value) {
    errors.password = 'Password is required';
    passwordErrorMessage.classList.add('is-visible');
    passwordErrorMessage.innerHTML = errors.password;
  } else if (password.value && password.value.length < 8 || password.value.length > 20) {
    errors.password = 'Password must contain between 8  - 20 characters';
    passwordErrorMessage.classList.add('is-visible');
    passwordErrorMessage.innerHTML = errors.password;
  } else {
    passwordErrorMessage.classList.remove('is-visible');
  }
});

username.addEventListener('keypress', () => {
  usernameErrorMessage.classList.remove('is-visible');
});
email.addEventListener('keypress', () => {
  emailErrorMessage.classList.remove('is-visible');
});
password.addEventListener('keypress', () => {
  passwordErrorMessage.classList.remove('is-visible');
});

const registerUser = (e) => {
  e.preventDefault();
  const signupUrl = 'http://localhost:3000/api/v1/auth/signup';
  const registrationDetails = {
    username: username.value,
    email: email.value,
    password: password.value
  };
  const fetchParameters = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(registrationDetails),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    }
  };

 
  fetch(signupUrl, fetchParameters)
    .then((res) => {
      return res.json();
    })
    .then((user) => {
      if (user.errors) {
        if (user.errors.username) {
          usernameErrorMessage.innerHTML = user.errors.username;
          usernameErrorMessage.classList.add('is-visible');
        }
        if (user.errors.password) {
          passwordErrorMessage.innerHTML = user.errors.password;
          passwordErrorMessage.classList.add('is-visible');
        }
        if (user.errors.email) {
          emailErrorMessage.innerHTML = user.errors.email;
          emailErrorMessage.classList.add('is-visible');
        }
        if (user.errors.usernameExists) {
          usernameErrorMessage.innerHTML = user.errors.usernameExists;
          usernameErrorMessage.classList.add('is-visible');
        }
        if (user.errors.emailExists) {
          emailErrorMessage.innerHTML = user.errors.emailExists;
          emailErrorMessage.classList.add('is-visible');
        }
      } else {
        window.localStorage.setItem('token', user.token)
        window.location.href = 'postEntries.html';
      }
    })
    .catch((error) => {
      return error;
    });
};

signupButton.addEventListener('click', registerUser);

