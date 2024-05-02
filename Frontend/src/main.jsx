import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import store from './redux/store.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Routing.jsx'
import {Provider} from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <RouterProvider router={router} />
  </Provider>
)
