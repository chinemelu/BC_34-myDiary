const inputFieldCheck = (data, isEditing, diaryEntry, inputField) => {
  if (isEditing === false && data[inputField] === undefined) {
    data[inputField] = '';
    return data[inputField];
  }
  if (isEditing === false && data[inputField]) {
    data[inputField] = data[inputField].trim();
    return data[inputField];
  }
  if (isEditing === true && data[inputField] === undefined) {
    data[inputField] = diaryEntry[inputField];
    return data[inputField];
  }
  if (isEditing === true && data[inputField]) {
    data[inputField] = data[inputField].trim();
    return data[inputField];
  }
};

export default inputFieldCheck;
