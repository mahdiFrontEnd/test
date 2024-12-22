export const deleteAllCookies = () => {

  localStorage.clear()



  document.cookie.split(';').forEach((c) => {
     if(c.search("tour") === -1){
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    }

  });
};