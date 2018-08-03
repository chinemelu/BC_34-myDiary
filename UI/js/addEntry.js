const title = document.getElementById('title-diary-entry'),
  titleErrorMessage = document.getElementById('title-error-message'),
  description = document.getElementById('description-diary-entry'),
  descriptionErrorMessage = document.getElementById('description-error-message'),
  // privacy = document.querySelector('privacy-diary-entry'),
  saveEntryBtn = document.querySelector('.save-diary-entry');


const postDiaryEntry = (e) => {
  e.preventDefault();
  const postDiaryEntryUrl = 'http://localhost:3000/api/v1/entries';
  const diaryEntryDetails = {
    title: title.value,
    description: description.value,
  };

const token = localStorage.getItem('token');
const myHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    token
});

  const fetchParameters = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(diaryEntryDetails),
    headers: myHeaders
  };

 
  fetch(postDiaryEntryUrl, fetchParameters)
    .then((res) => {
      return res.json();
    })
    .then((entry) => {
      if (entry.errors) {
        console.log("entry.errors", entry.errors)
        if (entry.errors.title) {
          titleErrorMessage.innerHTML = entry.errors.title;
        } else {
          titleErrorMessage.innerHTML = '';
        }
        if (entry.errors.description) {
          descriptionErrorMessage.innerHTML = entry.errors.description;
        } else {
          titleErrorMessage.innerHTML = '';
        }
      } else {
        window.location.href = 'postEntries.html';
      }
    })
    .catch((error) => {
      return error;
    });
};

saveEntryBtn.addEventListener('click', postDiaryEntry);
