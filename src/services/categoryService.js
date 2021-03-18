import axios from 'axios';
import { API_BASE_V2 } from "../Constant"

const fetchCategory = async (companyID) => {
    const res = await axios.get(
        API_BASE_V2 +
        `product/product-category/?company=${companyID}&filter_by=has_child`)
    return res;
};

export { fetchCategory }