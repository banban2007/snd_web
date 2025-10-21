// 🌐 Base URLs
export const API_BASE_URL = 'https://sndapi.dynamixwave.com/api';
export const Image_URL = 'https://sndapi.dynamixwave.com';

// 📡 API Endpoints
export const ENDPOINT = {
  // 🧍‍♀️ Authentication & Profile
  REGISTER: `${API_BASE_URL}/register/`,
  LOGIN: `${API_BASE_URL}/login/`,
  PROFILE: `${API_BASE_URL}/profile/`,

  // 👥 User Management (Admin)
  USER_LIST: `${API_BASE_URL}/users/`,
  USER_DETAIL: (userId) => `${API_BASE_URL}/users/${userId}/`, // GET
  USER_UPDATE: (userId) => `${API_BASE_URL}/users/${userId}/update/`, // PUT/PATCH


  // Forgot Password

  ForgotPassword: `${API_BASE_URL}/password/forgot/`,
  Reset: `${API_BASE_URL}/password/reset/`,

  // About us 
  ABOUT_SLIDE_LIST: `${API_BASE_URL}/about-slideshow/`,
  CONTACT_LIST: `${API_BASE_URL}/contact-info/`,

  PRIVACY_POLICY_LIST: `${API_BASE_URL}/privacy-policy/`, // GET all

  // 📜 Terms & Conditions Management
  TERMS_CONDITION_LIST: `${API_BASE_URL}/terms-condition/`, // GET all

  // Product 

  PRODUCT_LIST: `${API_BASE_URL}/product/`,

  // Day
  DAY_LIST: `${API_BASE_URL}/day/`,

  // 📍 Location
  LOCATION_LIST: `${API_BASE_URL}/location/`,

  // ⚙️ Labour
  LABOUR_LIST: `${API_BASE_URL}/labour/`,

  ORDER_CALCULATE: `${API_BASE_URL}/order/calculate-preview/`,

  // 🏢 Company Info
  COMPANY_INFO_LIST: `${API_BASE_URL}/company-info/`,

  PARTIAL_PAYMENT: `${API_BASE_URL}/partial-payment/`,

  // Order Histroy 

  USER_ORDER_HISTORY: `${API_BASE_URL}/order/user/history/`,


};
