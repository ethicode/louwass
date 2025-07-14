import * as React from 'react';
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Container, Paper, Typography } from "@mui/material";
import { createTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid';
import Home from './Home';
import Login from './Login';
import MenuUser from '../components/menuUser';
import { Route, Routes } from 'react-router-dom';


function MyListings(props) {


    // Remove this const when copying and pasting into your project.


    return (
        <div>

            <h1>MyListings</h1>
        </div>
    );
}

export default MyListings;
