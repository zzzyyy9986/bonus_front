import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import './scss/main.scss';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QrCheckerPage} from "./components/pages/QrCheckerPage";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello world!2</div>,
    },
    {
        path: "/qr",
        element: <QrCheckerPage/>
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
