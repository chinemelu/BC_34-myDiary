const undefinedInputFieldCheck = (data, inputField) => {
  if (data[inputField] === undefined) {
    data[inputField] = '';
    return data[inputField];
  }
  data[inputField] = data[inputField].trim().toLowerCase();
};

export default undefinedInputFieldCheck;
