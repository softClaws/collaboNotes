import { apiSlice } from "../../app/api/ApiSlice";
import {logOut, setCredentials} from "./AuthSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        login: builder.mutation({
          query: credentials =>({  
            url: '/auth',
            method: 'POST',
            body: {...credentials}
          })
        }),
        sendLogout: builder.mutation({
            query: ()=>({
                url : '/auth/logout',
                method: 'POST'

            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}){
                try{
                    await queryFulfilled //returns a data props
                    dispatch(logOut()) //set token to null in local state
                    setTimeout(()=>{
                        dispatch(apiSlice.util.resetApiState())

                    }, 
                    1000) // clears api slice
                }catch(err){
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: ()=>({
                url:'/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}){
                try {
                    const {data} = await queryFulfilled
                    // console.log(data)
                    const {accessToken} = data
                    dispatch(setCredentials({accessToken}))
                    
                } catch (error) {
                    console.log(error)
                    
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation
} = authApiSlice