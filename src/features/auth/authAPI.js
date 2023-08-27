export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    // TODO : only return relevant information
    const data = await response.json();
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });
      // TODO : only return relevant information
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const errdata = await response.text();
        reject({ errdata });
      }
    } catch (errdata) {
      reject({ errdata });
    }
  });
}


export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/check");
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const errdata = await response.json();
        reject({ errdata });
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function logoutUser() {
  return new Promise(async (resolve) => {
    // TODO: Resolve session from server
    resolve({ status: "Success" });
  });
}
