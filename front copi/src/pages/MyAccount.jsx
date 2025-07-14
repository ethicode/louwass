import * as React from 'react';
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
import Home from './Home';
import Login from './Login';
import MenuUser from '../components/menuUser';
import Dashboard from './Dashboard';
import { CarRental, House, Settings, Verified, VerifiedUser } from '@mui/icons-material';
import MyReservations from '../components/MyReservations';
import MesAnnonces from '../components/MesAnnonces';

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'mes-infos',
        title: 'Informations personnelles',
        icon: <DashboardIcon />,
    },
    {
        segment: 'mes-annonces',
        title: 'Mes annonces',
        icon: <House />,
    },
    {
        segment: 'mes-reservations',
        title: 'Mes reservations',
        icon: <House />,
    },
    {
        segment: 'paiements',
        title: 'Paiements et facturation',
        icon: <House />,
    },
    {
        segment: 'preferences',
        title: 'Preferences et parametres',
        icon: <Settings />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Mon compte',
        icon: <Verified sx={{color:'blue'}} />,
    },
];


const demoTheme = createTheme({
    colorSchemes: { light: true, dark: true },
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
});

function useDemoRouter(initialPath) {
    const [pathname, setPathname] = React.useState(initialPath);

    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path) => setPathname(String(path)),
        };
    }, [pathname]);

    return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
}));


function DemoPageContent({ pathname }) {
    if (pathname === '/mes-infos') return <Dashboard />;
    if (pathname === '/mes-reservations') return <MyReservations />;
    if (pathname === '/mes-annonces') return <MesAnnonces />;
    return (
        <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="h4">Page non trouvée</Typography>
        </Box>
    );
}

function MyAccount(props) {
    const { window } = props;

    const router = useDemoRouter('/dashboard');

    // Remove this const when copying and pasting into your project.


    return (
        <div>
            <Navbar />
            <AppProvider
                navigation={NAVIGATION}
                router={router}
                theme={demoTheme}
            >
                <DashboardLayout
                    slots={{
                        appTitle: "null",
                        // toolbarActions: ToolbarActionsSearch,
                        // sidebarFooter: SidebarFooter,
                    }}>
                    <DemoPageContent pathname={router.pathname} />
                </DashboardLayout>
            </AppProvider>
            <MenuUser></MenuUser>
        </div>
    );
}

export default MyAccount;
