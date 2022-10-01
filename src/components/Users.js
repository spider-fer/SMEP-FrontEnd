import { useState, useEffect } from "react"

const API = process.env.REACT_APP_API;

export default function Users() {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [id, setId] = useState('');

    const[editing, setEditing]=useState(false);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!editing){
            const res = await fetch(`${API}/users`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const data = await res.json();
            console.log(data)
        } else{
            const res = await fetch(`${API}/user/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const data = await res.json();
            console.log(data)
            setEditing(false);
            setId('');
        }
        
        await getUsers();
        setName('');
        setEmail('');
        setPassword('');
    }

    const getUsers = async() => {
        const res = await fetch(`${API}/users`);
        const data = await res.json();
        setUsers(data);
    }

    useEffect(() => {
        getUsers();
    },[])

    const deleteUser = async (id) => {
        const res = await fetch(`${API}/user/${id}`, {
            method:'DELETE'
        });
        const data = await res.json();
        console.log(data);
        await getUsers();
    }

    const updateUser =  async (id) => {
        const res = await fetch(`${API}/user/${id}`)
        const data = await res.json();

        setEditing(true);
        setId(id);

        setName(data.name)
        setEmail(data.email)
        setPassword(data.password)
        console.log(data)
    }

    return(
        <div className= "row">
            <h1>Users</h1>
            <div className="col-md-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                        type="text"
                        onChange={e => setName(e.target.value)} 
                        value={name} 
                        placeholder="Name"
                        />
                    </div>
                </form>
            </div>
            <div className="col-md-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                        type="email" 
                        onChange={e => setEmail(e.target.value)} 
                        value={email} 
                        placeholder="Email"
                        />
                    </div>
                </form>
            </div>
            <div className="col-md-4">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                        type="password" 
                        onChange={e =>setPassword(e.target.value)} 
                        value={password} 
                        placeholder="Password"
                        />
                    </div>
                    <button>
                        {editing ? 'Update' : 'Create'}
                    </button>
                </form>
            </div>
            <div className="col md-6">
                <table className = "table-users">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key = {user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                <td>
                                    <button 
                                        className="btn-edit"
                                        onClick ={(e) => updateUser(user._id)}
                                        >
                                        Editar
                                        </button>
                                    <button 
                                        className="btn-delete"
                                        onClick ={(e) => deleteUser(user._id)}
                                        >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}