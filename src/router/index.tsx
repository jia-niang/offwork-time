import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from '@/pages/Home'
import Setting from '@/pages/Setting'

const routerTable = [
  { path: '/', component: Home, exact: true },
  { path: '/setting', component: Setting },
]

const router: React.FC = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Switch>
      {routerTable.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </Switch>
  </BrowserRouter>
)

export default router
