import axiosInstance from "../helpers/axios";
import logout from "../helpers/auth";
const NavHeader = (props) => {
    const username = props.user;
    return (
      <div className="flex justify-between min-w-full pl-4 pb-3 mb-5 bg-primary">
        <h1 className=" font-sans text-2xl font-semibold subpixel-antialiased">
          {" "}
          Template
        </h1>
        <div className="justify-self-end pr-4"> 
          {username && 
          <div>
          <h1 className=" font-sans text-1xl font-semibold subpixel-antialiased">Hello, {username}</h1> 
          <button onClick={logout}> Logout </button>
          </div>
           }
        </div>
      </div>
    );
  }
  
  export default NavHeader;