const BASE_URL = "https://se-register-api.en.tripleten-services.com/v1";

// Registro
export const register = (email, password) => {
  console.log("ENVIANDO:", { email, password });

  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(async (res) => {
    const data = await res.json();

    console.log("RESPUESTA BACKEND:", data);

    if (res.ok) return data;
    return Promise.reject(data);
  });
};

// Login
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.ok ? res.json() : Promise.reject(res));
};

// Verificar token
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => res.ok ? res.json() : Promise.reject(res));
};