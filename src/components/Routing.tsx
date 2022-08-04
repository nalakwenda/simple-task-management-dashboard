import {useAppSelector} from '../redux/hooks';
import {Navigate, useNavigate} from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized';
import {userDetails} from '../redux/slices/AuthSlice';

interface Props
{
    component: React.ComponentType
}

export const PrivateRoute: React.FC<Props> = ({component: RouteComponent }) =>
{
    const {token} = useAppSelector(userDetails);
  

    if (token) {

        return <RouteComponent />
    }

    return <Navigate to="/" />
}
