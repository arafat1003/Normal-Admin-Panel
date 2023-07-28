const customSessionStorage = store => next => action => {
    const result = next(action);
    const sensitiveData = store.getState().auth; // Replace 'auth' with the name of your reducer slice containing sensitive data
    sessionStorage.setItem('reduxState', JSON.stringify(sensitiveData));
    return result;
  };
  
  export default customSessionStorage;