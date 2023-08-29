export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("/auth/signup", {
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
      const response = await fetch("/auth/login", {
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
        reject(errdata);
      }
    } catch (errdata) {
      reject(errdata);
    }
  });
}


export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/check");
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

export function resetPasswordRequest(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password-check",{
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const errdata = await response.json();
        reject({errdata });
      }
    } catch (error) {
      reject({error});
    }
  });
}

export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/reset-password",{
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const errdata = await response.json();
        reject({errdata });
      }
    } catch (error) {
      reject({error});
    }
  });
}
export function logoutUser() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("/auth/logout");
      if (response.ok) {
        resolve({ data :'Success' });
      } else {
        const errdata = await response.json();
        reject({ errdata });
      }
    } catch (error) {
      reject(error);
    }
  });
}
