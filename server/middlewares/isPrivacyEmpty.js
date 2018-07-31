const isPrivacyFieldEmpty = (data) => {
  if (!(data.privacy)) {
    return 'private';
  }
  return data.privacy;
};
export default isPrivacyFieldEmpty;
