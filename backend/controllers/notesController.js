const Users = require('../models/User')
const Notes = require('../models/Note')
const asyncHandler = require('express-async-handler')


// @desc Get all Notes
//@route Get /notes
//@access private

const getAllNotes = asyncHandler( async(req,res)=>{
    const notes = await Notes.find().lean()

    if(!notes?.length){
        return res.status(400).json({message: 'No note found'})
    }
    
    //Add username to each note before sending the response
    
    const noteWithUser = await Promise.all(notes.map(async (note) =>{
        const user = await Users.findById(note.user).lean().exec()
        return {...note, username: user.username}
    }))
    
    res.json(noteWithUser)
})

// @desc POST new Note
//@route POST /notes
//@access private

const createNewNote = asyncHandler( async(req,res)=>{
    const {user,title,text} =req.body
    
    //check for valid inputs
    if(!user || !title || !text){
        res.status(400).json({message: 'All fields are required'})
    }
    //check for conflicting title
    const duplicate = await Notes.findOne({title}).lean().exec()

    if(duplicate){
        return res.status(409).json({message: `Oops you already have a note with the title ${title}.`})
    }
    const noteObject ={user, title, text}
    const note = Notes.create(noteObject)
    if(note){
        res.status(201).json({message: 'Note created successfully'})
    }
    else{
        res.status(400).json({message: 'Invalid note inputs received!'})
    }
})

// @desc UPDATE all Notes
//@route UPDATE /notes
//@access private

const updateNote = asyncHandler( async(req,res)=>{
    const {id,user, title, text, completed} = req.body

    //confirm data
    if(!id || !user || !title || !text || typeof completed != 'boolean'){
        return res.status(400).json({message: 'all field required'})
    }
    //fetch note by Id
    const note = await Notes.findById(id).exec()
    if(!note){
        return res.status(400).json({message: 'Note not found'})
    }
    //check if the title exist already
    const duplicate = await Notes.findOne({title}).lean().exec()

    if(duplicate && duplicate?._id.toString() != id){
        return res.status(409).json({message: 'Duplicate Note'})
    }

    //update fields
    note.user = user
    note.title = title
    note.text = text
    note.completed = completed

    //save changes
    const updatedNote = note.save()

    res.json({message: `${updatedNote.title} updated`})


})

// @desc DELETE a  Note
//@route DELETE /notes
//@access private

const deleteNote = asyncHandler( async(req,res)=>{
    const {id} =req.body
    
    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }


    const note = Notes.findById(id).exec()
    if(!note){
        return res.status(400).json({message: 'Note not found'})
    }
    const result = await note.deleteOne()
    const reply = `Note ${result.title} with ID ${result._id} deleted successfully`
    res.json(reply)
})

module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}