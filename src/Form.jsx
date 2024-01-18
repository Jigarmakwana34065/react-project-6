import React, { useEffect, useState } from 'react'

const Form = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [record, setRecord] = useState([])
    const [edit, setEdit] = useState('')
    let id = Math.floor(Math.random() * 10000)

    const handleSubmit = () => {
        let obj = {
            id, name, email, password
        }

        if (edit) {
            let rec = [...record]
            let ans = rec.map((val) => {
                if (val.id == edit) {
                    return {
                        ...val,
                        name: name,
                        email: email,
                        password: password
                    }
                }
                return val
            })
            setRecord(ans)
            localStorage.setItem('user', JSON.stringify(ans))
            setEdit('')
        }
        else {
            let allData = [...record, obj]

            localStorage.setItem('user', JSON.stringify(allData))

            setRecord(allData)
        }

        setName('')
        setEmail('')
        setPassword('')
    }

    const deleteData = (id) => {
        let deleteRecord = record.filter((val) => {
            return val.id != id
        })

        setRecord(deleteRecord)

        localStorage.setItem('user',JSON.stringify(deleteRecord))
 
        console.log(deleteRecord);
    }

    const editData = (id) => {
        let editRecord = record.find((val) => {
            return val.id == id
        })

        console.log(editRecord);

        setEdit(id)
        setName(editRecord.name)
        setEmail(editRecord.email)
        setPassword(editRecord.password)
    }

    useEffect(() => {
        let oldData = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : []

        setRecord(oldData)
    }, [])

    return (
        <>
            <div className="container">


                <form className='loginForm col-5'>

                    <h1>User Login</h1>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" onChange={(e) => setName(e.target.value)} value={name} placeholder='Name' />
                    </div>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Email' />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Password' />
                    </div>
                    <div className="mb-3">
                    {
                        edit ? <button type="button" className="btn btn-primary" onClick={handleSubmit}>edit</button> : <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    }
                    </div>
                    
                </form>
                {/* table start  */}

                <table class="table col-5">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Password</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            record && record.map((val) => {
                                return (
                                    <tr>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>{val.email}</td>
                                        <td>{val.password}</td>
                                        <td>
                                            <button className='deletebtn' onClick={() => deleteData(val.id)}><i class="fa-solid fa-trash-can"></i></button>
                                            <button className='editbtn' onClick={() => editData(val.id)}><i class="fa-solid fa-pen-to-square"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Form