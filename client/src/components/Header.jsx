import React, {useState} from 'react';
import '../index.css'
import {  Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import {logout} from "../redux/features/application";
import {SiAffinityphoto} from "react-icons/si";
import {RiMenuFill} from "react-icons/ri";
import {GrClose} from "react-icons/gr";


const Header = () => {
    const dispatch = useDispatch();
    const navigate  = useNavigate()
    const [open,setOpen] = useState(false)
    const token = useSelector(state => state.application.token)

    const handleChangeLogout = (e) => {
            dispatch(logout(navigate))

    }


    if (!token) {
        return (
            <div className='container mx-auto w-full  h-14 bg-red-500 text-end leading-[56px]'>
                <Link to='/login' className={'hover:border-t-2 border-amber-400'} > Войти</Link>
            </div>
        )
    } else {
        return (
            <div className='mx-auto w-full leading-[56px] '>
                <div className=' bg-red-500 px-3  leading-[56px] md:flex justify-around'>
                    <div className='flex items-center font-[Poppins]'>
                      <span  className='text-indigo-600 mr-1 pb-1'>
                          <SiAffinityphoto className='text-white ' />
                      </span>
                        Designer
                    </div>
                    <div onClick={() => setOpen(!open)} className='text-3xl absolute right-8 top-2.5 cursor-pointer md:hidden'>
                        {open ? <GrClose/> : <RiMenuFill/> }

                    </div>

                    <div className={`md:flex text-center absolute md:static
                    bg-red-500 z-10   left-0 w-full md:w-auto  
                     transition-all duration-700 ease-in ${open ? '  top-[58px] opacity-100' : '  top-[-160px]'  } `}>
                       <div>
                          <Link to='/people'   className={'hover:border-b-2 border-amber-400 text-gray-700 font-[Verdana] md:ml-4 active:text-white  focus:text-white'} onClick={() => setOpen(!open)}> Пользователи</Link>
                       </div>
                        <div>
                            <Link to='/account' className={'hover:border-b-2 border-amber-400 cursor-pointer  text-gray-700 font-[Verdana] md:ml-4 active:text-white  focus:text-white '} onClick={() => setOpen(!open)} > Личный кабинет</Link>
                        </div>
                        <div>
                            <Link to='/login' className={'hover:border-b-2 border-amber-400 text-gray-700 mr-2 font-[Verdana] md:ml-4 active:text-white  focus:text-white'} onClick={handleChangeLogout} > Выйти</Link>
                        </div>


                    </div>


                </div>
            </div>

        )
    }


};

export default Header;