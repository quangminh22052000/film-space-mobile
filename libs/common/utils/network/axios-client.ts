import axios from "axios"

export const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_AUTH_API_URL, // update this to your API URL
  headers: {
    "Content-Type": "application/json",
  },
})

axiosClient.interceptors.request.use(async config => ({
  ...config,
}))

let counter = 0
axiosClient.interceptors.response.use(
  response => response,
  error => {
    const config = error.config
    // retry 3 times on 422 error
    if (counter < 3) {
      counter++
      if (error.response?.status !== 424) {
        return new Promise(resolve => {
          resolve(axiosClient(config))
        })
      }
    }
    counter = 0
    // If there is an error from the backend, return that error
    if (error.response) {
      const { data, status } = error.response
      // If there is data, return the data and status
      if (data) {
        return Promise.reject({
          ...data,
          status, // add the status code to the error object
        })
      }
      // If there is no data, return a generic error message
      return Promise.reject({
        message:
          "An error occurred, but no details were provided by the server.",
        status,
      })
    }
    // If there is no error from the backend, return the default Axios error
    return Promise.reject(error)
  },
)

export const setAxiosToken = (token: string | null | undefined) => {
  if (token) {
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axiosClient.defaults.headers.common.Authorization
  }
}
