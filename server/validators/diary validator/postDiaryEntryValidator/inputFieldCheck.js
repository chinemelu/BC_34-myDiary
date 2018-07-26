const inputFieldCheck = (data, isEditing, diaryEntry, inputField) => {
  // The input field would be a string and one of title, description or privacy
  if (isEditing === false && data[inputField] === undefined) {
    data[inputField] = ''; // if isEditing is false, then POST API route is using validator
    return data[inputField];
  }
  if (isEditing === false && data[inputField]) {
    // for POST Route, if data, trim data
    data[inputField] = data[inputField].trim();
    return data[inputField];
  }
  if (isEditing === true && data[inputField] === undefined) {
  // for PUT route, if no input, let data be current data in database
    data[inputField] = diaryEntry[inputField];
    return data[inputField];
  }
  if (isEditing === true && data[inputField]) {
  // for PUT route, if input, let data be trimmed
    data[inputField] = data[inputField].trim();
    return data[inputField];
  }
};

export default inputFieldCheck;
