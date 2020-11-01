import axios from "axios";

export const downloadPath = "http://localhost:5005/acte";
const apiBase = "http://localhost:5005";

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