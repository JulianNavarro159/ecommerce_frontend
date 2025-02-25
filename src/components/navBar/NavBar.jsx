import { useAuth0 } from "@auth0/auth0-react";
import { useUserAuthentication } from '../../hooks/useUserAuthentication';
import * as React from 'react';
import { Link } from "react-router-dom";
import { Box, Container, IconButton, Typography, AppBar, Toolbar, Menu, MenuItem, Button, Tooltip, Avatar } from '@mui/material';
// import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import CartShoppingIcon from '../../cartShooping/component/CartShoopingIcon';
import { SearchBar } from '../searchBar';
import { useGetIsActiveQuery } from "../../store/api/ecommerceUserApi";
import Swal from 'sweetalert2';
import styles from './NavBar.module.css';

const pages = ['Inicio', 'Productos', 'Carrito de Compras'];

export const NavBar = () => {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const userData = useUserAuthentication(user, isAuthenticated);
    
    const { data: isActive, isLoading } = useGetIsActiveQuery(user?.email, {
        skip: !isAuthenticated || !user?.email,
        refetchOnMountOrArgChange: true
    });

    const [anchorNav, setAnchorNav] = React.useState(null);
    const [anchorUser, setAnchorUser] = React.useState(null);

    const handleOpenNavMenu = (event) => setAnchorNav(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorNav(null);
    const handleOpenUserMenu = (event) => setAnchorUser(event.currentTarget);
    const handleCloseUserMenu = () => setAnchorUser(null);

    React.useEffect(() => {
        if (isAuthenticated && !isLoading && isActive === false) {
            Swal.fire({
                icon: 'error',
                title: '¡Cuenta bloqueada!',
                text: 'Por favor, contacte al soporte: ecommercetech2024@gmail.com',
                confirmButtonText: 'Cerrar',
                customClass: {
                    confirmButton: styles['swal-confirm-button']
                }
            }).then(() => {
                logout({ returnTo: window.location.origin });
            });
        }
    }, [isAuthenticated, isActive, isLoading, logout]);

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/">
                        <Box 
                            component="img"
                            alt="logo"
                            sx={{ mr: 2, height: 80, width: 80, display: { xs: 'none', md: 'flex' } }}
                            src="/logo.svg"
                        />
                    </Link>

                    {/* Menú responsive */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" onClick={handleOpenNavMenu} color="black">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorNav}
                            open={Boolean(anchorNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {pages.map((page, index) => (
                                <Link 
                                    key={index} 
                                    to={page === "Inicio" ? "/" : page === "Productos" ? "/products" : "/cartShopping"} 
                                    style={{ textDecoration: 'none', color: "black" }}
                                >
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>

                    {/* Menú desktop */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Link key={index} to={page === "Inicio" ? "/" : page === "Productos" ? "/products" : "/cartShopping"} style={{ textDecoration: 'none' }}>
                                {page === "Carrito de Compras" ? (
                                    <CartShoppingIcon sx={{ color: 'black', ml: 2 }} />
                                ) : (
                                    <Button sx={{ color: 'black', fontWeight: "bold" }}>
                                        {page}
                                    </Button>
                                )}
                            </Link>
                        ))}
                    </Box>

                    {/* Barra de búsqueda */}
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <SearchBar />   
                    </Box>

                    {/* Usuario */}
                    <Box>
                        {isAuthenticated ? (
                            <>
                                <Tooltip>
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>  
                                        <Typography 
                                            variant="body1" 
                                            color="black"
                                            sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}
                                        >
                                            {userData?.nameUser || user?.given_name || "Usuario"}
                                        </Typography>                                              
                                        <Avatar 
                                            alt={userData?.nameUser || user?.given_name || "Usuario"} 
                                            src={userData?.pictureUser || user?.picture || "/static/images/avatar/default.png"} 
                                        />
                                    </IconButton>                                            
                                </Tooltip>

                                {/* Menú usuario */}
                                <Menu
                                    sx={{ mt: '45px' }}
                                    anchorEl={anchorUser}
                                    open={Boolean(anchorUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {[
                                        { label: "Perfil", path: "/user" },
                                        userData?.isAdmin ? { label: "Panel Administrador", path: "/admin" } : null,
                                        { label: "Salir", path: "/" }
                                    ].filter(Boolean).map(({ label, path }, index) => (
                                        <Link key={index} to={path} style={{ textDecoration: 'none', color: "black" }}>
                                            <MenuItem onClick={label === "Salir" ? () => logout({ returnTo: '/' }) : handleCloseUserMenu}>
                                                <Typography textAlign="center">{label}</Typography>
                                            </MenuItem>
                                        </Link>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            <Tooltip>
                                <IconButton sx={{ p: 0 }} onClick={loginWithRedirect}>
                                    <Typography variant="body1" color="black" sx={{ mr: 1, display: { xs: 'none', md: 'flex' } }}>
                                        Iniciar sesión
                                    </Typography>
                                    <Avatar alt="Usuario" src="/static/images/avatar/default.png" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
