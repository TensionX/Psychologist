import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { errorMsg } from '../../redux/user/user.selectors'
import { resetError } from '../../redux/user/user.actions'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const notifyErrorOptions = {
  position: 'top-center',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

function Error() {
    const authError = useSelector(errorMsg)
    const dispatch = useDispatch()

    useEffect(() => {
        if(authError){
            toast.error(authError, notifyErrorOptions)
        }
        else{
            dispatch(resetError())
        }
    }, [authError, dispatch])

    return (
        <div>
            <ToastContainer newestOnTop rtl={false} pauseOnFocusLoss={false} />
        </div>
    )
}

export default Error
