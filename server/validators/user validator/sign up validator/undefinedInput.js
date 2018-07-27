const undefinedInputFieldCheck = (data, inputField) => {
  // The input field would be a string and one of title, description or privacy
  if (data[inputField] === undefined) {
    data[inputField] = ''; // if isEditing is false, then POST API route is using validator
    return data[inputField];
  }
  data[inputField] = data[inputField].trim().toLowerCase();
};

export default undefinedInputFieldCheck;
