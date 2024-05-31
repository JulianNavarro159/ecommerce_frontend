import { Avatar, Box, Button, Grid, Typography } from "@mui/material"
import { Person as PersonIcon } from "@mui/icons-material"
import { useGetUserByTokenQuery } from "../../store/api/ecommerceUserApi";
import { Link } from "react-router-dom";

const TOKEN = localStorage.getItem('token');

export const UserInfo = () => {
  const { data: userData, isLoading } = useGetUserByTokenQuery(TOKEN);

  const orderStatuses = [
    { count: '16', status: 'Ordenes' },
    { count: '02', status: 'Por pagar' },
    { count: '00', status: 'Por enviar' },
    { count: '01', status: 'Por recibir' },
  ];

  const userFields = [
    { label: 'Nombres', value: userData?.nameUser || ''},
    { label: 'Apellidos', value: userData?.lastNameUser || ''},
    { label: 'Email', value: userData?.emailUser || '' },
    { label: 'Telefono', value: userData?.numberMobileUser || 'No agregado' },
  ];
  
  if (isLoading || !userData?.activeUser) {
    return null;
  }

  return (
    <Grid item xs={12} md={12} lg={8} sx={{display: 'flex', width: { xs: '100%'}, p: 2}}>
      <Grid container>
        <Grid item xs={12} margin={2}>
          <ProfileHeader />
          <ProfileBody />
        </Grid>
      </Grid>
    </Grid>
  )

  function ProfileHeader() {
    return (
      <Typography variant="h4" sx={{mt: 4, pb: 2, mb: 0, borderRadius: 4, display: 'flex', justifyContent: 'space-between', fontWeight: 'bold'}}>
        <div>
          <PersonIcon sx={{fontSize: 40, mr: 3, color: 'primary.dark'}}/>
          Mi perfil
        </div>
        <Link to="/user/editUser" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button variant="outlined">Editar perfil</Button>
        </Link>
      </Typography>
    )
  }

  function ProfileBody() {
    return (
      <Grid container spacing={1} gap={3} sx={{mt:1}}>
        <ProfileAvatar />
        <OrderStatuses />
        <UserFields />
      </Grid>
    )
  }

  function ProfileAvatar() {
    return (
      <Grid xs={12} md={12} lg={6} sx={{backgroundColor: '#fff', borderRadius:2}}>
        <Box sx={{ display: 'flex', alignItems: 'center', m: 3}}>
          <Avatar alt={userData.nameUser}  src={userData.pictureUser} sx={{width: { xs: 70, sm: 40 }, height: { xs: 60, sm: 40 }}} />                                          
          <Typography variant="body1" sx={{ ml: 1, display: { md: 'flex' }, fontSize: 18}}>
            {userData.nameUser} {userData.lastNameUser}
          </Typography>                                                
        </Box>
      </Grid>
    )
  }

  function OrderStatuses() {
    return orderStatuses.map((status, index) => (
      <Grid key={index} xs={5} md={2} lg={1} sx={{backgroundColor: '#fff', borderRadius:2, marginRight: index === orderStatuses.length - 1 ? 0 : 'auto'}}>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%'}}>
          <Typography sx={{textAlign: 'center', color: 'primary.main', fontSize: 22}}>
            {status.count}
          </Typography>
          <Typography variant="body1" sx={{fontSize: 12, textAlign: 'center'}}>
            {status.status}
          </Typography>
        </Box>
      </Grid>
    ))
  }

  function UserFields() {
    return (
      <Grid xs={12} sx={{backgroundColor: '#fff', borderRadius: 2}}>
        <Box sx={{display: 'flex', lexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between'}}>
          {userFields.map((field, index) => (
            <Grid key={index} xs={2} sx={{backgroundColor: '#fff', borderRadius:2}}>
              <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'left', height: '100%', pb: 2, m: 4}}>
                <Typography sx={{textAlign: 'left', color: 'primary.main', fontSize: 12}}>
                  {field.label}
                </Typography>
                <Typography variant="body1" sx={{fontSize: 15, textAlign: 'left'}}>
                  {field.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Box>
      </Grid>
    )
  }
}