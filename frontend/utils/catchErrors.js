const catchErrors = (error) => {
  let errorMsg;
  if (error.response) {
    errorMsg = error.response.data;
    console.error(errorMsg);
  } else if (error.response) {
    errorMsg = error.request;
    console.error(errorMsg);
  } else {
    errorMsg = error.message;
    console.error(errorMsg);
  }
  return errorMsg;
};
export default catchErrors;
