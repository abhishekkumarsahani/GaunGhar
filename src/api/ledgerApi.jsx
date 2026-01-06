import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
export const ledgerApi = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/api/admin/acc-ledger`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
