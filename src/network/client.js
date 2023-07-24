import axios from "axios"
import { BACK_END_URL } from "../config";

const getBlocks = async () => {    
    const res = await axios.get(`${BACK_END_URL}/block/list/today`);
    return res.data;
}

const getTransactionsOfBlock = async (hash) => {
    const res = await axios.get(`${BACK_END_URL}/block/${hash}/transactions`);
    return res.data;
}

const getAddress = async (addressId) => {
    const res = await axios.get(`${BACK_END_URL}/address/${addressId}`);
    return res.data;
}

export { getBlocks, getTransactionsOfBlock, getAddress };