import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadUserAll, loadUserCurrent} from "../redux/features/users";

const Users = () => {
    const dispatch = useDispatch();
    const date = new Date().getFullYear()
    const users = useSelector(state => state.users.items)
    const userCurrent = useSelector(state => state.users.currentUser)

    useEffect( () => {
        dispatch(loadUserCurrent());
    },[dispatch])

    useEffect( () => {
        dispatch(loadUserAll());
    },[dispatch]);

    return (
        <div className='grid gap-4 grid-cols-1 grid-rows-2 grid-col sm:grid-cols-2 mt-10 md:grid-cols-3     '>
            {users.filter(item => item._id !== userCurrent._id).map((item,index) => (
                <div className="max-w-sm  rounded overflow-hidden  shadow-lg bg-white w-60 mx-auto">
                    <img src={item.avatarUrl}  alt='avatar' className='w-1/3 h-1/3 w-[240px] h-[200px]'/>

                        <div className="px-6 py-4  ">
                            <div className="font-bold text-xl mb-2 font-[Verdana]" key={item._id}>{item.fullName}</div>
                            <span className='font-[Verdana]'>Возраст</span>
                            <p className="text-gray-700 text-base font-[Verdana]" >
                                {   date - item.dateOfBirth.split('-')[0]}
                                {/*{console.log( item._id)}*/}
                            </p>
                        </div>
                </div>
            ))}
        </div>
    );
};

export default Users;