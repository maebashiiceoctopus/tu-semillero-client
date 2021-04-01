//Layout
import LayoutAdmin from '../layouts/LayoutAdmin';

//Admin page
import AdminHome from '../pages/Admin-page/Admin';
import AdminSignIn from '../pages/Admin-page/SignIn';

const routes =[
    {
        path: '/admin',
        component: LayoutAdmin,
        exact: false,
        routes:[
            {
                path:'./admin',
                component: AdminHome,
                exact:true
            },
            {
                path: '/admin/login',
                component:AdminSignIn,
                exact: true
            }
        ]
    }
    
]

export default routes;