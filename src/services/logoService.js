import axios from "axios";
import { API_BASE } from "../Constant"

const fetchCompanyData = async (companyID, tableID) => {
    const res = axios.get(API_BASE + `company/${companyID}/menu?asset=${tableID}`);
    return res
}

export { fetchCompanyData }