const formatDate = dateString => {
  const date = new Date(dateString);
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  const localizedDate = date.toLocaleDateString(undefined, options);
  return localizedDate;
};

export default formatDate;
