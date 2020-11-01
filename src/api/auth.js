import axios from "axios";

export function useAuth() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + (token === null ? "" : token);
}