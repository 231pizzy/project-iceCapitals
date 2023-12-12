import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Deposite from "./pages/DepositePage";
import Withdrawal from "./pages/WithdrawalPage";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Dashboard from "./pages/Dashboard";
import CheckoutPage from "./pages/CheckoutPage";
import Transactions from "./pages/Transactions";
import AllUsers from "./pages/AllUsers";
import AdminUserEdit from "./pages/AdminUserEdit";
import AllDeposits from "./pages/AllDeposits";
import DepositEditPage from "./pages/DepositEditPage";
import AllWithdrawal from "./pages/AllWithdrawal";
import WithdrawalEditPage from "./pages/WithdrawalEdit";
import AllWallets from "./pages/AllWallets";
import WalletEdit from "./pages/WalletEdit";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div>
      <ToastContainer position="bottom-center" limit={1} />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/deposite" element={<Deposite />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/withdrawal" element={<Withdrawal />} />
            <Route path="/transaction" element={<Transactions />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/user-edit/:userId" element={<AdminUserEdit />} />
            <Route path="/all-deposits" element={<AllDeposits />} />
            <Route
              path="/deposit-edit/:depositId"
              element={<DepositEditPage />}
            />
            <Route path="/all-withdrawals" element={<AllWithdrawal />} />
            <Route
              path="/withdrawal-edit/:withdrawalId"
              element={<WithdrawalEditPage />}
            />
            <Route path="/all-wallets" element={<AllWallets />} />
            <Route path="/wallet-edit/:walletId" element={<WalletEdit />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
