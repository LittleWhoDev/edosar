import axios from "axios";

const apiBase = "http://95.179.243.247:3000";

export async function getDosare() {
  const r = await axios.get(`${apiBase}/dosar`);
  return r.data;
}

export async function getSabloane() {
  const r = await axios.get(`${apiBase}/sablon`);
  return r.data;
}

export async function getStatistics() {
  const r = await axios.get(`${apiBase}/dosar/count`);
  return r.data;
}

export async function getDosar(id) {
  const r = await axios.get(`${apiBase}/dosar/${id}`);
  return r.data;
}

export async function createDosar(data) {
  const r = await axios.post(`${apiBase}/dosar`, data);
  return r.data;
}