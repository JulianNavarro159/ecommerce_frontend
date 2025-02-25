import { useState, useEffect } from 'react';
import { 
  usePostCreateUserMutation, 
  useGetUserByEmailQuery, 
  useGetTokenByEmailQuery, 
  useGetUserByTokenQuery 
} from './../store/api/ecommerceUserApi';

export const useUserAuthentication = (user, isAuthenticated) => {
  const [token, setToken] = useState(localStorage.getItem('token')); // Estado para manejar el token
  const [createUser, { isLoading }] = usePostCreateUserMutation();
  const { data: existingUser } = useGetUserByEmailQuery(user?.email, { skip: !isAuthenticated });
  const doesUserExist = Boolean(existingUser);
  const { data: tokenData } = useGetTokenByEmailQuery(user?.email, { skip: !isAuthenticated || !doesUserExist });
  
  const { data: userData, refetch: refetchUserData } = useGetUserByTokenQuery(token, { skip: !token });

  useEffect(() => {
    if (isAuthenticated) {
      if (!doesUserExist && !isLoading) {
        // Crear el usuario si no existe
        let postDataUser = {
          email: user.email,
          email_verified: user.email_verified,
          family_name: user.family_name,
          given_name: user.given_name,
          picture: user.picture
        };

        createUser(postDataUser)
          .then(response => {
            if (response.data) {
              localStorage.setItem('token', response.data);
              setToken(response.data); // Actualiza el estado del token
              refetchUserData();
            }
          })
          .catch(error => {
            console.error("Error al crear usuario:", error);
          });
      } else if (doesUserExist && tokenData) {
        // Si el usuario existe, obtener el token
        localStorage.setItem('token', tokenData);
        setToken(tokenData); // Actualiza el estado del token
      }
    }
  }, [isAuthenticated, doesUserExist, isLoading, tokenData, refetchUserData]);

  return userData;
};