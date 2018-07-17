
// create a function to check if the privacy field is empty

const isPrivacyEmpty = (data) => {
  if (!(data.privacy)) {
    return 'private';
  }
  return data.privacy;
};
export default isPrivacyEmpty;
