import Formulaire from "./components/auth/CreateAccount";
import Login from "./components/auth/Login";
import Layout from "./components/layout/Layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Profile from "./components/user/Profile";
import Accueil from "./components/user/Accueil";
import ModifyColor from "./components/user/ModifyColor";
import AddUser from "./components/admin/AddUser";
import UsersList from "./components/admin/UsersList";
import RequestUserAdd from "./components/requests/RequestUserAdd";
import RequestUserShow from "./components/requests/RequestUserShow";
import RequestAdminShow from "./components/requests/RequestAdminShow";
import ModifyPassword from "./components/user/ModifyPassword";
import ErrorPage from "./components/errors/Error";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => Boolean(state.auth.userData));

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const isAdmin = useSelector((state) => state.auth.userData.admin);
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/" index element={<Login />} />
        <Route path="/register" element={<Formulaire />} />
        {/* Dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Accueil />} />
          <Route path="profile" element={<Profile />} />
          <Route path="appearance" element={<ModifyColor />} />
          <Route path="password" element={<ModifyPassword />} />

          {/* Admin routes */}
          {isAdmin && (
            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path="new" element={<AddUser />} />
            </Route>
          )}

          {/* Request routes */}
          <Route path="requests">
            {!isAdmin && (
              <>
                <Route path="new" element={<RequestUserAdd />} />
                <Route path="user" element={<RequestUserShow />} />
              </>
            )}
            {isAdmin && <Route path="admin" element={<RequestAdminShow />} />}
          </Route>
        </Route>

        {/* Error routes */}
        <Route path="/error" element={<ErrorPage />} />
        <Route
          path="*"
          element={
            <ErrorPage
              title="Page Not Found"
              message="The page you're looking for doesn't exist."
              errorCode="404"
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
