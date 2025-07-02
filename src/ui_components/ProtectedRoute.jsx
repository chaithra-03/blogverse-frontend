import { jwtDecode } from 'jwt-decode'
import React, {  useEffect } from 'react'
import { useState } from 'react'
import Spinner from './Spinner'
import { Navigate, useLocation } from 'react-router-dom'
import api from './api'

const ProtectedRoute = ({children}) => {

    const [isAuthorized, setIsAuthorized]  = useState(null)
    const location = useLocation()



    async function refreshToken(){
        const refresh = localStorage.getItem('refresh')
        try{
            const response = await api.post('token_refresh/', {refresh:refresh})
            if(response.status === 200){
                localStorage.setItem('access', response.data.access)
                isAuthorized(true)
            }
            else{
                setIsAuthorized(false)
            }
        }
        catch(err){
            setIsAuthorized(false)

        }
    }

    async function authorize(){
        const token = localStorage.getItem('access')
        if(!token){
            setIsAuthorized(false)
            return
        }
        const decodeToken = jwtDecode(token)
        const expiry_date = decodeToken.exp
        const current_time = Date.now()/1000
        if (current_time > expiry_date){
            await refreshToken()
        }
        else{
            setIsAuthorized(true)
        }
    }

    useEffect(function(){
        authorize().catch(() => setIsAuthorized(false))
    },[])

    if(isAuthorized === null){
        return <Spinner />
    }
  
    return (
    <>
    {isAuthorized ? children :<Navigate to = '/signin' state = {{from: location}} replace  />}
    </>
  )
}

export default ProtectedRoute