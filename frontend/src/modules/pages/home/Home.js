import React from "react";

import HomeTitleGrid from "../../organisms/homeTitleGrid/HomeTitleGrid";
import HomeStatsGrid from "../../organisms/homeStatsGrid/HomeStatsGrid";
import HomeTop12Grid from "../../organisms/homeTop12Grid/HomeTop12Grid";

// Dati di prova
import Data from '../../../utils/mockData.json';

export default function Home() {
    return(
        <div>
            {/* Sezione titolo */}
            <HomeTitleGrid />

            {/* Sezione griglia statistiche */}
            <HomeStatsGrid stats={Data.stats} />
            
            {/* Sezione griglia top 12 campagne */}
            <HomeTop12Grid campagne={Data.top12 } />
        </div>
    )
}