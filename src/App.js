import { useEffect, useState } from 'react';
import './App.css';
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import apiRequest from './apiRequest';
import UpdateModal from './UpdateModal';

function App() {

  const API_URL = 'https://mern-app-zt5o.onrender.com/api'
  const [items,setItems] = useState([])
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [fetchError,setFetchError] = useState(null)
  const [isUpdate,setIsUpdate] = useState(false)
  const [updateTaskData,setUpdateTaskData] = useState('')




  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Data not found');
        const listItems = await response.json();
        if (Array.isArray(listItems)) {
          setItems(listItems);
        }
      } catch (err) {
        setFetchError( err.message);
      }
    };
  
    fetchItems();
  }, []);
  
  
const handleAddTask = async ()=>{
  const addNewTask = {title,description}
  const listItems = [...items, addNewTask]
  setItems(listItems)

  const postOptions = {
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(addNewTask)
  }
  const result = await apiRequest(API_URL,postOptions)
  if(result)setFetchError(result)

}

const handleDeleteTask = async(_id)=>{
  const listItems = items.filter((item)=>item._id !== _id)
  setItems(listItems)

  const deleteOptions = {
    method :'DELETE'
  }
  const reqUrl = `${API_URL}/${_id}`
  const result = await apiRequest(reqUrl,deleteOptions)
  if(result)setFetchError(result)
}

const handleUpdateTask = (item)=>{
  setIsUpdate(true)
  setUpdateTaskData(item)
  
}
  

  return (
    <div className="App">
    <header className='header'>
      <h1>Task Management</h1>
    </header>
    <div className='addTask'>
      <form onSubmit={()=>handleAddTask()}>
        <div className='input'>
          <label >Task Title</label>
          <input 
          type="text" 
          required
          placeholder='enter task title'
          value={title}
          onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div className='input'>
          <label >Task Description</label>
          <input 
          required
          type="text" 
          placeholder='enter task description'
          value={description}
          onChange={(e)=>setDescription(e.target.value)} />
        </div>
        <div>
          <button type='submit'>Add Task</button>
        </div>
      </form>
    </div>
    <div className="taskList">
    <table>
  <thead>
    <tr>
      <th>S.no</th>
      <th>Title</th>
      <th>Description</th>
      <th>Action</th>
    </tr>
  </thead>
  {fetchError && <p>{`Error : ${fetchError}`}</p>}
  {!fetchError &&
  <tbody>
  {items.map((item, index) => (
    <tr key={item._id}>
      <td>{index+1}</td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>
        <button 
        onClick={()=>handleUpdateTask(item)}>
          <FaEdit />
        </button>
        <button
        onClick={()=>handleDeleteTask(item._id)}
        >
          <MdOutlineDeleteOutline />
        </button>
      </td>
    </tr>
  ))}
</tbody>}
</table>


      
    </div>
   {isUpdate &&<UpdateModal 
   setIsUpdate = {setIsUpdate}
    task = {updateTaskData}
    API_URL={API_URL}
    setFetchError={setFetchError}
    items={items}
    />}
    </div>
  );
}

export default App;
