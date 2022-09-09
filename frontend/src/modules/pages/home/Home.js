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

            {/* Title section */}
            <HomeTitleGrid />

            <GridSpacer height="5vh" />

            {/* Section stats grid */}
            <HomeStatsGrid stats={Data.stats} />

            <GridSpacer height="10vh" />
            
            {/* Section top 12 campaign */}
            <HomeTop12Grid campaigns={Data.top12} />

            <GridSpacer height="20vh" />
        </div>
    )
}