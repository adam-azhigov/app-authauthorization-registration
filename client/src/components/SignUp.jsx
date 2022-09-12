import React, {useEffect, useState} from 'react';
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
    const [passwordDirty,setPasswordDirty] = useState(false);
    const [fullNameDirty,setFullNameDirty] = useState(false);
    const [emailDirty,setEmailDirty] = useState(false);
    const [dateOfBirthDirty,setDateOfBirthDirty] = useState(false);
    const [passwordError,setPasswordError] = useState("Пароль не может быть пустым");
    const [fullNameError,setFullNameError] = useState("ФИО не может быть пустым");
    const [emailError,setEmailError] = useState("Емаил  не может быть пустым");
    const [dateOfBirthError,setDateOfBirthError] = useState("Дата рождения не может быть пустым");
    const [formValid,setFromValid] = useState(false)
    const navigate = useNavigate();

    useEffect( () => {
        if (emailError || passwordError || dateOfBirthError || fullNameError ) {
            setFromValid(false)
        } else {
            setFromValid(true)
        }
    },[emailError || fullNameError || dateOfBirthError || passwordError ])


    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        if (e.target.value.length < 5 ) {
            setPasswordError("Пароль должен быть длинне 3 ")
            if(!e.target.value) {
                setPasswordError("Пароль не должен быть пустым")
            }
        } else {
            setPasswordError("")
        }

    };


    const handleChangeFullname = (e) => {
        setFullName(e.target.value);
        if (!e.target.value) {
            setFullNameError("Поле ФИО не может быть пустым")
        } else {
            setFullNameError("")
        }

    };


    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLocaleLowerCase())) {
            setEmailError("Некоретный емаил")
            if(!e.target.value) {
                setEmailError("Емаил не должен быть пустым")
            }
        } else {
            setEmailError("")
        }
    };
    const handleChangeDateOfBirth = (e) => {
        setDateOfBirth(e.target.value);
        if (!e.target.value) {
            setDateOfBirthError("Поле ФИО не может быть пустым")
        } else {
            setDateOfBirthError("")
        }
    };
    const handleChangeGender = (e) => {
        setGender(e.target.value);
    };

    const blurHandler = (e) =>{
        switch (e.target.name) {
            case "email":
                setEmailDirty(true)
                break
            case "password":
                setPasswordDirty(true)
                break
            case "fullName":
                setFullNameDirty(true)
                break
            case "dateOfBirth":
                setDateOfBirthDirty(true)
                break
            default:
                return ""
        }
    }

    useEffect(() => {
        document.title = 'регистрация';
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUser(password, fullName, gender, dateOfBirth,email, navigate))
    }

    return (
        <div>
            <form className="bg-red-500 w-2/3 mx-auto rounded-lg">
                <label className="block md:w-2/4 mx-auto mt-5">
                    <span className=" after:ml-0.5 block text-sm font-medium text-white">
                         ФИО
                    </span>
                    {(fullNameDirty && fullNameError) && <div className="text-#050C2A">{fullNameError}</div>}
                    <input type="text"
                           name="fullName"
                           className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                           placeholder="Адам Ажигов"
                           onBlur={e => blurHandler(e)}
                           onChange={handleChangeFullname}
                    />
                </label>
                <label className="block md:w-2/4 mx-auto mt-5">
                    <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-white">
                         Email
                    </span>
                    {(emailDirty && emailError) && <div className="text-#050C2A">{emailError}</div>}
                    <input  type="email"
                            name="email"
                            className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                            placeholder="you@gmail.com"
                            onChange={handleChangeEmail}
                            onBlur={e => blurHandler(e)}

                    />
                </label>
                <label className="block md:w-2/4 mx-auto mt-5">
                    <span className=" after:ml-0.5  block text-sm font-medium text-white">
                         Пароль
                    </span>
                    {(passwordDirty && passwordError) && <div className="#050C2A">{passwordError}</div>}
                    <input type="password"
                           name="password"
                           className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                           placeholder="******"
                           onBlur={e => blurHandler(e)}
                           onChange={handleChangePassword}

                    />
                </label>
                <label className="block md:w-2/4 mx-auto mt-5">
                <span className=" after:ml-0.5  block text-sm font-medium text-white">
                         Дата рождения
                    </span>
                    {(dateOfBirthDirty && dateOfBirthError) && <div className="#050C2A">{dateOfBirthError}</div>}
                    <input type="date"
                           name="dateOfBirth"
                           className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                           placeholder="мм.чч.гг"
                           onBlur={e => blurHandler(e)}
                           onChange={handleChangeDateOfBirth}
                    />
                </label>
                <span className="block md:w-2/4 mx-auto mt-5 text-xs text-white">Выберите  пол</span>
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
                <button disabled={!formValid}  type='submit' className="bg-red-400 mx-auto w-2/4 h-10 block rounded-lg" onClick={handleSubmit}>Регистрация</button>
            </form>
        </div>
    );
};

export default SignUp;