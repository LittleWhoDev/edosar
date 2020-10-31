import axios from "axios";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmOWRhYjg4MGI1Y2U0MGRmZTIzYjZmMSIsInVzZXJuYW1lIjoiY2V0YXRlYW51bCB4IiwiaWF0IjoxNjA0MTY4NTk3fQ.dpiqkUgd-azn6WT-4Wib3oZ8yuWGqt5XPpHY7mnMO5o";
export function useAuth() {
    //const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = "Bearer " + (token === null ? "" : token);
}