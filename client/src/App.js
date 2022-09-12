import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SingIn from "./components/SingIn";
import PersonalArea from "./components/PersonalArea";
import Users from "./components/Users";



function App() {
  return (
    <div>
      <Header/>
      <Routes>
          <Route path="/" element={ <SignUp/> }/>
          <Route path="/login" element={ <SingIn/> }/>
          <Route path="/account" element={ <PersonalArea/> }/>
          <Route path="/people" element={ <Users/> }/>
      </Routes>
    </div>
  );
}

export default App;
