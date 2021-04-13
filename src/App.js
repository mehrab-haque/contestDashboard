import React from 'react'
import { useHistory } from "react-router-dom";
import {BrowserRouter,Route} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardHome from "./dashboard/Home";
import AdminHome from "./admin/Home";

var showToast

function App() {

  const history=useHistory()

  showToast=message=>{
    toast.dark(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
      <div>
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
        <BrowserRouter history={history}>
          <Route path = "/" exact component={DashboardHome}/>
          <Route path = "/admin" exact component={AdminHome}/>
        </BrowserRouter>
      </div>
  );
}

export default App;
export {showToast}
