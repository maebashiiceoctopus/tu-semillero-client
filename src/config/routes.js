//Layout
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';

//Admin page
import Admin from '../pages/Admin';
import AdminSignIn from '../pages/Sign-In/SignIn';
import AdminUsers from '../pages/Users/Users';
import AdminBlog from '../pages/Blog'
//basic pages
import Home from '../pages/Home';
import BlogPosts from '../pages/BlogPosts';
import Contact from '../pages/Contact'
import Error404 from '../pages/Error404'



const routes =[
    {
        path: '/admin',
        component: LayoutAdmin,
        exact: false,
        routes:[
            {
                path:'/admin',
                component: Admin,
                exact:true
            },
            {
                path: '/admin/login',
                component:AdminSignIn,
                exact: true
            },
            {
                path:'/admin/users',
                component: AdminUsers,
                exact:true
            },
            {
                path:'/admin/blog',
                component:AdminBlog ,
                exact:true
            },
            {
                component:Error404
            }
        ]
    },
    {
        path:'/',
        component: LayoutBasic,
        exact:false,
        routes: [
           
            {
                path:'/BlogPosts',
                component: BlogPosts,
                exact:true
            },
            {
                path:'/blog/:url',
                component: BlogPosts,
                exact:true
            },
            {
                path:'/contact',
                component:Contact,
                exact:true
            },
            {
                component:Error404
            }
            
        ]
    }


    
]

export default routes;


