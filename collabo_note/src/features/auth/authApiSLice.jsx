import { apiSlice } from "../../app/api/apiSlice";
import {logOut} from "./authSlice"

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
                url : '/auth/post',
                method: 'POST',

            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}){
                try{
                    await queryFulfilled //returns a data props
                    dispatch(logOut()) //set token to null in local state
                    dispatch(apiSlice.util.resetApiState()) // clears api slice
                }catch(err){
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: ()=>({
                url:'/auth/refresh',
                method: 'GET',
            })
        })
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation
} = authApiSlice