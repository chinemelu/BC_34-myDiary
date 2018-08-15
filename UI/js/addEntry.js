const title = document.getElementById('title-diary-entry'),
  titleErrorMessage = document.getElementById('title-error-message'),
  description = document.getElementById('description-diary-entry'),
  descriptionErrorMessage = document.getElementById('description-error-message'),
  // privacy = document.querySelector('privacy-diary-entry'),
  saveEntryBtn = document.querySelector('#save-diary-entry');


// reference (getURLParameter function)  - https://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript
const getURLParameter = (name) => {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
    .exec(window.location.search) || [null, ''])[1]
    .replace(/\+/g, '%20')) || null;
};
const getOneEntryToken = localStorage.getItem('token');
const myEntryHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  token: getOneEntryToken
});

const myEntryHeader = {
  method: 'GET',
  mode: 'cors',
  headers: myEntryHeaders
};

const entryId = getURLParameter('id');

if (entryId !== undefined && entryId !== null) {
  const getOneEntryUrl = `http://localhost:3000/api/v1/entries/${entryId}`;

  fetch(getOneEntryUrl, myEntryHeader)
    .then(res => res.json())
    .then((entry) => {
      let editEntryView = '';
      editEntryView += `
      <div class="image-upload-text">
        <p>Featured image  <input type="file" name="pic" accept="image/*"></p>
      </div>
      <div class="create-diary-entry">
        <span class="edit-entry-success-msg"></span>
        <span class="edit-entry-error-msg"></span>
        <input name="title" type="text" class="title-diary-entry" id="title-diary-entry-edit" value="${entry.data.title}" placeholder="Title">
        <span class="cd-error-message" id="title-error-message"></span>

        <textarea name="mytextarea" id="description-diary-entry-edit">${entry.data.description}</textarea>
        <span class="cd-error-message" id="description-error-message"></span>
        
        <div class="date-privacy">
          <div class="date-of-entry">
            <div class="date-label"><label>Date</label></div>
            <input name="input-date" class="date-of-entry"type="date">
          </div>
          
          <div class="privacy-options">
            <div class="privacy-label"><label>Privacy</label></div>
            <select id="privacy-diary-entry">
              <option class="option-menu">Please select</option>
              <option class="option-menu">Private</option>
              <option class="option-menu">Public</option>
            </select>
          </div>
        </div>
      </div>
      <form class="save-diary-entry">
        <input id="edit-diary-entry" value="Update">
      </form>`;

      document.getElementById('diary-entry-section').innerHTML = editEntryView;

      const editedTitle = document.getElementById('title-diary-entry-edit');
      const editedDescription = document.getElementById('description-diary-entry-edit');
      const editEntryBtn = document.getElementById('edit-diary-entry');

      const editDiaryEntry = () => {
        const editDiaryEntryUrl = `http://localhost:3000/api/v1/entries/${entryId}`;
        const editEntryDetails = {
          title: editedTitle.value,
          description: editedDescription.value
        };
        const editEntryHeader = {
          method: 'PUT',
          mode: 'cors',
          body: JSON.stringify(editEntryDetails),
          headers: myEntryHeaders
        };
        fetch(editDiaryEntryUrl, editEntryHeader)
          .then(res => res.json())
          .then((editedEntry) => {
            console.log("entry", editedEntry)
            if (editedEntry.errors) {
              if (editedEntry.errors.title) {
                document.getElementById('title-error-message').innerHTML = editedEntry.errors.title;
              } else {
                document.getElementById('title-error-message').innerHTML = '';
              }
              if (editedEntry.errors.description) {
                document.getElementById('description-error-message').innerHTML = editedEntry.errors.description;
              } else {
                document.getElementById('description-error-message').innerHTML = '';
              }
              if (editedEntry.errors.inputField) {
                document.querySelector('.edit-entry-error-msg').innerHTML = editedEntry.errors.inputField;
              }
            } else if (editedEntry.message === 'You can no longer update this diary entry') {
              document.querySelector('.edit-entry-error-msg').innerHTML = editedEntry.message;
            } else {
              document.querySelector('.edit-entry-error-msg').innerHTML = '';
              // window.location.href = 'postEntries.html';
              document.querySelector('.edit-entry-success-msg').innerHTML = 'You have successfully edited the entry';
            }
          })
          .catch(error => error);
      };
      editEntryBtn.addEventListener('click', editDiaryEntry);
    })
    .catch(error => error);
} else {
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
      .then(res => res.json())
      .then((entry) => {
        if (entry.errors) {
          if (entry.errors.title) {
            titleErrorMessage.innerHTML = entry.errors.title;
          } else {
            titleErrorMessage.innerHTML = '';
          }
          if (entry.errors.description) {
            descriptionErrorMessage.innerHTML = entry.errors.description;
          } else {
            descriptionErrorMessage.innerHTML = '';
          }
        } else {
          window.location.href = 'postEntries.html';
        }
      })
      .catch(error => error);
  };
  saveEntryBtn.addEventListener('click', postDiaryEntry);
}
