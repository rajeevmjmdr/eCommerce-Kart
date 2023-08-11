export function createUser(userData) {
    return new Promise(async (resolve) =>{
      const response = await fetch("http://localhost:8080/users",{
        method:'POST',
        body:JSON.stringify(userData),
        headers:{'content-type':'application/json'}
      });
      // TODO : only return relevant information
      const data = await response.json();
      resolve({data})
  });
  }

  export function checkUser(loginInfo) {
    return new Promise(async (resolve,reject) =>{
      const email = loginInfo.email;
      const password = loginInfo.password;
      const response = await fetch("http://localhost:8080/users?email="+email);
      // TODO : only return relevant information
      const data = await response.json();
      if(data.length){
        if(password===data[0].password){
          resolve({data:data[0]})
        }else{
          reject({message:'wrong credentials'});
        }
      }else{
        reject({message:'wrong credentials'});
      }
      
  });
  }

  export function logoutUser(userId) {
    return new Promise(async (resolve) =>{
   // TODO: Resolve session from server 
      resolve({status:'Success'})
  });
  }
