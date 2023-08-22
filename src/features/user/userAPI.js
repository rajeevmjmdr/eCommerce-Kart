// A mock function to mimic making an async request for data
export function getLoggedInUserOrders(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/orders/user/"+userId);
    // TODO : only return relevant information
    const data = await response.json();
    resolve({data})
});
}

export function updateUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/users/"+userData.id,{
      method:'PATCH',
      body:JSON.stringify(userData),
      headers:{'content-type':'application/json'}
    });
    // TODO : only return relevant information
    const data = await response.json();
    resolve({data})
});
}

export function getLoggedInUser(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/users/"+userId);
    // TODO : only return relevant information
    const data = await response.json();
    resolve({data})
});
}