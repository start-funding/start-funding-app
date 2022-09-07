import { Button, Card, CardActionArea, CardActions, CardMedia, Grid, IconButton, Modal, TextField, Typography } from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { React, useState } from "react";
import GridSpacer from "../../atoms/gridSpacer/GridSpacer";
import CancelIcon from '@mui/icons-material/Cancel';
import dayjs from 'dayjs';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { dateFormatter, getRandomInt } from "../../../utils/utils";

import { Link, useNavigate } from 'react-router-dom';
import { Box } from "@mui/system";
import { FileUploader } from "react-drag-drop-files";

import './creaCampagna.scss'


export default function CreaCampagna() {
    const navigate = useNavigate();

    const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

    // Immagine
    const [file, setFile] = useState(null);
   
    const [imageSelectedUrl, setImageSelectedUrl] = useState("");
    const [showUploadButton, setShowUploadButton] = useState(true);

    const cancelImageUpload = () => {
            setImageSelectedUrl("")
            setShowUploadButton(true)
        
    }

    const handleImageSelected = (file) => {
        console.log(file)
        if(file && file.type.includes("image")) {
            setFile(file)
            setImageSelectedUrl(URL.createObjectURL(file))
            setShowUploadButton(false)
        } else {
            setModalErrorText("Format not supported. The file has to be an image.")
            handleOpen()
        }
    }

    // Modal errore
    const [open, setOpen] = useState(false);
    const [modalErrorText, setModalErrorText] = useState("");
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    // Form
    const [projectName, setProjectName] = useState("");
    const [projectTarget, setProjectTarget] = useState(0);
    const [projectEndingDate, setProjectEndingDate] = useState(dayjs(new Date()));
    const [projectDescription, setProjectDescription] = useState("");

    const handleProjectNameChange = (e) => {
        console.log(e.target.value)
        setProjectName(e.target.value);
    };

    const handleProjectTargetChange = (e) => {
        setProjectTarget(parseFloat(e.target.value));
    };

    const handleProjectEndingDateChange = (e) => {
        setProjectEndingDate(dayjs(e));
    };

    const handleProjectDescriptionChange = (e) => {
        setProjectDescription(e.target.value);
    };

    function saveProject() {

        // Recupero i dati
        let newProject = {
            projectId: getRandomInt(1, 12),
            projectName: projectName,
            projectTarget: projectTarget,
            projectEndingDate: dateFormatter(projectEndingDate['$d'], "-"),
            projectDescription: projectDescription,
            image: file
        }

        // Controlli
        if (newProject.projectName === "") {
            setModalErrorText("Name field can't be empty.")
            handleOpen()
        } else {

            if (newProject.projectTarget === 0 || newProject.projectTarget < 0) {
                setModalErrorText(newProject.projectTarget === 0 ? "The project target can't be 0." : "The project target can't be a negative number.")
                handleOpen()
            } else {
                console.log(projectEndingDate['$d'])
                console.log((new Date()).getTime() - projectEndingDate['$d'].getTime())

                if (projectEndingDate['$d'].getTime() - (new Date()).getTime() <= 0) {
                    setModalErrorText("The date selected is not valid, it has to be grater than today.")
                    handleOpen()
                } else {

                    if (newProject.projectDescription === "") {
                        setModalErrorText("The description field can't be empty.")
                        handleOpen()
                    } else {
                        if(newProject.image = "") {
                            setModalErrorText("The image field can't be empty.")
                            handleOpen()
                        } else {

                            console.log(newProject)
    
                            // Chiamata a axios
    
                            // Redirect a pagina campagna
                            navigate(`/campagna/${newProject.projectId}`)
                        }
                        

                    }

                }


            }

        }
    }

    return (
        <div>
            <GridSpacer height="5vh" />
            <Grid container spacing={2} justifyContent="center" style={{ paddingLeft: "5%", paddingRight: "5%" }}>
                <Grid item xl={12} style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <Link to="/" >
                        <IconButton color="primary" aria-label="upload picture" component="label">

                            <ArrowBackIosIcon />
                        </IconButton>
                    </Link>
                    <Button variant="contained" component="label" onClick={saveProject}>
                        Salva

                    </Button>
                </Grid>
            </Grid>
            <GridSpacer height="5vh" />
            <Grid container spacing={2} style={{ paddingLeft: "10%", paddingRight: "10%", height: 350 }}>
                <Grid item xl={6} style={{ width: "50%", height: "100%" }}>
                    <Card style={{ height: "100%",display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
                        <CardActionArea style={{width:"100%", height:"90%", overflow:"hidden"}}>
                        {showUploadButton ? 
                        <FileUploader
                            
                            multiple={false}
                            handleChange={handleImageSelected}
                            name="file"
                            types={fileTypes}
                            style={{height:"90%"}}
                        />
                        :
                            <CardMedia
                                component="img"
                                image={imageSelectedUrl}
                            />
                        }
                        </CardActionArea>
                        <CardActions style={{width:"100%", height:"10%", display:"flex", justifyContent:"center"}}>
                        {showUploadButton ? 
                            <span></span>
                            :
                            <IconButton style={{color:"red"}} aria-label="upload picture" component="label" onClick={cancelImageUpload}>
                                <CancelIcon />
                            </IconButton>
                        }
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xl={6} style={{ width: "50%", height: "100%" }}>
                    <Card style={{ width: "100%", padding: 10, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-around", height: "100%" }}>
                        <TextField value={projectName} onChange={handleProjectNameChange} id="standard-basic" label="Project name" placeholder="Insert project name (required)" variant="standard" required />

                        <TextField
                            value={projectTarget}
                            onChange={handleProjectTargetChange}
                            required
                            id="outlined-number"
                            label="Target"
                            type="number"
                            placeholder="Insert project target (required)"
                            variant="standard"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <DesktopDatePicker
                                label="Ending date"

                                inputFormat="MM/DD/YYYY"
                                value={projectEndingDate}
                                onChange={handleProjectEndingDateChange}
                                renderInput={(params) => <TextField {...params} variant="standard" required />}
                            />
                        </LocalizationProvider>
                    </Card>
                </Grid>
            </Grid>

            <GridSpacer height="2vh" />

            <Grid container spacing={2} style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                <Grid item xl={12} style={{ width: "100%" }}>

                    <Card style={{ width: "100%", padding: 10, boxSizing: "border-box" }}>
                        <TextField
                            required
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={10}
                            placeholder="Insert project description (required)"
                            value={projectDescription}
                            onChange={handleProjectDescriptionChange}
                            style={{ width: "100%" }}
                        />
                    </Card>
                </Grid>

            </Grid>
            <GridSpacer height="10vh" />



            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        ERROR
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {modalErrorText}
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}