// A mock function to mimic making an async request for data
export function getLoggedInUserOrders(userId) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/orders?user.id="+userId);
    // TODO : only return relevant information
    const data = await response.json();
    resolve({data})
});
}
