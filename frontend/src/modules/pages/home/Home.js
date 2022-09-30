import React, { useEffect, useState } from "react";

import HomeTitleGrid from "../../organisms/homeTitleGrid/HomeTitleGrid";
import HomeStatsGrid from "../../organisms/homeStatsGrid/HomeStatsGrid";
import HomeTop12Grid from "../../organisms/homeTop12Grid/HomeTop12Grid";
import Conf from '../../../conf/conf.json';
import Data from '../../../utils/mockData.json'

// Dati di prova
import GridSpacer from "../../atoms/gridSpacer/GridSpacer";
import axios from "axios";
let api = `http://${Conf.backend.ip}:${Conf.backend.port}/${Conf.backend.basePath}`;


export default function Home(props) {

    const [campaigns, setCampaigns] = useState([]);
    const [stats, setStats] = useState({});

    useEffect(() => {
        axios.get(`${api}${Conf.backend.endpoints.top12}`,)
        .then(res => {
            switch(res.status) {
                case 200:
                    setCampaigns(res.data.data);
                    break;
                case 500:
                    alert(res.data.message)
                    break;
            }

            axios.get(`${api}${Conf.backend.endpoints.stats}`)
            .then(statsRes => {
                setStats(statsRes.data.data)
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })

        })
        .catch(err => {
            console.log(err);
            alert(err)
        })
    }, []);

    

    return(
        <div>
            <GridSpacer height="5vh" />

            {/* Title section */}
            <HomeTitleGrid />

            <GridSpacer height="5vh" />

            {/* Section stats grid */}
            <HomeStatsGrid stats={stats} />

            <GridSpacer height="10vh" />
            
            {/* Section top 12 campaign */}
            <HomeTop12Grid 
                campaigns={campaigns} 
                updateNavActive={props.updateNavActive}
            />

            <GridSpacer height="20vh" />
        </div>
    )
}