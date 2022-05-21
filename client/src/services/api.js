import axios from "axios";

// const clientApi = axios.create({
//   baseURL: 'http://localhost:4000',
//   withCredentials: true
// })
const clientApi = axios.create({
  withCredentials: true,
  // baseURL: 'https://cloudki.herokuapp.com',
})

export const signin = async (data) =>
  clientApi
    .post("/api/auth/signin", data)
    .then((result) => result)
    .catch((reason) => reason.response)

export const signup = async (data) =>
    clientApi
      .post("/api/auth/signup", data)
      .then((result) => result)
      .catch((reason) => reason.response)
      
export const logout = async () =>
  clientApi
    .post("/api/auth/logout")
    .then((result) => result)
    .catch((reason) => reason.response)

export const refreshSession = async () =>
    clientApi
      .get("/api/auth/refreshSession")
      .then((result) => result)
      .catch((reason) => reason.response)

export const getClients = async () =>
    clientApi
      .get("/api/clients/")
      .then((result) => result)
      .catch((reason) => reason.response)

export const addClient = async (data) =>
    clientApi
      .post("/api/clients/", data)
      .then((result) => result)
      .catch((reason) => reason.response)

export const removeClient = async (data) =>
    clientApi
      .post("/api/clients/delete", data)
      .then((result) => result)
      .catch((reason) => reason.response)

export const addTest = async (data) =>
    clientApi
      .post("/api/tests/add", data)
      .then((result) => result)
      .catch((reason) => reason.response)

export const editTest = async (data) =>
    clientApi
      .post("/api/tests/edit", data)
      .then((result) => result)
      .catch((reason) => reason.response)

export const removeTest = async (data) =>
    clientApi
      .post("/api/tests/remove", data)
      .then((result) => result)
      .catch((reason) => reason.response)

export const getTests = async () =>
    clientApi
      .get("/api/tests/all")
      .then((result) => result)
      .catch((reason) => reason.response)

export const assignTest = async (data) =>
    clientApi
      .post("/api/tests/assign", data)
      .then((result) => result)
      .catch((reason) => reason.response)

export const getActiveTest = async (data) =>
    clientApi
      .post("/api/tests/getActive", data)
      .then((result) => result)
      .catch((reason) => reason.response)

export const answerActiveTest = async (data) =>
    clientApi
      .post("/api/tests/answerActive", data)
      .then((result) => result)
      .catch((reason) => reason.response)

export const clientTests = async (data) =>
    clientApi
      .post("/api/tests/clientTests", data)
      .then((result) => result)
      .catch((reason) => reason.response)

export const clientTestComment = async (data) =>
    clientApi
      .post("/api/tests/clientTestComment", data)
      .then((result) => result)
      .catch((reason) => reason.response)

