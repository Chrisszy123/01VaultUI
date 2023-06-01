import React, {useContext, useState, useEffect} from 'react'
import profile from "../assets/profile.jpg"
import { getUserShares } from '../utils/interactions'
import { WalletContext } from '../context/WalletContext'

const Profile = () => {
    const {walletAddress}: any = useContext(WalletContext)
    const [balance, setBalance] = useState()

    useEffect(() => {
        const getShares = async() => {
            try{
                const shares = await getUserShares(walletAddress)
                if(shares?.success === true){
                    setBalance(shares?.response)
                }
            }catch(err: any){
                return{
                   err
                }
            }
        }
        getShares()
    }, [])
  return (
    <div className='flex-center flex-col w-full'>
      <h1 className='head_text text-center capitalize'>
        Profile
      </h1>
      <div className="w-9/12 sm:w-6/12 h-[300px] mt-16 glassmorphism ">
        <div className='flex-center w-full'>
            <img src={profile} className="h-[100px] w-[100px]"/>
        </div>
        <h1 className='mt-8 text-center'>User Balance: {balance} VLT</h1>
      </div>
    </div>
  )
}

export default Profile