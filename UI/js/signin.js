const loginEmail = document.getElementById('signin-email'),
  emailSigninErrorMessage = document.getElementById('signin-email-error'),
  loginPassword = document.getElementById('signin-password'),
  passwordSigninErrorMessage = document.getElementById('signin-password-error'),
  formError = document.getElementById('form-error'),
  signinButton = document.querySelector('#signin-button');

const loginErrors = {};

loginEmail.addEventListener('blur', () => {
  if (!loginEmail.value) {
    loginErrors.email = 'Email is required';
    emailSigninErrorMessage.classList.add('is-visible');
    emailSigninErrorMessage.innerHTML = loginErrors.email;
  } else {
    emailSigninErrorMessage.classList.remove('is-visible');
  }
});

loginPassword.addEventListener('blur', () => {
  if (!loginPassword.value) {
    loginErrors.password = 'Password is required';
    passwordSigninErrorMessage.classList.add('is-visible');
    passwordSigninErrorMessage.innerHTML = loginErrors.password;
  } else {
    passwordSigninErrorMessage.classList.remove('is-visible');
  }
});

loginEmail.addEventListener('keypress', () => {
  emailSigninErrorMessage.classList.remove('is-visible');
});
loginPassword.addEventListener('keypress', () => {
  passwordSigninErrorMessage.classList.remove('is-visible');
});


const loginUser = (e) => {
  e.preventDefault();
  const loginUrl = 'http://localhost:3000/api/v1/auth/login';
  const loginDetails = {
    email: loginEmail.value,
    password: loginPassword.value
  };
  const fetchParameters = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(loginDetails),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    }
  };

 
  fetch(loginUrl, fetchParameters)
    .then((res) => {
      return res.json();
    })
    .then((user) => {
      if (user.errors) {
        if (user.errors.password) {
          passwordSigninErrorMessage.innerHTML = user.errors.password;
          passwordSigninErrorMessage.classList.add('is-visible');
        }
        if (user.errors.email) {
          emailSigninErrorMessage.innerHTML = user.errors.email;
          emailSigninErrorMessage.classList.add('is-visible');
        }
      } else if (user.error) {
        formError.innerHTML = user.error;
        formError.classList.add('is-visible');
      } else {
        window.localStorage.setItem('token', user.token)
        window.location.href = 'postEntries.html';
      }
    })
    .catch((error) => {
      return error;
    });
};

signinButton.addEventListener('click', loginUser);
