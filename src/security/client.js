import axios from "axios";


// Initialize axios instance with a base URL and default headers
export const apiClient = axios.create({
  baseURL: "http://localhost:8081/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});



// Use an interceptor to conditionally inject the JWT token into headers of each request
apiClient.interceptors.request.use((config) => {
  const url = new URL(config.url, config.baseURL);
  if (url.pathname !== "/api/auth/signup") {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token); // Debugging line
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
  }
  console.log("Request Headers:", config.headers); // Debugging line
  console.log("url pathname:", url.pathname);
  return config;
});


// Global handling of response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example of handling unauthorized errors globally
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized error:", error.message);
      // Implement logic to handle unauthorized access, like redirecting to login page
    } else {
      console.error("Response error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;