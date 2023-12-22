import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import AuthProvider from './firebase/AuthProvider'
import Home from './component/home/Home'
import Root from './component/Root'
import PrivateRoute from './component/PrivateRoute'
import Login from './component/login/Login'
import Registration from './component/login/Registration'
import Dashboard from './component/dashboard/DashBoard'
import Cart from './component/dashboard/Cart'
import AddTask from './component/dashboard/addTask/Addtask'
import ManageTask from './component/dashboard/manageTask/ManageTask'
import AllTask from './component/dashboard/allTask/AllTask'
import AllTasks from './component/allTask/AllTasks'
import Contact from './component/contact/Contact'
import About from './component/about/About'
import PreviousTask from './component/dashboard/previousTask/PreviousTask'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

const router = createBrowserRouter([
  {
    path: "/",
   element: <Root></Root>,
    //errorElement : <ErrorPage></ErrorPage> ,
    children : [
      {
        path: "/",
        element: <Home></Home>,
      },
    
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/allTask",
        element:<PrivateRoute><AllTasks></AllTasks></PrivateRoute> ,
      },
      {
        path: "/contact",
        element:<PrivateRoute><Contact></Contact></PrivateRoute> ,
      },
      {
        path: "/about",
        element:<PrivateRoute><About></About></PrivateRoute> ,
      },
      
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    //errorElement : <ErrorPage></ErrorPage> ,
    children : [
       
      {
        path: "/dashboard",
        element: <Cart></Cart>,
      },
      {
        path: "/dashboard/addTask",
        element: <AddTask></AddTask>,
      },
      {
        path : "/dashboard/manageTask",
        element : <ManageTask></ManageTask>
      },
      {
        path : "/dashboard/allTask",
        element : <AllTask></AllTask>
      },
      {
        path : "/dashboard/previousTask",
        element : <PreviousTask></PreviousTask>
      }
    ]
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render( 
  // <React.StrictMode>
    
  //   {/* <App /> */}

      <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
   
  // </React.StrictMode>,
)