"use client"

import { useEffect, useState} from "react";
import { createClient } from "@/lib/client";

type Collections = {
    reward_id: number;
    quantity: number;
}