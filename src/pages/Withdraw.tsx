import React, { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { withdraw } from '../utils/interactions'
import Validate from '../utils/Validate'

const Withdraw = () => {
  const [amount, setAmount] = useState<any>(0)
  const [address, setAddress] = useState<any>("")

  const handleWithdraw = async() => {
    try{
      if(Validate(amount).empty() && Validate(address).empty()){
        const response = await withdraw(amount, address)
        console.log(response)
      }
    }catch(e: any){
      return e
    }

  }
  return (
    <div className='flex-center flex-col w-full'>
      <h1 className='head_text text-center capitalize'>
        Withdraw
      </h1>
      <div className="w-9/12 sm:w-6/12 h-[300px] mt-16 glassmorphism">
					<Input
            className='h-[70px] flex-center'
            inputClass='w-11/12 h-[40px] p-4 rounded-md outline-none'
						placeholder="Enter amount"
						type=""
						action={setAmount}
					/>
          <Input
            className='h-[70px] flex-center'
            inputClass='w-11/12 h-[40px] p-4 rounded-md outline-none'
						placeholder="Enter address"
						type=""
						action={setAddress}
					/>
					<br />
					<Button
            className='action_btn'
						text="Withdraw"
						disabled={
							true ? !amount : false
						}
						action={() => handleWithdraw()}
					/>
				</div>
 
   </div>
  )
}

export default Withdraw