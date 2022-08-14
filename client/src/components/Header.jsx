import React from 'react';
import '../index.css'
import {  Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {logout} from "../redux/features/application";


const Header = () => {
    const dispatch = useDispatch();
    const navigate  = useNavigate()
    const token = useSelector(state => state.application.token)

    const handleChangeLogout = (e) => {
            dispatch(logout(navigate))

    }


    if (!token) {
        return (
            <div className='container mx-auto w-3/4  h-14 bg-red-500 text-end leading-[56px]'>
                <Link to='/login' className={'hover:border-t-2 border-amber-400'} > Войти</Link>
            </div>
        )
    } else {
        return (
            <div className='container mx-auto'>
                <div className=' h-14 bg-red-500 px-3 text-end leading-[56px] flex justify-between'>
                    <div>
                        <Link to='/users'  className={'hover:border-b-2 border-amber-400 font-[Verdana]'}> Пользователи</Link>
                    </div>

                    <div>
                        <Link to='/login' className={'hover:border-b-2 border-b-amber-400 mr-2 font-[Verdana]'} onClick={handleChangeLogout} > Выйти</Link>
                        <Link to='/current' className={'hover:border-b-2 border-amber-400 cursor-pointer font-[Verdana]'} > Личный кабинет</Link>

                    </div>


                </div>
            </div>

        )
    }


};

export default Header;