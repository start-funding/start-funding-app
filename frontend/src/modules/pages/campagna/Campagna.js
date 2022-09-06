import React from "react";
import { useParams } from "react-router-dom";

export default function Campagna() {

    let { id } = useParams();

    return(
        <h1>Campagna {id} </h1>
    )
}