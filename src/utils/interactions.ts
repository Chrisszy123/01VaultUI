// contract address: 0x1bcC922f061462023047DA125f38148AdAa5fa97
// token address: 0xe96A22092FE7812D301D6bD78eC3E1E733a8D442

import ABI from "./ABI.json";
import TokenABI from "./TokenABI.json"
import Web3 from "web3"
//
const { ethereum }: any = window;
const web3 = new Web3(ethereum);
const contractAddress = "0x1bcC922f061462023047DA125f38148AdAa5fa97";
const tokenAddress = "0xe96A22092FE7812D301D6bD78eC3E1E733a8D442"
const ABI_VALUE: any = ABI;
const TOKEN_ABI: any = TokenABI;
const contract = new web3.eth.Contract(ABI_VALUE, contractAddress);
const tokenContract = new web3.eth.Contract(TOKEN_ABI, tokenAddress)

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

export const approve = async( amount: any) => {
  try{
    const accounts = await web3.eth.getAccounts()
    const amt = web3.utils.toWei(amount, "ether")
    const res = await tokenContract.methods.approve(contractAddress, amount).send({from: accounts[0]})
    return{
      success: true,
      res
    }
  }catch(e: any){
    return e
  }
}
// deposit to vault
export const deposit = async ( amount: any) => {
  if((window as any).ethereum){
    const status = await checkChainID();
    if(status === true){
      try {
          const app = await approve(amount)
          if(app.success === true){
            const amt = web3.utils.toWei(amount, "ether")
            const accounts = await web3.eth.getAccounts();
            const response = await contract.methods.deposit(amt).send({from: accounts[0]});
            return {
              success: true,
              response,
            };
          }else{
            return{msg: "approval needed"}
          }   
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
export const withdraw = async(amount: any, address: any) => {
  if((window as any).ethereum){
    const status = await checkChainID();
    if(status === true){
      try{
        const amt = web3.utils.toWei(amount, "ether")
        const accounts = await web3.eth.getAccounts();
        const response = await contract.methods.withdraw(amt, address).send({from: accounts[0]});
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
        const response = await contract.methods.shareHolder(addr).call();
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
