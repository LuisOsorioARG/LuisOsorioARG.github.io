import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from '../ui/components/ ChekingAuth';
import { Navigate } from "react-router-dom";
import { useCheckAuth } from '../hooks/useCheckAuth'; 


export const AppRouter = () => {

    //llevamos todo el tratamiento del status al useCheckAuth que es un nuevo hook
    const status = useCheckAuth(); 

    if ( status === 'checking' ) {
        return <CheckingAuth />
    }

    return (
        <Routes>
  
            {
            (status === 'authenticated')
            ? <Route path="/*" element={ <JournalRoutes /> } />
            : <Route path="/auth/*" element={ <AuthRoutes /> } />
            }

            <Route path='/*' element={ <Navigate to='/auth/login' />  } />

            {/* Login y Registro */}
            {/* <Route path="/auth/*" element={ <AuthRoutes /> } /> */}

            {/* JournalApp */}
            {/* <Route path="/*" element={ <JournalRoutes /> } /> */}

        </Routes>
    );


}