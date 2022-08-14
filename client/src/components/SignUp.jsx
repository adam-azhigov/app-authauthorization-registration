import React, {useState} from 'react';
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { createUser } from "../redux/features/application";

const SignUp = () => {
    const dispatch = useDispatch();
    const [password,setPassword] = useState("");
    const [fullName,setFullName] = useState("");
    const [email,setEmail] = useState("");
    const [dateOfBirth,setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");



    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleChangeFullname = (e) => {
        setFullName(e.target.value);
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleChangeDateOfBirth = (e) => {
        setDateOfBirth(e.target.value);
    };
    const handleChangeGender = (e) => {
        setGender(e.target.value);
    };


    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(password, fullName, gender, dateOfBirth,email, navigate))
    }

    return (
        <div>
            <form className="bg-red-500 w-2/3 mx-auto rounded-lg">
                <label className="block w-2/4 mx-auto mt-5">
                    <span className=" after:ml-0.5 block text-sm font-medium text-white">
                         ФИО
                    </span>
                    <input type="text" name="email"
                           className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                           placeholder="Адам Ажигов"
                            onChange={handleChangeFullname}
                    />
                </label>
                <label className="block w-2/4 mx-auto mt-5">
                    <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-white">
                         Email
                    </span>
                    <input type="email" name="email"
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                           placeholder="you@gmail.com"
                            onChange={handleChangeEmail}
                    />
                </label>
                <label className="block w-2/4 mx-auto mt-5">
                    <span className=" after:ml-0.5  block text-sm font-medium text-white">
                         Пароль
                    </span>
                    <input type="password" name="password"
                           className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                           placeholder="******"
                            onChange={handleChangePassword}
                    />
                </label>
                <label className="block w-2/4 mx-auto mt-5">
                <span className=" after:ml-0.5  block text-sm font-medium text-white">
                         Дата рождения
                    </span>
                    <input type="date"
                           className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                           placeholder="мм.чч.гг"
                            onChange={handleChangeDateOfBirth}
                    />
                </label>
                <span className="block w-2/4 mx-auto mt-5 text-xs text-white">Выберите  пол</span>
                <div className="flex w-2/4 mx-auto justify-evenly">
                    <div>
                        <label className="text-xs " >
                            <span>М</span>
                            <input type="radio"
                                   value="мужчина"
                                   name="gender"
                                   onChange={handleChangeGender}
                                   className="mt-1   bg-white border  shadow-none border-slate-300 placeholder-slate-400 focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            <span className="text-xs">Ж</span>
                            <input type="radio"
                                   value="женщина"
                                   name="gender"
                                   onChange={handleChangeGender}
                                   className="mt-1   bg-white border shadow-sm border-slate-300 placeholder-slate-400  focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                            />
                        </label>
                    </div>

                </div>
                <button  type='submit' className="bg-red-400 mx-auto w-2/4 h-10 block rounded-lg" onClick={handleSubmit}>Регистрация</button>
            </form>
        </div>
    );
};

export default SignUp;