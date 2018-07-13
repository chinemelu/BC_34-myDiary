
		  const formModal = document.getElementsByClassName('user-modal')[0],
				formLogin = formModal.querySelector('#cd-login'),
				formSignup = formModal.querySelector('#cd-signup'),
				showLoginPasswordField = document.getElementById('show-login-password'),
				showSignupPasswordField = document.getElementById('show-signup-password'),
				formForgotPassword = formModal.querySelector('#cd-reset-password'),
				formModalTab = document.getElementsByClassName('switcher'),
				tabLogin = formModalTab[0].childNodes[1].getElementsByTagName('a'),
				tabSignup = formModalTab[0].childNodes[3].getElementsByTagName('a'),
				forgotPasswordLink = formLogin.querySelector('.cd-form-bottom-message a'),
				backToLoginLink = formForgotPassword.querySelector('.cd-form-bottom-message a'),
				mainNav = document.getElementsByClassName('main-nav');		
				
				
		// show the selected form
		
		  mainNav[0].addEventListener('click', (event) => { 
			formModal.classList.add('is-visible');
			 if (event.target.matches('.cd-signup')) { 
				signupSelected();
			 } else if (event.target.matches('.cd-signin')) {
				loginSelected();
			 }
		  })
		  	
		
		const loginSelected = () => {
			formLogin.classList.add('is-selected');
			formSignup.classList.remove('is-selected');
			formForgotPassword.classList.remove('is-selected');
			tabLogin[0].classList.add('selected');
			tabSignup[0].classList.remove('selected');
		}
		
		const signupSelected = () => {
			formLogin.classList.remove('is-selected');
			formSignup.classList.add('is-selected');
			formForgotPassword.classList.remove('is-selected');
			tabLogin[0].classList.remove('selected');
			tabSignup[0].classList.add('selected');
		}
		
		// close modal when you click on the background
		
		formModal.addEventListener('click', (event) => {
			if (event.target.matches('.user-modal') || event.target.matches('.cd-close-form')) {
				formModal.classList.remove('is-visible');
			}
		})
		
		// close modal when clicking the esc keyboard button
		document.addEventListener('keyup', (event) => {
			if (event.which === 27 || event.code === 'Escape' || event.key === 'Escape') {
				formModal.classList.remove('is-visible');
			}
		})
		
		// switch from a tab to another
		
		formModalTab[0].addEventListener('click', event => {
			event.preventDefault();
			event.target.matches('#signin-switcher') ? loginSelected() : signupSelected(); 
		})
		
		// hide or show password
		   
			// showLoginPasswordField.addEventListener('click', (event) => {
				// passwordField = event.target;
				// console.log(passwordField);

					// passwordField.getAttribute('type') === 'null' ?
					// passwordField.setAttribute('type','text'):
					// passwordField.setAttribute('type','password')
				// });
		    // }
			
			showLoginPasswordField.addEventListener('click', () => {
				passwordField = showLoginPasswordField.previousElementSibling
					passwordField.getAttribute('type') === 'password' ?
					passwordField.setAttribute('type','text'):
					passwordField.setAttribute('type','password')
		    });
			
			showSignupPasswordField.addEventListener('click', () => {
				passwordField = showSignupPasswordField.previousElementSibling
					passwordField.getAttribute('type') === 'password' ?
					passwordField.setAttribute('type','text'):
					passwordField.setAttribute('type','password')
		    });
		
		
		// show forgot password form
		forgotPasswordLink.addEventListener('click', (event) => {
			event.preventDefault();
			forgottenPasswordSelected()
		});	
		
		const forgottenPasswordSelected = () => {
			formForgotPassword.classList.add('is-selected');
			formLogin.classList.remove('is-selected');
			formSignup.classList.remove('is-selected');
			formModalTab[0].classList.add('not-visible')
		}
		
		// back to login from the forgot-password-form
		backToLoginLink.addEventListener('click', (event) => {
			formModalTab[0].classList.remove('not-visible');
			loginSelected();
		});
			
		
	 
