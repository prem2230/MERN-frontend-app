import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import apiRequest from './apiRequest';

function UpdateModal({setIsUpdate,task,API_URL,setFetchError}) {
    const [updatedTitle,setUpdatedTitle] = useState('')
    const [updatedDescription,setUpdatedDescription] = useState('')

    useEffect(()=>{
        setUpdatedTitle(task.title)
        setUpdatedDescription(task.description)
    },[task])

    const handleUpdate = async(_id)=>{
        // const myItem = items.filter((item)=>item._id ===_id)
        const updateOptions = {
         method:'PATCH',
         headers:{
         'Content-Type':'application/json'
         },
         body:JSON.stringify({
            title: updatedTitle, 
            description: updatedDescription})
         }
        const reqUrl = `${API_URL}/${task._id}`
        const result = await apiRequest(reqUrl,updateOptions)
        if(result) setFetchError(result)
        setIsUpdate(false)
    }
  return (
    <div className='updateContainer'>
        <div className='closebtn'>
            <button onClick={()=>setIsUpdate(false)}><IoClose /></button>
        </div>
        <div className='updateList'>
            <form>
                <div className="input">
                <label>Task Title</label>
                <input 
                type="text"
                value={updatedTitle}
                onChange={(e)=>setUpdatedTitle(e.target.value)} />
                </div>
               <div className="input">
               <label>Task Description</label>
                <input 
                type="text"
                value={updatedDescription}
                onChange={(e)=>setUpdatedDescription(e.target.value)} />
               </div>
                <div className='btns'>
                    <button onClick={()=>setIsUpdate(false)}>Cancel</button>
                    <button onClick={()=>handleUpdate()}>Update</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default UpdateModal