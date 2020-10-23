const validateUserInput = (title, text, author) => {
  const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  let isValid = true;
  if (!title && !text && !author) isValid = false;
  else if (title.length < 10 && title.length > 20) isValid = false;
  else if (text.length < 20) isValid = false;
  else if (!validEmail.test(author)) isValid = false;
  return isValid;
};

module.exports = validateUserInput;