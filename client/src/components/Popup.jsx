import React, {useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import { editUser } from "../redux/features/users";

function Popup({visible,onClose, userCurrent}) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const id = userCurrent?._id;

    useEffect(() => {
        setEmail(userCurrent?.email);
        setName(userCurrent?.fullName)
        },[userCurrent])

    const dispatch  = useDispatch()

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangeName = (e) => {
        setName(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleEditUser = async () => {
        await dispatch(
            editUser(id , {name,email,password})).then( () => {
                onClose()
        })
    }

    const handleOnClose = (e) => {
        if (e.target.id === 'container') onClose()

    }

    if(!visible) return null
    return (
        <div
            id='container'
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-2 rounded w-72">

                <div className="flex flex-col">
                    <input
                        type="text"
                        className="border border-gray-700 p-2 rounded mb-5"
                        value={email}
                        onChange={handleChangeEmail}

                    />
                    <input
                        type="text"
                        className="border border-gray-700 p-2 rounded mb-5"
                        value={name}
                        onChange={handleChangeName}
                    />
                    <input
                        type="password"
                        className="border border-gray-700 p-2 rounded mb-5"
                        value={password}
                        placeholder='******'
                        onChange={handleChangePassword}

                    />
                </div>
                <div className="text-center">
                    <button onClick={handleEditUser} className="px-5 py-2 bg-gray-700 text-white rounded">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Popup;