import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import SingIn from "./components/singIn/SingIn";
import SingUp from "./components/singUp/SingUp";
import Clients from "./components/clients/Clients";
import Tests from "./components/tests/Tests";
import ActiveTest from "./components/takeTest/ActiveTest";
import ClientResults from "./components/clientResults/ClientResults";
import Error from "./components/error/Error";
import { refreshSessionOperation } from "./redux/user/user.operation";
import { useEffect, useState } from "react";

import PrivateRoute from "./components/Route/PrivateRoute";
import PublicRoute from "./components/Route/PublicRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshSessionOperation());
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route exat path="/sign-in" element={<PublicRoute />}>
          <Route path="/sign-in" element={<SingIn />} />
        </Route>
        <Route exat path="/sign-up" element={<PublicRoute />}>
          <Route path="/sign-up" element={<SingUp />} />
        </Route>

        <Route exat path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Clients />} />
        </Route>
        <Route exat path="/tests" element={<PrivateRoute />}>
          <Route path="/tests" element={<Tests />} />
        </Route>
        <Route exat path="/tests/test" element={<PrivateRoute />}>
          <Route path="/tests/test" element={<ActiveTest />} />
        </Route>
        <Route exat path="/clients/test" element={<PrivateRoute />}>
          <Route path="/clients/test" element={<ClientResults />} />
        </Route>
      </Routes>

      
      <Error />
    </div>
  );
}

export default App;
