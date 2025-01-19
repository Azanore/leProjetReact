import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import Aside from "./Aside";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Header />
      <Nav />
      <div className="d-flex">
        <Aside />
        <div className="container-fluid">
          <main
            className="flex-grow-1 mb-5 mt-3 shadow-sm rounded-4 bgflou"
            style={{ minHeight: "100vh" }}
          >
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
