import { FormControl, Grid, InputLabel, MenuItem, Select, Slider, SliderThumb, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CampaignOverview from "../../molecules/campaignOverview/CampaignOverview";
import Data from '../../../utils/mockData.json';
import GridSpacer from "../../atoms/gridSpacer/GridSpacer";
import CampaignEndingDateInput from "../../atoms/campaignEndingDateInput/CampaignEndingDateInput";
import PropTypes from 'prop-types';
import styled from "@emotion/styled";
import { Filter } from "@mui/icons-material";

export default function Campaigns() {
    const [campaigns, setCampaigns] = useState([]);

    // filtri
    const [campaignName, setCampaignName] = useState("");
    const [campaignEndingDate, setCampaignEndingDate] = useState("");
    const [state, setState] = useState("");





    const [minCollectedRange, setMinCollectedRange] = useState(0)
    const [maxCollectedRange, setMaxCollectedRange] = useState(1000000)
    const [collectedRange, setCollectedRange] = useState([minCollectedRange, maxCollectedRange]);

    useEffect(() => {
        setCollectedRange([minCollectedRange, maxCollectedRange])
        console.log("fatto set state")
    }, [minCollectedRange, maxCollectedRange]);

    const handleCollectedRangeChange = (e, newValue) => {
        console.log(newValue)
        setMinCollectedRange(newValue[0])
        setMaxCollectedRange(newValue[1])
        setCollectedRange(newValue);
    }

    const handleMinCollectetRangeChange = (e) => {
        setMinCollectedRange(parseInt(e.target.value))
        
        //handleCollectedRangeChange(null, [minCollectedRange, maxCollectedRange])
        //setCollectedRange(prova);
    }

    const handleMaxCollectetRangeChange = (e) => {
        setMaxCollectedRange(parseInt(e.target.value))

        searchCampaigns();
    }

    const handleStateChange = (e) => {
        setState(e.target.value)
        searchCampaigns();

    }

    const handleCampaignNameChange = (e) => {
        setCampaignName(e.target.value);
        searchCampaigns();

    }

    useEffect(() => {
        (async () => {

            // Chiamata axios

            // Setto lo stato
            setCampaigns(Data.top12)
            console.log(campaigns)

        })();
    }, []);

    function searchCampaigns() {

        let camp = [];

       
    }


    return (
        <div>
            <GridSpacer
                height="5vh"
            />
            <Grid container spacing={2} justifyContent="center" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                <Grid item xl={12} style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    {/* Filtro nome campagna */}
                    <TextField
                        value={campaignName}
                        onChange={handleCampaignNameChange}
                        label="Campaign name"
                        placeholder="Search campaign name"
                        variant="standard"
                    />

                    {/* Filtro data fine */}
                    <CampaignEndingDateInput createCampaignPage={true} setCampaignEndingDate={setCampaignEndingDate} />

                    {/* Filtro algo raccolti */}
                    <div>

                        <TextField
                            id="outlined-number"
                            label="Min"
                            type="number"
                            value={minCollectedRange}
                            onChange={handleMinCollectetRangeChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <AirbnbSlider
                            value={collectedRange}
                            onChange={handleCollectedRangeChange}
                            marks={[{
                                value: 0,
                                label: '0',
                            },
                            {
                                value: 1000000,
                                label: '1000000',
                            }]}
                            min={0}
                            step={100}
                            max={1000000}
                            components={{ Thumb: AirbnbThumbComponent }}
                            getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
                            defaultValue={[0, 1000000]}
                            valueLabelDisplay="auto"
                        />

                        <TextField
                            id="outlined-number"
                            value={maxCollectedRange}
                            onChange={handleMaxCollectetRangeChange}
                            label="Max"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                    </div>
                    {/* Filtro stato */}
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">State</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={state}
                            onChange={handleStateChange}
                            label="State"
                        >
                            <MenuItem value="">
                                <em style={{visibility:'hidden'}}>n</em>
                            </MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="success">Closed with success</MenuItem>
                            <MenuItem value="failed">Closed with fail</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <GridSpacer
                height="5vh"
            />
            <Grid container spacing={2} justifyContent="center">
                {campaigns.map(campaign => {
                    return (
                        <CampaignOverview key={campaign.id} campagna={campaign} />
                    )
                })}
            </Grid>

        </div>
    )
}

function AirbnbThumbComponent(props) {
    const { children, ...other } = props;
    return (
        <SliderThumb {...other} >
            {children}
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
            <span className="airbnb-bar" />
        </SliderThumb>
    );
}

AirbnbThumbComponent.propTypes = {
    children: PropTypes.node,
};

const AirbnbSlider = styled(Slider)(({ theme }) => ({
    color: '#3a8589',
    height: 3,
    width: "400px",
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .airbnb-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 3,
    },
    '& .MuiSlider-rail': {
        color: '#d8d8d8',
        opacity: 1,
        height: 3,
    },
}));