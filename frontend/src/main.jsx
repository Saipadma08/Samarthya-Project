import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import axios from "axios";

axios.interceptors.response.use(

  (response) => response,

  (error) => {

    if (

      error.response?.status === 401

      &&

      error.response?.data?.message ===
      "Session expired"

    ) {

      localStorage.clear();

      window.location.href = "/";

    }


    if (

      error.response?.status === 403

      &&

      (

        error.response?.data?.type === "blocked"

        ||

        error.response?.data?.type === "suspended"

      )

    ) {

      window.location.href =
        `/account-disabled?type=${error.response.data.type}
&reason=${encodeURIComponent(
          error.response.data.reason || ""
        )}
&until=${encodeURIComponent(
          error.response.data.until || ""
        )}
&email=${encodeURIComponent(
          error.response.data.email || ""
        )}
`;
    }

    return Promise.reject(
      error
    );

  }

);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)