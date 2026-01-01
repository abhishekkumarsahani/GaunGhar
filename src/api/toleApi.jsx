import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Function to get user ID from localStorage
const getUserId = () => {
  const adminUser = localStorage.getItem("adminUser");
  if (adminUser) {
    try {
      const userData = JSON.parse(adminUser);
      return userData.UserID || 1;
    } catch (error) {
      console.error("Error parsing admin user data:", error);
      return 1;
    }
  }
  return 1; // Default fallback
};

// Function to get ToleID from localStorage or use default
const getToleId = () => {
  const adminUser = localStorage.getItem("adminUser");
  if (adminUser) {
    try {
      const userData = JSON.parse(adminUser);
      return userData.ToleID || "ES25";
    } catch (error) {
      console.error("Error parsing admin user data:", error);
      return "ES25";
    }
  }
  return "ES25"; // Default fallback
};

// Main Tole API service
export const toleApi = {
  // 🔹 Create Tole
  createTole: async (toleData) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole`,
      {
        ...toleData,
        Flag: "i" // Insert flag
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Update Tole
  updateTole: async (toleData) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole`,
      {
        ...toleData,
        Flag: "U" // Update flag
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Show Tole List - UPDATED with required fields
  getToleList: async (filters = {}) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole`,
      {
        ToleID: getToleId(),
        UserID: getUserId(),
        Flag: "s", // Show list flag
        ...filters // Additional filters if needed
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Show Tole Info (Single Tole)
  getToleInfo: async (toleId) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole`,
      {
        ToleID: toleId,
        UserID: getUserId(),
        Flag: "si" // Show info flag
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Allow/Disallow Tole
toggleToleAccess: async (toleId, allowApp) => {
  // Convert anything truthy to "Y", falsy to "N"
  const allowAppFlag = allowApp === "Y" || allowApp === true ? "Y" : "N";

  const response = await axios.post(
    `${BASE_URL}/api/admin/tole`,
    {
      ToleID: toleId,
      UserID: getUserId(),
      Flag: "ai", // Allow/Disallow flag
      AllowApp: allowAppFlag // Always "Y" or "N"
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
},


  // 🔹 Remove Tole
  removeTole: async (toleId) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole`,
      {
        ToleID: toleId,
        UserID: getUserId(),
        Flag: "r" // Remove flag
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

 // 🔹 Extend Expiry
extendExpiry: async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/api/admin/tole`,
    {
      ToleID: payload.ToleID,
      UserID: getUserId(),
      Flag: "ex",
      ExpiryDate: payload.ExpiryDate
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
},
  // 🔹 Get Provinces
  getProvinces: async () => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/ref-value`,
      {
        ToleID: getToleId(),
        UserID: getUserId(),
        Flag: "SP" // Show Provinces flag
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Get Districts
  getDistricts: async (provinceId) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/ref-value`,
      {
        ToleID: getToleId(),
        UserID: getUserId(),
        Flag: "SD", // Show Districts flag
        ProvinceID: provinceId
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Get Municipalities
  getMunicipalities: async (provinceId, districtId) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/ref-value`,
      {
        ToleID: getToleId(),
        UserID: getUserId(),
        Flag: "SM", // Show Municipalities flag
        ProvinceID: provinceId,
        DistrictID: districtId
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
};

// Export axios instance for direct use if needed
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

// Add request interceptor to add auth token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default toleApi;