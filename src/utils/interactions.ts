// contract address: 0xC57C3f6a11CA9f2d0279fa6AD22Ad21e07bcC2Ce

import ABI from "./ABI.json";
import Web3 from "web3"
//
const { ethereum }: any = window;
const web3 = new Web3(ethereum);
const contractAddress = "0xC57C3f6a11CA9f2d0279fa6AD22Ad21e07bcC2Ce";
const ABI_VALUE: any = ABI;
const contract = new web3.eth.Contract(ABI_VALUE, contractAddress);

export const connectWallet = async () => {
  if ((window as any).ethereum) {
    try {
      const addressArray = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      const status = await checkChainID();
      if (status === true) {
        const obj = {
          res: addressArray[0],
          status: true,
        };
        return obj;
      } else {
        const obj = {
          res: "Please Connect to SAPOLI",
          status: false,
        };
        return obj;
      }
    } catch (err: any) {
      return {
        res: "User Rejected Request",
        false: false,
      };
    }
  }
};

const checkChainID = async () => {
  const chainid = await web3.eth.net.getId();
  if (chainid === 11155111) { // check that we're on sepoila network
    return true;
  } else {
    return false;
  }
};

export const getCurrentWalletConnected = async () => {
  if ((window as any).ethereum) {
    try {
      const addressArray = await (window as any).ethereum.request({
        method: "eth_accounts",
      });
      const status = await checkChainID();
      if (status === true) {
        const obj = {
          res: addressArray[0],
          status: true,
        };
        return obj;
      } else {
        const obj = {
          res: "Please Connect to the right network",
          status: false,
        };
        return obj;
      }
    } catch (err: any) {
      return {
        res: "",
        status: true,
      };
    }
  }
};

// deposit to vault
export const deposit = async (amount: any) => {
  if((window as any).ethereum){
    const status = await checkChainID();
    if(status === true){
      try {
        const amt = web3.utils.toWei(amount, "ether")
        const accounts = await web3.eth.getAccounts();
        const response = await contract.methods.deposit(amt).send({from: accounts[0], value: amt});
        console.log(response);
        return {
          success: true,
          response,
        };
      } catch (e: any) {
        return {
          success: false,
          response: e,
        };
      }
    }
  }
  
};
// withdraw from vault
export const withdraw = async(amount: any) => {
  if((window as any).ethereum){
    const status = await checkChainID();
    if(status === true){
      try{
        const amt = web3.utils.toWei(amount, "ether")
        const accounts = await web3.eth.getAccounts();
        const response = await contract.methods.withdraw(amt).send({from: accounts[0]});
        return{
          success: true,
          response
        }
      }catch(e:any){
        return{
          success: false,
          response: e
        }
      }
    }
  }
}
// get user balance
export const getUserShares = async (address: any) => {
  if((window as any).ethereum){
    const status = await checkChainID();
    if(status === true){
      try{
        const addr = address.toString().toLowerCase()
        const response = await contract.methods.getBalance(addr).call();
        const val = web3.utils.fromWei(response, "ether")
        return{
          success: true,
          response: val
        }
      }catch(e: any){
        return{
          success: false,
          response: e
        }
      }
    }
  }
}
