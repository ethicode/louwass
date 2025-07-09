import React, { useState } from 'react';
import { Button, Divider, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined';
import { Link } from 'react-router-dom';
import StyledMenu from './StyledMenu'; // remplace par le chemin correct de ton StyledMenu

const UserMenu = ({ name, handleLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {name || 'Options'}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                slotProps={{
                    list: {
                        'aria-labelledby': 'demo-customized-button',
                    },
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem component={Link} to="/myaccount" onClick={handleClose} disableRipple>
                    <FileCopyIcon />
                    Informations personnelles
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <EditIcon />
                    Mes annonces
                </MenuItem>
                <MenuItem component={Link} to="/myaccount" onClick={handleClose} disableRipple>
                    <FileCopyIcon />
                    Mes réservations
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose} disableRipple>
                    <ArchiveIcon />
                    Paiements et facturation
                </MenuItem>
                <MenuItem component={Link} to="/myaccount" onClick={handleClose} disableRipple>
                    <FileCopyIcon />
                    Préférences et paramètres
                </MenuItem>
                <MenuItem onClick={handleLogout} disableRipple>
                    <LogoutOutlined />
                    Déconnexion
                </MenuItem>
            </StyledMenu>
        </div>
    );
};

export default UserMenu;
