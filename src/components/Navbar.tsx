import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { WalletContext } from "../context/WalletContext";
import logo from "../assets/logo.svg";
import profile from "../assets/profile.jpg";
import { WalletType } from "../types/Wallet";
import { connectWallet } from "../utils/interactions";

const Navbar = () => {
  const [connectionSatatus, setConnectionStatus] = useState(true);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  

  const { walletAddress, setWalletAddress }: any =
    useContext(WalletContext);

  const connect = async() => {
    const wallet: WalletType = await connectWallet()
    console.log(wallet)
    if (wallet?.status === true) {
      const {res} = wallet
      setWalletAddress(res)
		} else {
			setConnectionStatus(false);
		}
    console.log(connectionSatatus)
  }

  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
      <Link to="/" className="flex flex-center gap-2">
        <img src={logo} alt="logo" width={32} height={32} />
        <p className="logo_text uppercase">01VAULT</p>
      </Link>
      {/* desktop nav */}
      <div className="sm:flex hidden">
        {walletAddress === "" || undefined || null  ? (
          <div className="flex gap-3 md:gap-5">
            <button type="button" className="uppercase black_btn" onClick={() => connect()}>
              connect
            </button>
          </div>
        ) : (
          <div className="flex gap-3 md:gap-5">
            <Link to="/" className="capitalize flex-center">
              Deposit
            </Link>
            <Link to="/withdraw" className="capitalize flex-center">
              Withdraw
            </Link>
            <Link to="/profile" className=" capitalize flex-center">
              profile
            </Link>
            <button type="button" className="uppercase black_btn">
                      {String(walletAddress).substring(0, 6) +
                        "..." +
                        String(walletAddress).substring(38)}
            </button>
          </div>
        )}
      </div>
      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {walletAddress !== "" || undefined || null  ? (
          <div className="flex">
            <img
              src={profile}
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
              onClick={() => { 
                setToggleDropdown((prev) => !prev)
              }}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  to="/withdraw"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Withdraw
                </Link>
                <Link
                  to="/profile"
                  className="dropdown_link capitalize"
                  onClick={() => setToggleDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  className="black_btn mt-5 w-full capitalize"
                  
                >
                 {String(walletAddress).substring(0, 6) +
											"..." +
								String(walletAddress).substring(38)}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <button type="button" className="black_btn uppercase" onClick={() => connect()}>
              connect
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
