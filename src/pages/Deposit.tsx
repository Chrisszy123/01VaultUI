import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { approve, deposit } from '../utils/interactions'
import Validate from '../utils/Validate'

const Deposit = () => {
  const [amount, setAmount] = useState<any>(0)

  
  const handleDeposit = async() => {
    try{
      if(Validate(amount).empty()){
        const response = await deposit(amount)
      }
    }catch(e: any){
      return e
    }
  }

  return (
    <div className='flex-center flex-col w-full'>
      <h1 className='head_text text-center capitalize'>
        deposit / Approve
      </h1>
      <div className="w-9/12 sm:w-6/12 h-[300px] mt-16 glassmorphism">
					<Input
            className='h-[70px] flex-center'
            inputClass='w-11/12 h-[40px] p-4 rounded-md outline-none'
						placeholder="Enter amount"
						type=""
						action={setAmount}
					/>
					<br />
					<Button
            className='action_btn mb-5'
						text="Deposit"
						disabled={
							true ? !amount : false
						}
						action={() => handleDeposit()}
					/>
          <span className='mt-4 text-sm text-red-500 pt-8'>
            NOTE: This process would require two transactions to be confirmed
          </span>
				</div>
 
   </div>
  )
}

export default Deposit