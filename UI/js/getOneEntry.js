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
const getOneEntryUrl = `http://localhost:3000/api/v1/entries/${entryId}`;

const options = {
  weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
};
fetch(getOneEntryUrl, myEntryHeader)
  .then(res => res.json())
  .then((entry) => {
    let singleEntryView = '';
    singleEntryView += `<img src="images/serenity-prayer10.jpg" class="entry-picture">
        <h1>${entry.data.title}</h1>
        <p class="entry-date"><i class="fa fa-calendar"></i> ${new Date(entry.data.created_at).toLocaleString('en-US', options)}</p>
        <div class="diary-body">
          <p>${entry.data.description}</p>
        </div>
        <div class="user-details">
          <div class="user-photo">
            <img src='images/christopher-turner.jpeg' alt='christopher turner'>
          </div>
          <p class="user-name">Christopher Turner</p>
          <p class="about-user">Feel free to ask since I hate talking about myself</p>
        </div>
      </div>`;
    document.querySelector('.entry-details-container').innerHTML = singleEntryView;
  })
  .catch(error => error);
