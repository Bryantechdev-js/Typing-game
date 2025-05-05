import React from 'react'
import BackgroundParthern from '../components/backgroundParthern'
import AppNav from '../components/AppNav'

function layout({children}:{children:React.ReactNode}) {
  return <>
    <AppNav/>
    <BackgroundParthern/>

    {children}
    </>
}

export default layout
