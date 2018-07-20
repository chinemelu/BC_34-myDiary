
const writeSwitcherButton = document.getElementsByClassName('anchor-write')[0],
  listsSwitcherButton = document.getElementsByClassName('anchor-lists')[0],
  diaryEntrySection = document.getElementById('diary-entry-section'),
  entryListSection = document.getElementById('entry-list-section'),
  switcherSection = document.getElementsByClassName('switcher-diary-entry')[0],
  addEntry = document.getElementsByClassName('add-entry')[0],
  myJournal = document.getElementsByClassName('my-journal')[0];

const diaryEntrySelected = () => {
  switcherSection.classList.remove('lists-selected');
  writeSwitcherButton.classList.add('selected');
  writeSwitcherButton.classList.remove('un-selected');
  listsSwitcherButton.classList.remove('selected');
  listsSwitcherButton.classList.add('un-selected');
  diaryEntrySection.classList.remove('not-selected');
  diaryEntrySection.classList.add('is-selected');
  entryListSection.classList.remove('is-selected');
  entryListSection.classList.add('not-selected');
};

const entryListSelected = () => {
  // listSwitcherButton.classList.remove('selected');
  listsSwitcherButton.classList.add('selected');
  listsSwitcherButton.classList.remove('un-selected');
  writeSwitcherButton.classList.remove('selected');
  writeSwitcherButton.classList.add('un-selected');
  diaryEntrySection.classList.add('not-selected');
  diaryEntrySection.classList.remove('is-selected');
  entryListSection.classList.remove('not-selected');
  entryListSection.classList.add('is-selected');
  switcherSection.classList.add('lists-selected');
};

writeSwitcherButton.addEventListener('click', (event) => {
  event.preventDefault();
  diaryEntrySelected();
});

addEntry.addEventListener('click', (event) => {
  event.preventDefault();
  diaryEntrySelected();
});


listsSwitcherButton.addEventListener('click', (event) => {
  event.preventDefault();
  entryListSelected();
});

myJournal.addEventListener('click', (event) => {
  event.preventDefault();
  entryListSelected();
});
