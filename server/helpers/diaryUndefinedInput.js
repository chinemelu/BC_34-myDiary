const undefinedInput = (data, field) => {
  if (data[field] === undefined) {
    data[field] = '';
  } else {
    data[field] = data[field].trim().toLowerCase();
  }
};
export default undefinedInput;
