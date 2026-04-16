"use client"

import { useEffect, useState} from "react";
import { createClient } from "@/lib/client";

type Collections = {
    reward_id: number;
    quantity: number;
}

export default function CollectionsPanel(){
    const [rewards, setRewards] = useState<Collections[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setmessage] = useState("");

    const loadRewards = async() => {
        const supabase = createClient();

        const{
            data:{user},
            error:userError,
        } = await supabase.auth.getUser();

        if (userError || !user){
            setmessage("Log in to view collection");
            setRewards([]);
            setLoading(false);
            return;
        }

        const {data, error} = await supabase
            .from("user_rewards")
            .select("*")
            .eq("user_id", user.id)
            .order("quantity", {ascending: false});
        
        if(error){
            setmessage(`Error loading collections : ${error.message}`);
            setRewards([]);
            setLoading(false);
            return;
        }

        setRewards(data || []);
        setmessage("");
        setLoading(false);
    };

    useEffect(() => {loadRewards();},[])

    
}