import React from 'react'
import { Outlet } from 'react-router-dom'
import { MenuDashboard } from '../../components/menu/MenuDashboard'
import style from './Dashboard.module.css'

export function Dashboard() {
  return (
    <div className={style.Dashboard}>
      <div className={style.Menu}>
        <MenuDashboard />
      </div>
      <div className={style.container}>
      <Outlet />
      </div>
    </div>
  )
}
