import axios from "axios";
import { API_BASE, API_BASE_V2 } from "../Constant"

const fetchAllOrders = async (table_no) => {
    const res = await axios.get(API_BASE_V2 + `order/latest-asset-order/${table_no}`);
    return res
}

//Not used
async function saveAllOrder(requestOptions) {
    const res = axios.post(API_BASE + "company/asset/order/create", requestOptions)
    return res
}

export { fetchAllOrders, saveAllOrder }