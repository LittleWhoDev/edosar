import axios from "axios";

const apiBase = "http://localhost:3000";

export async function updateDosar(id, data) {
    const r = await axios.put(`${apiBase}/dosar/${id}`, data);
    return r.data;
}