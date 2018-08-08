const myEntriesNav = document.querySelector('.my-journal'),
  myEntriesSwitcher = document.querySelector('.anchor-lists');

const token = localStorage.getItem('token');
const myHeaders = new Headers({
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  token
});

const myEntriesHeader = {
  method: 'GET',
  mode: 'cors',
  headers: myHeaders
};

const getMyEntriesUrl = 'http://localhost:3000/api/v1/entries';

const getMyEntries = () => {
  fetch(getMyEntriesUrl, myEntriesHeader)
    .then(res => res.json())
    .then((entries) => {
      let entryView = '<table><tr class="border-bottom"><th>Date</th><th>Entry</th><th>Action</th></tr>';
      entries.data.map((entry) => {
        entryView += `<tr class='border-bottom'>
              <td>${entry.created_at}</td>
              <td>
                <div class="entry-title">
                <a href=fetchEntry.html?id=${entry.id}>${entry.title}</a>
                </div>
              </td>
              <td>
                <div class="actions">
                  <div class="edit-entry">
                    <i class="fa fa-edit"></i>
                  </div>
                  
                  <div class="delete-entry">
                    <i class="fa fa-times"></i>
                  </div>
                </div>
              </td>
            <tr>`;
      });
      document.getElementById('entry-list-data').innerHTML = entryView;
    })
    .catch(error => error);
};

myEntriesNav.addEventListener('click', getMyEntries);
myEntriesSwitcher.addEventListener('click', getMyEntries);
