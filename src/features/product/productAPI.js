
// TODO
export function getAllProducts() {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({data})
});
}
// TODO : multiple filter
//TODO: filter deleted prodicts from server
export function getProductsByFilter({filter,sort,pagination}) {
  let queryString='';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1];
      queryString += `${key}=${lastCategoryValue}&`
    }
    
  }
  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }
  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/products?"+queryString);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({data:{products:data,totalItems:+totalItems}})
});
}

export function getAllCategories() {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
   // console.log(data);
    resolve({data:{categories:data}})
});
}

export function getAllBrands() {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({data:{brands:data}})
});
}

export function getProductById(id) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/products/"+id);
    const data = await response.json();
    resolve({data})
});
}

export function createProduct(product) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/products/",{
      method:'POST',
      body:JSON.stringify(product),
      headers:{'content-type':'application/json'}
    });
    const data = await response.json();
    resolve({data})
});
}

export function updateProduct(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch("http://localhost:8080/products/"+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
    });
    // TODO : only return relevant information
    const data = await response.json();
    resolve({data})
});
}