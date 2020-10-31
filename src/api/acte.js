import axios from "axios";

export const downloadPath = "http://localhost:3000/acte";
const apiBase = "http://localhost:3000";

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