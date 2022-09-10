import React, {useState} from 'react';
import {useDispatch, useSelector,} from "react-redux";
import {auth} from "../redux/features/application";
import {useNavigate,} from "react-router-dom";

const SingIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();
    const error = useSelector( state => state.application.error)



    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(auth(email,password,navigate));
    };



    return (
        <div>
           <div className='text-white text-center'>{error}</div>
            <form className="bg-red-500 w-2/3 h-60 mx-auto rounded-lg">

                <label className="block w-2/4 mx-auto mt-5">
                    <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-white">
                         Email
                    </span>
                    <input type="email" name="email"
                           onChange={handleChangeEmail}
                           className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                           placeholder="you@gmail.com"/>
                </label>
                <label className="block w-2/4 mx-auto mt-5">
                    <span className=" after:ml-0.5  block text-sm font-medium text-white">
                         Пароль
                    </span>
                    <input type="password" name="email"
                           onChange={handleChangePassword}
                           className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                           placeholder="******"/>
                </label>
                <button   onClick={handleSubmit} type='submit' className="bg-red-400 mx-auto mt-10 w-2/4 h-10 block rounded-lg">Войти</button>
            </form>
        </div>
    );
};

export default SingIn;