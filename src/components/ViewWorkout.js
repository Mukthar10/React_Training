import React, { useState, useEffect } from 'react'

export default function ViewWorkouts() {

  const [workouts, setWorkouts] = useState([])
  useEffect(() => {
    fetch('http://localhost:8000/workouts')
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setWorkouts(data)
      })
  }, [])


  const deleteWorkout = (id) => {

    let fileteredWorkouts = workouts.filter((workout) => workout.id != id)

    fetch('http://localhost:8000/workouts/' + id, {
      method: "DELETE"
    })
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setWorkouts(fileteredWorkouts)
      })
  }

  const startTime = (id) => {
    fetch('http://localhost:8000/workouts/' + id, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ startTime: new Date() })
    })
  }

  const EndTime = (id, startTime, cbpm) => {
    let EndTime = new Date();
    let Totalcalorieburn = getDifferenceInMinutes(new Date(startTime), EndTime, cbpm);
    console.log(Totalcalorieburn);
    fetch('http://localhost:8000/workouts/' + id, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ EndTime, TotalCalories: Totalcalorieburn })
    })
      .then(res => {
        console.log(res);
      })
  }

  function getDifferenceInMinutes(startTime, EndTime, cbpm) {
    const diffInMs = Math.abs((EndTime - startTime) * cbpm);
    return diffInMs / (1000 * 60);
  }



  let workoutList = workouts.map((workout) => {
    return (
      <tr key={workout.id}>
        <th scope="row">{workout.id}</th>
        <td>{workout.title}</td>
        <td>{workout.cbpm}</td>
        <td>{workout.desc}</td>
        <td><button onClick={() => deleteWorkout(workout.id)} className='btn btn-danger'> Delete </button></td>
        <td><button onClick={() => startTime(workout.id)} className='btn btn-secondary'> Go </button></td>
        <td><button onClick={() => EndTime(workout.id,workout.startTime,workout.cbpm)} className='btn btn-dark'> Stop </button></td>
        <td>{workout.TotalCalories}</td>
      </tr>
    )
  })


  return (
    <table className="table table-info table-hover">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">TITLE</th>
          <th scope="col">cbpm</th>
          <th scope="col">DESCRIPTION</th>
          <th scope="col">DELETE</th>
          <th scope="col">START WORKOUT</th>
          <th scope="col">END WORKOUT</th>
          <th scope="col">Total Calories Burn</th>
        </tr>
      </thead>
      <tbody>
        {workoutList}
      </tbody>
    </table>
  )
}




