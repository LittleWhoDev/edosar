import axios from "axios";

const apiBase = "http://95.179.243.247:3000";

export async function updateDosar(id, data) {
    const r = await axios.put(`${apiBase}/dosar/${id}`, data);
    return r.data;
}

export async function createSablon(data) {
    const r = await axios.post(`${apiBase}/sablon`, data);
    return r.data;
}