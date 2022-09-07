import React from "react";

import HomeTitleGrid from "../../organisms/homeTitleGrid/HomeTitleGrid";
import HomeStatsGrid from "../../organisms/homeStatsGrid/HomeStatsGrid";
import HomeTop12Grid from "../../organisms/homeTop12Grid/HomeTop12Grid";

// Dati di prova
import Data from '../../../utils/mockData.json';
import GridSpacer from "../../atoms/gridSpacer/GridSpacer";

export default function Home() {
    return(
        <div>
            <GridSpacer height="5vh" />

            {/* Sezione titolo */}
            <HomeTitleGrid />

            <GridSpacer height="5vh" />

            {/* Sezione griglia statistiche */}
            <HomeStatsGrid stats={Data.stats} />

            <GridSpacer height="10vh" />
            
            {/* Sezione griglia top 12 campagne */}
            <HomeTop12Grid campagne={Data.top12 } />

            <GridSpacer height="20vh" />
        </div>
    )
}