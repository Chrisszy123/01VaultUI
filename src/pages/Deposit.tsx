import React, { useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { approve, deposit } from '../utils/interactions'
import Validate from '../utils/Validate'

const Deposit = () => {
  const [amount, setAmount] = useState<any>(0)
  const [approveAmt, setApproveAmt] = useState<any>(0)

  const handleApprove =  async() => {
    try{
      if(Validate(approveAmt).empty()){
        const response = await approve(approveAmt)
      }
    }catch(e: any){
      return e
    }
  }
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
        deposit
      </h1>
      <div className="w-9/12 sm:w-6/12 h-[300px] mt-16 glassmorphism">
        <Input
            className='h-[70px] flex-center'
            inputClass='w-11/12 h-[40px] p-4 rounded-md outline-none'
						placeholder="Enter amount to approve"
						type=""
						action={setApproveAmt}
					/>
					<br />
					<Button
            className='action_btn'
						text="Approve"
						disabled={
							true ? !approveAmt : false
						}
						action={() => handleApprove()}
					/>
					<Input
            className='h-[70px] flex-center'
            inputClass='w-11/12 h-[40px] p-4 rounded-md outline-none'
						placeholder="Enter amount"
						type=""
						action={setAmount}
					/>
					<br />
					<Button
            className='action_btn'
						text="Deposit"
						disabled={
							true ? !amount : false
						}
						action={() => handleDeposit()}
					/>
				</div>
 
   </div>
  )
}

export default Deposit