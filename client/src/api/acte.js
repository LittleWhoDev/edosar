import axios from "axios";

export const downloadPath = "http://95.179.243.247:3000/acte";
const apiBase = "http://95.179.243.247:3000";

export async function uploadAct(f) {
    const formData = new FormData();
    formData.append('act', f)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return (await axios.post(`${apiBase}/act`, formData, config)).data
}