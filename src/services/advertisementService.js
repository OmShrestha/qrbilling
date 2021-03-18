import axios from 'axios';
import { API_BASE_V2 } from "../Constant"

const fetchAdvertisement = async (companyID) => {
    const res = await axios
        .get(API_BASE_V2 + `company/advertisement/`)

    return res;
};

export { fetchAdvertisement }