//Import required things

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Action.css';
import React, { useState, useEffect } from 'react';

function Action() {
    //datau is set data in API through 'PUT' method (using react hook useState)
    const [datau, setDatau] = useState({
        id: '',
        name: '',
        phone: '',
    })

    //message sector if data is updated or not
    const [msg, setMsg] = useState('')

    //use useEffect to store all API value in data and initially it is empty array
    const [data, setData] = useState([]);

    //fetch All API data and setdata through hooks
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((res) => { return res.json() })
            .then((list) => {
                console.log(list);
                //setData(list)
                getData(list)
            })
    }, [])

    const getData = (resData) => {
        setData(resData)
    }

    //Function for handle delete
    const deleteHandle = (id) => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            console.log(res)
            return res.json();
        }).then((resData) => {
            console.log(resData)
        })
        const newData = data.filter((elem) => {
            return elem.id != id
        })
        setData(newData);
    }

    //function for apply PUT method
    const UpdateData = (e) => {
        document.getElementById('clearForm').reset();
        e.preventDefault();

        fetch(`https://jsonplaceholder.typicode.com/users/${datau.id}`, {
            method: "PUT",
            body: JSON.stringify({
                id: datau.id,
                name: datau.name,
                phone: datau.phone
            }),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        }).then((response) => response.json())
            .then((json) => {
                console.log(json)
                setMsg('Data updated successfully')
                data[json.id - 1] = json;
                const newdata = data;

                console.log(newdata);
                setData([])
                setData(newdata);

            })

            .catch((err) => {
                setMsg('Data not updated')
            })

    }

    //Function for apply POST method
    const AddData = (e) => {
        document.getElementById('clearForm').reset();
        e.preventDefault();
        fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            body: JSON.stringify({
                id: datau.id,
                name: datau.name,
                phone: datau.phone
            }),
            headers: {
                'content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) => { return res.json() })
            .then(resdata => {
                console.log(resdata);
                setData([...data, resdata]);
                setMsg('Data Added')
            })
            .catch((err) => {
                setMsg('Data not Added');
            })
    }
    // JSX return data
    return (
        <div>
            <div className='FormData' >
                <form id='clearForm'>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">ID</label>
                        <input type="txt" className="form-control" onInput={(e) => setDatau({ ...data, id: e.target.value })} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='id' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Name</label>
                        <input type="text" className="form-control" onInput={(e) => setDatau({ ...datau, name: e.target.value })} id="exampleInputPassword1" placeholder='name' />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">PhoneNo</label>
                        <input type="text" className="form-control" onInput={(e) => setDatau({ ...datau, phone: e.target.value })} id="exampleInputPassword1" placeholder='phone' />
                    </div>

                    <button type="submit" onClick={UpdateData} className="btn btn-primary">UPDATE</button>
                    <button type="submit" onClick={AddData} className="btn btn-primary">ADD</button>
                </form>
                <h3>{msg}</h3>
            </div>

            <div className='flex'>


                {data.map((element) => {
                    return (
                        <div key={element.id}>
                            <div className="card" Style="width: 20rem;">
                                <div className="card-body">
                                    <h5 className="card-title">ID : {element.id}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Name : {element.name}</h6>
                                    <p className="card-text">Phone : {element.phone}</p>
                                    <button type="button" className="btn btn-danger" onClick={() => deleteHandle(element.id)} value={element.id}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}

export default Action;
