import axios from "axios";

const apiBase = "http://localhost:3000";

export async function getDosare() {
    const r = await axios.get(`${apiBase}/dosar`);
    return r.data;
}

export async function getStatistics() {
  const r = await axios.get(`${apiBase}/dosar/count`);
  return r.data;
}
