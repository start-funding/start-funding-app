import React, { useEffect, useState } from "react";
import Data from '../../../utils/mockData.json';
import axios from "axios";
import GridSpacer from "../../atoms/gridSpacer/GridSpacer";
import { dateFormatter, newDateFromMonthDayYear } from "../../../utils/utils";
import CampaignsFilterSection from "../../organisms/campaignsFiltersSection/CampaignsFiltersSection";
import CampaignsResultsSection from "../../organisms/campaignsResultsSection/CampaignsResultsSection";
import CampaingsPaginationSection from "../../organisms/campaignsPaginationSection/CampaignsPaginationSection";
import Conf from '../../../conf/conf.json';

let api = `http://${Conf.backend.ip}:${Conf.backend.port}/${Conf.backend.basePath}`;


export default function Campaigns(props) {

    // Campaigns
    const [campaigns, setCampaigns] = useState([]);

    // Pagination
    const [pageNumber, setPageNumber] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState();
    const [totalResults, setTotalResults] = useState(0);

    // Filters
    const [campaignName, setCampaignName] = useState("");
    const [campaignEndingDate, setCampaignEndingDate] = useState(null);
    const [minCollectedRange, setMinCollectedRange] = useState("")
    const [maxCollectedRange, setMaxCollectedRange] = useState("")
    const [state, setState] = useState("");

    useEffect(() => {
        searchCampaigns();
    }, [minCollectedRange, maxCollectedRange, campaignName, campaignEndingDate, state, pageNumber, resultsPerPage]);

    function searchCampaigns() {

        /*
        Data.top12.forEach(campaign => {
            let filterMatch = true;

            if (filters.nameFilter !== "") {
                if (!campaign.name.includes(filters.nameFilter))
                    filterMatch = false
            }

            if (filters.stateFilter !== "") {
                if (campaign.state !== filters.stateFilter)
                    filterMatch = false
            }
            if (filters.minCollectedFilter !== "" && filters.minCollectedFilter >= 0) {
                if (campaign.collectedFunds < filters.minCollectedFilter) {
                    filterMatch = false
                }
            }

            if (filters.maxCollectedFilter !== "" && filters.maxCollectedFilter >= 0) {
                if (campaign.collectedFunds > filters.maxCollectedFilter) {
                    filterMatch = false
                }
            }

            if (filters.endingDateFilter !== "" && filters.endingDateFilter !== null) {
                console.log("dentro a filtro")
                if (newDateFromMonthDayYear(filters.endingDateFilter).getTime() - newDateFromMonthDayYear(campaign.endingDate).getTime() >= 0) {
                    console.log("dentro a condizione")
                    filterMatch = false
                }
            }

            if (filterMatch)
                campTotal.push(campaign);
        })

        let inizio = filters.resultsPerPage * (filters.page - 1)
        let fine = (filters.resultsPerPage * (filters.page - 1)) + filters.resultsPerPage;
        let campCounter = campTotal.slice(inizio, fine);
        let res = {
            campaigns: campCounter,
            pagination: {
                page: filters.page,
                resultsPerPage: filters.resultsPerPage,
                totalResults: campTotal.length,
                totalPages: Math.ceil(campTotal.length / filters.resultsPerPage)
            }
        }
        */
        // leggo risultati

        axios.post(`${api}${Conf.backend.endpoints.filterCampaigns}`, {
            minCollected: minCollectedRange === "" ? 0 : minCollectedRange,
            maxCollected: maxCollectedRange === "" ? Number.MAX_SAFE_INTEGER : maxCollectedRange,
            state: state === "" ? "all" : state,
            page: pageNumber,
            resultsPerPage: resultsPerPage
        })
        .then(res => {
            switch(res.status) {
                case 200:
                    setCampaigns(res.data.data.campaigns);
                    setTotalPages(res.data.data.pagination.totalPages);
                    setTotalResults(res.data.data.pagination.totalResults)
                    break;
                case 500:
                    alert(res.data.message)
                    break;
            }
             // Redirect to campaign page
        
        })
        .catch(err => {
            console.log(err);
            alert(err)
        })

        
    }

    return (
        <div>
            <GridSpacer
                height="5vh"
            />

            {/* Filters section */}
            <CampaignsFilterSection
                campaignName={campaignName}
                setCampaignName={setCampaignName}
                campaignEndingDate={campaignEndingDate}
                setCampaignEndingDate={setCampaignEndingDate}
                minCollectedRange={minCollectedRange}
                setMinCollectedRange={setMinCollectedRange}
                maxCollectedRange={maxCollectedRange}
                setMaxCollectedRange={setMaxCollectedRange}
                state={state}
                setState={setState}
            />

            <GridSpacer
                height="5vh"
            />

            {/* Search results section */}
            <CampaignsResultsSection
                pageNumber={pageNumber}
                campaigns={campaigns}
                updateNavActive={props.updateNavActive}
            />

            <GridSpacer
                height="5vh"
            />

            {/* PAGINATION */}
            <CampaingsPaginationSection
                setPageNumber={setPageNumber}
                setResultsPerPage={setResultsPerPage}
                totalPages={totalPages}
                pageNumber={pageNumber}
                totalResults={totalResults}
                resultsPerPage={resultsPerPage}
            />

            <GridSpacer
                height="5vh"
            />
        </div>
    )
}
