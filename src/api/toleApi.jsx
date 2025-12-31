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

  // 🔹 Show Tole List
  getToleList: async () => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole`,
      {
        Flag: "s" // Show list flag
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
  toggleToleAccess: async (toleId, userId, allowApp) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole`,
      {
        ToleID: toleId,
        UserID: userId || getUserId(),
        Flag: "ai", // Allow/Disallow flag
        AllowApp: allowApp // "Y" or "N"
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Remove Tole (Based on API: Flag: "r")
  removeTole: async (toleId) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole`,
      {
        ToleID: toleId,
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
  extendExpiry: async (toleId, userId, expiryDate) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole`,
      {
        ToleID: toleId,
        UserID: userId || getUserId(),
        Flag: "ex", // Extend expiry flag
        ExpiryDate: expiryDate
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
  },

  // 🔹 Get Lookup Data (All in one)
  getLookupData: async (provinceId = null, districtId = null) => {
    try {
      // Fetch provinces
      const provincesResponse = await axios.post(
        `${BASE_URL}/api/admin/ref-value`,
        {
          ToleID: getToleId(),
          UserID: getUserId(),
          Flag: "SP"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      let districtsResponse = { data: { refLst: [] } };
      let municipalitiesResponse = { data: { refLst: [] } };

      // Fetch districts if provinceId is provided
      if (provinceId) {
        districtsResponse = await axios.post(
          `${BASE_URL}/api/admin/ref-value`,
          {
            ToleID: getToleId(),
            UserID: getUserId(),
            Flag: "SD",
            ProvinceID: provinceId
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Fetch municipalities if both provinceId and districtId are provided
      if (provinceId && districtId) {
        municipalitiesResponse = await axios.post(
          `${BASE_URL}/api/admin/ref-value`,
          {
            ToleID: getToleId(),
            UserID: getUserId(),
            Flag: "SM",
            ProvinceID: provinceId,
            DistrictID: districtId
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      return {
        provinces: provincesResponse.data.refLst || [],
        districts: districtsResponse.data.refLst || [],
        municipalities: municipalitiesResponse.data.refLst || []
      };
    } catch (error) {
      console.error("Error fetching lookup data:", error);
      return {
        provinces: [],
        districts: [],
        municipalities: []
      };
    }
  },

  // 🔹 Get Wada Numbers (if needed)
  getWadaNumbers: async (municipalityId) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/ref-value`,
      {
        ToleID: getToleId(),
        UserID: getUserId(),
        Flag: "SW", // Assuming there's a flag for Wada numbers
        MunicipalityID: municipalityId
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Search Toles (if needed)
  searchToles: async (searchTerm) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole`,
      {
        Flag: "s",
        SearchTerm: searchTerm
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Get Tole Statistics
  getToleStats: async () => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole`,
      {
        Flag: "stats" // Assuming there's a stats flag
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Export Toles to Excel/PDF
  exportToles: async (format = "excel") => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole/export`,
      {
        Flag: "export",
        Format: format
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob" // For file downloads
      }
    );
    return response.data;
  },

  // 🔹 Bulk Update Toles
  bulkUpdateToles: async (toleIds, updateData) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole/bulk`,
      {
        ToleIDs: toleIds,
        UpdateData: updateData,
        Flag: "bulk"
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Validate Tole ID (Check if exists)
  validateToleId: async (toleId) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole`,
      {
        ToleID: toleId,
        Flag: "validate"
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Upload Logo Only
  uploadLogo: async (toleId, logoBase64) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole/logo`,
      {
        ToleID: toleId,
        Logo: logoBase64,
        Flag: "logo"
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Get Tole Activities/Logs
  getToleActivities: async (toleId, limit = 50) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole/activities`,
      {
        ToleID: toleId,
        Limit: limit,
        Flag: "activities"
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Sync Tole Data with External Systems
  syncToleData: async (toleId) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole/sync`,
      {
        ToleID: toleId,
        Flag: "sync"
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },

  // 🔹 Generate Report
  generateReport: async (reportType, filters = {}) => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole/report`,
      {
        ReportType: reportType,
        Filters: filters,
        Flag: "report"
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob"
      }
    );
    return response.data;
  },

  // 🔹 Backup Tole Data
  backupToleData: async () => {
    const response = await axios.post(
      `${BASE_URL}/api/admin/tole/backup`,
      {
        Flag: "backup"
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob"
      }
    );
    return response.data;
  },

  // 🔹 Restore Tole Data
  restoreToleData: async (backupFile) => {
    const formData = new FormData();
    formData.append("backupFile", backupFile);
    formData.append("Flag", "restore");

    const response = await axios.post(
      `${BASE_URL}/api/admin/tole/restore`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  },

  // 🔹 Get API Status
  getApiStatus: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/status`, {
        timeout: 5000
      });
      return {
        status: response.data.status || "unknown",
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        status: "error",
        message: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
};

// Helper function for handling API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    console.error("API Error Response:", error.response.data);
    console.error("Status:", error.response.status);
    console.error("Headers:", error.response.headers);
    
    return {
      success: false,
      message: error.response.data?.Message || "Server error occurred",
      status: error.response.status,
      data: error.response.data
    };
  } else if (error.request) {
    // Request was made but no response
    console.error("API Error Request:", error.request);
    return {
      success: false,
      message: "No response from server. Please check your connection.",
      status: 0
    };
  } else {
    // Something else happened
    console.error("API Error:", error.message);
    return {
      success: false,
      message: error.message || "An unexpected error occurred"
    };
  }
};

// Axios interceptor for adding auth token
axios.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request timestamp
    config.headers["X-Request-Timestamp"] = new Date().toISOString();
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios interceptor for handling responses
axios.interceptors.response.use(
  (response) => {
    // You can log or modify successful responses here
    console.log("API Response:", {
      url: response.config.url,
      method: response.config.method,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.code === "ECONNABORTED") {
      error.message = "Request timeout. Please try again.";
    } else if (error.message === "Network Error") {
      error.message = "Network error. Please check your connection.";
    }
    
    return Promise.reject(error);
  }
);

// Export axios instance for direct use if needed
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }
});

export default toleApi;