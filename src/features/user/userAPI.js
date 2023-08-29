// A mock function to mimic making an async request for data
export function getLoggedInUserOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch("/orders/user/");
    // TODO : only return relevant information
    const data = await response.json();
    resolve({data})
});
}

export function updateUser(userData) {
  return new Promise(async (resolve) =>{
    const response = await fetch("/users/",{
      method:'PATCH',
      body:JSON.stringify(userData),
      headers:{'content-type':'application/json'}
    });
    // TODO : only return relevant information
    const data = await response.json();
    resolve({data})
});
}

export function getLoggedInUser() {
  return new Promise(async (resolve) =>{
    const response = await fetch("/users/own");
    // TODO : only return relevant information
    const data = await response.json();
    resolve({data})
});
}