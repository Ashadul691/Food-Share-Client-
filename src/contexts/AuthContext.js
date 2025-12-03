import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

export const useAuth = () => useContext(AuthContext);

export default useAuth;