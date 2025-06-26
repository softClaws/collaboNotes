import { apiSlice } from "../../app/api/apiSlice";
import { createEntityAdapter,createSelector } from "@reduxjs/toolkit";


 const notesAdapter = createEntityAdapter({
    sortComparer: (a,b) =>(a.completed == b.completed)? 0: a.completed? 1 : -1
 })

 const initialNotes = notesAdapter.getInitialState();

 export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder =>({
        getNotes: builder.query({
            query: ()=>'/notes',
            validateStatus: (response, result) =>{
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5, //this is the number of seconds the cache should hold data before reload
            transformResponse: response =>{
                const loadedNotes = response.map(note=>{
                    note.id = note._id // normalized data expect an id props and not _id , thus the changing the props to note.id and then return the note object
                    return note
                })
                return notesAdapter.setAll(initialNotes, loadedNotes) // this entity adapter method(setAll) is used to makes changes throughout the data
            },
            providesTags:(result, err, arg) =>{
                if(result?.ids){ // handling possibility of result not having ids. this maybe due to unexpected error
                    return [
                        {type: 'Notes', id: "LIST"},
                        ...result.ids.map(id =>({type: 'Notes', id}))
                    ]
                } else return [{type: 'Notes', id: 'LIST'}]
            }

        })
    })
 })

 export const {
    useGetNotesQuery,
 } = notesApiSlice

 //return the getNotes query result
 export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

 const selectNotesData = createSelector(selectNotesResult,
    notesResult => notesResult.data //this normalized the state object with ids and entity
 )

 //getSelectors create these three selectors by default
 //selectAll, selectById, selectIds
 
 export const{
    selectAll: selectAllNotes,//renamed to selectAllNotes
    selectById: selectNoteById, // renamed to selectNoteById
    selectIds: selectNotesIds
 } = notesAdapter.getSelectors(state => selectNotesData(state)?? initialNotes )