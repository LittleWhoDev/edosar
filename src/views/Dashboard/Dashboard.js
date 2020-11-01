import { PRIMARIE } from "api/roles";
import { CETATEAN } from "api/roles";
import React from "react";

import { default as DashboardCetatean } from './DashboardCetatean';
import { default as DashboardPrimarie } from './DashboardPrimarie';

export default function DashboardPage() {
    localStorage.setItem("role", CETATEAN);
    const role = parseInt(localStorage.getItem("role"));
    if (role === CETATEAN) return <DashboardCetatean />
    if (role === PRIMARIE) return <DashboardPrimarie />
    return <></>
}