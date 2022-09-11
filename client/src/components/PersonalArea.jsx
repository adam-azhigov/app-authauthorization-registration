import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadUserCurrent} from "../redux/features/users";
import Popup from "./Popup";

const PersonalArea = () => {
    const dispatch = useDispatch();
    const inputFileRef = useRef();

    const [popUp, setPopUp] = useState(false);
    const token = useSelector(state => state.application?.token)
    const userCurrent = useSelector(state => state.users.currentUser)


    useEffect( () => {
        dispatch(loadUserCurrent());
    },[dispatch])

    useEffect(() => {
        document.title = 'личный кабинет';
    })

    const handleChangeFile = async (event) => {
            try {
                const formData = new  FormData();
                const file = event.target.files[0];
                formData.append('image', file);
                 await fetch("/upload", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData
                })
                window.location.replace("/current")
            } catch (err) {
                console.log(err)
                alert('ошибка при загрузке файла!')
            }


    }

     const  handleOnClose  = () => setPopUp(false)

    if (!token) {
        return (
            <h1 className='text-white'>Ошибка</h1>
        )
    } else {
        return (
            <>

                <div className='container  mx-auto w-3/5 bg-white md:flex  h-full mt-16  '>

                    <img src={userCurrent.avatarUrl}  alt='avatar' className='sm:w-1/3 h-full'/>
                    <div>
                        <p className='ml-2 '> Имя: {userCurrent.fullName}</p>
                        <p className='ml-2 '>Емаил: {userCurrent.email}</p>
                        <button onClick={() => setPopUp(true)} className='absolute bg-red-500 rounded ml-2 leading-6 hover:scale-95 transition text-lg'>Изменить данные</button>
                        <button onClick={() => inputFileRef.current.click()} className='bg-red-500 rounded bottom-0 ml-2 hover:scale-95 transition mt-7 text-lg'>Загрузить фото</button>
                        <input type='file' ref={inputFileRef} onChange={handleChangeFile} hidden/>
                    </div>

                </div>
                <Popup onClose={handleOnClose}  visible={popUp} userCurrent={userCurrent}/>
            </>

            )
    }

};

export default PersonalArea;