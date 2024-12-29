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
        <div className=" bg-light container-fluid">
          <main
            className="flex-grow-1 mb-5 mt-3 bg-white rounded-4"
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
