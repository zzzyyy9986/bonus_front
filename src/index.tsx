import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import './scss/main.scss';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QrCheckerPage} from "./components/pages/QrCheckerPage";
import {MainPage} from "./components/pages/MainPage";
import {AddPartnerPage} from "./components/pages/AddPartnerPage";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage/>,
    },

    {
        path: "/qr",
        element: <QrCheckerPage/>
    },
    {
        path: "/main",
        element: <MainPage/>
    },
    {
        path: "/addPartner",
        element: <AddPartnerPage/>
    },
]);


root.render(
  <React.StrictMode>
    {/*<App />*/}
      <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
