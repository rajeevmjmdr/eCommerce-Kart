export function addToCart(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch("/cart",{
      method:'POST',
      body:JSON.stringify(item),
      headers:{'content-type':'application/json'}
    });
    // TODO : only return relevant information
    const data = await response.json();
    resolve({data})
});
}

export function getItemsByUserId() {
  return new Promise(async (resolve) =>{
    const response = await fetch("/cart");
    const data = await response.json();
    resolve({data})
});
}

export function updateCart(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch("/cart",{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
    });
    // TODO : only return relevant information
    const data = await response.json();
    resolve({data})
});
}

export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) =>{
    const response = await fetch("/cart/"+itemId,{
      method:'DELETE',
      headers:{'content-type':'application/json'}
    });
    // TODO : only return relevant information
    const data = await response.json();
    resolve({data:{id:itemId}})
});
}

export function resetCart() {
  return new Promise(async (resolve) =>{
    const response = await getItemsByUserId()
    const items = response.data;
    for(let item of items){
      await deleteItemFromCart(item.id)
    }

    resolve({status:'Success'})
});
}
