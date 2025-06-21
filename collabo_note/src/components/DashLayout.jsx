import {Outlet} from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'

export const DashLayout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <DashHeader/>
        <div className="dash-container flex flex-col flex-1">
              <Outlet/>
              
        </div>
        <DashFooter/>
    </div>
  )
}
