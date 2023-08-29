import { Routes, Route } from "react-router-dom";
import Home from '../components/Home';
import Login from '../components/login';
import TableUsers from '../components/TableUsers';
import Test from "../components/Test";
import PrivateRoute from "./PrivateRoute";
const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <TableUsers />
                        </PrivateRoute>
                    } />
                    <Route
                    path="/test"
                    element={
                        <PrivateRoute>
                            <Test />
                        </PrivateRoute>
                    } />
            </Routes>
        </>
    )
}
export default AppRoute;