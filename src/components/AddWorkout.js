
import React, {useState} from 'react'

export default function AddWorkout() {
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [cbpm, setCbpm] = useState('')
    const [desc, setDesc] = useState('')
    const handleNameChange = (e) => {
        console.log('Change event.. ', e.target.value)
        setTitle(e.target.value)
    }
    const AddWorkout = () => {
        console.log('Add workout.. ', title,cbpm,desc)
        //http post
        fetch('http://localhost:8000/Workouts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({title,cbpm,desc})
        })
        .then(res =>{
            console.log(res);
            if(res.status == 201){
                setMessage('workout added successfully!')
            }
        })
      
    }
    return (
        <div>
            {message && <div class="alert alert-success" role="alert">
  {message}
</div>}
            
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Title</span>
                <input  type="text" value={title} onChange={handleNameChange} className="form-control" placeholder="Enter name" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">cbpm</span>
                <input  type="text" value={cbpm} onChange={(e)=>setCbpm(e.target.value)} className="form-control" placeholder="Enter name" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Description</span>
                <input  type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} className="form-control" placeholder="Enter name" aria-label="Username" aria-describedby="basic-addon1" />
            </div>
           
            <div className="input-group mb-3">
               <button onClick={AddWorkout} className='btn btn-primary'>Add Workout</button>
            </div>
        </div>
    )
}
