import "./pages/Home";
import "./app/styles/app.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Result from "./pages/Result";
import DiseaseHistory from "./pages/DiseaseHistory";
import PersonalInformation from "./pages/PersonalInformation";
import Statistics from "./pages/Statistics";
import BySymptomsMethod from "./pages/BySymptomsMethod";
import PrivateRoute from "./features/PrivateRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route loader={PrivateRoute}>
            <Route path="personal-info" element={<PersonalInformation></PersonalInformation>}></Route>
            <Route path="stats" element={<Statistics></Statistics>}></Route>
            <Route path="history" element={<DiseaseHistory></DiseaseHistory>}></Route>
          </Route>
          <Route path="/" element={<Home></Home>}/>
          <Route path="home" element={<Home></Home>}/>
          <Route path="login" element={<SignIn></SignIn>}/>
          <Route path="register" element={<SignUp></SignUp>}/>
          <Route path="result" element={<Result></Result>}></Route>
          <Route path="method" element={<BySymptomsMethod></BySymptomsMethod>}></Route>
          <Route path="*" element={<NotFound></NotFound>}></Route>
        </Routes>
    </div>
  );
}

export default App;
