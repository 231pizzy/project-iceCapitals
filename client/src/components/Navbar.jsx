// import { useState } from "react";
// import {
//   Bars3BottomRightIcon,
//   XMarkIcon,
//   // ChevronDownIcon,
// } from "@heroicons/react/24/solid";
// import { Link } from "react-router-dom";
// // import { Link } from "react-scroll";

// export default function Navbar() {
//   const [nav, setNav] = useState(false);

//   const handleClick = () => setNav(!nav);
//   const handleClose = () => {
//     setNav(false);
//   };

//   return (
//     <div className="w-screen h-[80px] z-20 bg-zinc-400 fixed drop-shadow-lg">
//       <div className="px-2 flex justify-between items-center w-full h-full">
//         <div className="flex items-center">
//           <h1 className="text-3xl font-bold mr-4 sm:text-4xl text-indigo-600">
//             <Link to="/">ICECAPITAL.</Link>
//           </h1>
//           <ul className="hidden md:flex">
//             <li className="hover:text-indigo-600 duration-500 cursor-pointer">
//               <Link to="/">Home</Link>
//             </li>
//             <li className="hover:text-indigo-600 duration-500 cursor-pointer">
//               <Link to="/about">About</Link>
//             </li>
//             <li className="hover:text-indigo-600 duration-500 cursor-pointer">
//               <Link to="/services">Services</Link>
//             </li>
//             <li className="hover:text-indigo-600 duration-500 cursor-pointer">
//               <Link to="/pricing">Pricing</Link>
//             </li>
//             <li className="hover:text-indigo-600 duration-500 cursor-pointer">
//               <Link to="/contact">Contact</Link>
//             </li>
//           </ul>
//         </div>
//         <div className="hidden md:flex pr-4">
//           <Link to={"/sign-up"}>
//             <button className="px-8 py-3">Get Started</button>
//           </Link>
//         </div>
//         <div className="md:hidden mr-4" onClick={handleClick}>
//           {!nav ? (
//             <Bars3BottomRightIcon className="w-5 text-indigo-600" />
//           ) : (
//             <XMarkIcon className="w-5 text-indigo-600" />
//           )}
//         </div>
//       </div>

//       <ul className={!nav ? "hidden" : "absolute bg-zinc-50 w-full px-8"}>
//         <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
//           <Link onClick={handleClose} to="/">
//             Home
//           </Link>
//         </li>
//         <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
//           <Link onClick={handleClose} to="/about">
//             About
//           </Link>
//         </li>
//         <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
//           <Link onClick={handleClose} to="/services">
//             Services
//           </Link>
//         </li>
//         {/* ... Additional links ... */}
//         <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
//           <Link onClick={handleClose} to="/pricing">
//             Pricing
//           </Link>
//         </li>
//         <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
//           <Link onClick={handleClose} to="/contact">
//             Contact
//           </Link>
//         </li>

//         <div className="flex flex-col my-4">
//           <Link onClick={handleClose} to={"/sign-up"}>
//             <button className="px-8 py-3">Get Started</button>
//           </Link>
//         </div>
//       </ul>
//     </div>
//   );
// }

import { useState } from "react";
import {
  Bars3BottomRightIcon,
  XMarkIcon,
  // ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => setNav(!nav);
  const handleClose = () => {
    setNav(false);
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/user/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      handleClose();
      navigate("/sign-in");
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  return (
    <div className="w-screen h-[80px] z-20 bg-zinc-400 fixed drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-4 sm:text-4xl text-indigo-600">
            <Link to="/">ICECAPITAL.</Link>
          </h1>

          <ul className="hidden md:flex">
            {currentUser ? (
              <>
                <li className="hover:text-indigo-600 duration-500 cursor-pointer">
                  <Link to="/dashboard">dashboard</Link>
                </li>
                <li className="hover:text-indigo-600 duration-500 cursor-pointer">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="hover:text-indigo-600 duration-500 cursor-pointer">
                  <Link to="/deposite">Deposit</Link>
                </li>
                <li className="hover:text-indigo-600 duration-500 cursor-pointer">
                  <Link to="/withdrawal">Withdraw</Link>
                </li>
                <li className="hover:text-indigo-600 duration-500 cursor-pointer">
                  <Link to="/transaction">Transactions</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-indigo-600 duration-500 cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-indigo-600 duration-500 cursor-pointer">
                  <Link to="/about">About</Link>
                </li>
                <li className="hover:text-indigo-600 duration-500 cursor-pointer">
                  <Link to="/services">Services</Link>
                </li>
                <li className="hover:text-indigo-600 duration-500 cursor-pointer">
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li className="hover:text-indigo-600 duration-500 cursor-pointer">
                  <Link to="/contact">Contact</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {currentUser ? (
          <div className="hidden md:flex pr-4">
            <span
              onClick={handleSignOut}
              className="text-red-700 cursor-pointer"
            >
              Sign out
            </span>
          </div>
        ) : (
          <div className="hidden md:flex pr-4">
            <Link to={"/sign-up"}>
              <button className="px-8 py-3">Get Started</button>
            </Link>
          </div>
        )}

        <div className="md:hidden mr-4" onClick={handleClick}>
          {!nav ? (
            <Bars3BottomRightIcon className="w-5 text-indigo-600" />
          ) : (
            <XMarkIcon className="w-5 text-indigo-600" />
          )}
        </div>
      </div>

      <ul className={!nav ? "hidden" : "absolute bg-zinc-50 w-full px-8"}>
        {currentUser ? (
          <>
            <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
              <Link onClick={handleClose} to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
              <Link onClick={handleClose} to="/profile">
                Profile
              </Link>
            </li>
            <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
              <Link onClick={handleClose} to="/deposite">
                Deposit
              </Link>
            </li>
            {/* ... Additional links ... */}
            <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
              <Link onClick={handleClose} to="/withdrawal">
                Withdraw
              </Link>
            </li>
            <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
              <Link onClick={handleClose} to="/transaction">
                Transactions
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
              <Link onClick={handleClose} to="/">
                Home
              </Link>
            </li>
            <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
              <Link onClick={handleClose} to="/about">
                About
              </Link>
            </li>
            <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
              <Link onClick={handleClose} to="/services">
                Services
              </Link>
            </li>
            {/* ... Additional links ... */}
            <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
              <Link onClick={handleClose} to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="border-b-2 border-zinc-300 w-full hover:text-indigo-600 duration-500 cursor-pointer">
              <Link onClick={handleClose} to="/contact">
                Contact
              </Link>
            </li>
          </>
        )}
        {currentUser ? (
          <div className="flex flex-col my-4">
            <span
              onClick={handleSignOut}
              className="text-red-700 cursor-pointer"
            >
              Sign out
            </span>
          </div>
        ) : (
          <>
            <div className="flex flex-col my-4">
              <Link onClick={handleClose} to={"/sign-up"}>
                <button className="px-8 py-3">Get Started</button>
              </Link>
            </div>
          </>
        )}
      </ul>
    </div>
  );
}
