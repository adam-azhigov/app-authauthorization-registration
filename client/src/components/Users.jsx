import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadUserAll, loadUserCurrent} from "../redux/features/users";



const Users = () => {
    const dispatch = useDispatch();
    const date = new Date().getFullYear()
    const [search, setSearch] = useState("")
    const users = useSelector(state => {
        return state.users.items
            .map(item => item)
            .filter(item => {
                return item.fullName?.toLowerCase().includes(search.toLowerCase())
            })
    })
    const userCurrent = useSelector(state => state.users.currentUser)

    useEffect( () => {
        dispatch(loadUserCurrent());
    },[dispatch])

    useEffect( () => {
        dispatch(loadUserAll());
    },[dispatch]);

    return (
        <>
        <div className=" z-0 w-full backdrop-brightness-200 h-14 mx-auto mt-5 text-center mt-20  ">
            <input type='search'
                   placeholder="поиск"
                   onChange={(e) => setSearch(e.target.value)}
                   className='px-5 py-2 h-9  mt-2 font-semibold placeholder-gray-500-400 text-black rounded-2xl border-none ring-2 ring-gray-300  focus:ring-gray-500 focus:ring-2'/>
        </div>
        <div className="grid gap-4 grid-cols-1 grid-rows-2 grid-col sm:grid-cols-2 mt-10 md:grid-cols-3">
            {users.filter(item => item._id !== userCurrent._id).map((item,index) => (
                <div className="max-w-sm  rounded overflow-hidden  shadow-lg bg-white w-60 mx-auto" key={item._id} >
                    <img src={item.avatarUrl}  alt='avatar missing' className='w-1/3 h-1/3 w-[240px] h-[200px]'/>

                        <div className="px-6 py-4  ">
                            <div className="font-bold text-xl mb-2 font-[Verdana]" key={item._id}>{item.fullName}</div>
                            <span className='font-[Verdana]'>Возраст</span>
                            <p className="text-gray-700 text-base font-[Verdana]" >
                                {   date - item.dateOfBirth.split('-')[0]}

                            </p>
                        </div>
                </div>
            ))}
        </div>
        </>
    );
};

export default Users;