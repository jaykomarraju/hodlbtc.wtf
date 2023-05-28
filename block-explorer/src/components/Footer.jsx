import React, {useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #020202;
    color: #fff;
    width: 100vw;
    `;

    