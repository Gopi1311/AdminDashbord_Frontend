
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useState,useEffect } from "react";
import { BaseURL } from "../utils/BaseURL";


export default function Notification({ open, setOpen,}) {
  const [message,setMessage]=useState({});
  useEffect(()=>{
      axios.get(`${BaseURL}notify`)
      .then((res)=>{
        setMessage(res.data);
      })
      .catch((err)=>{
        console.log("error:",err.message);
      })
  },[]);
  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-sm transform overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-gray-200 transition-all">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Success
                </DialogTitle>
               {message.first_name?(
                 <p className="mt-1 text-sm text-gray-600">{`${message.first_name } ${message.last_name} is Paid ${message.payment_status}`}</p>
               ):(
                 <p className="mt-1 text-sm text-gray-600">{`${message.message }`}</p>
               )}
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-600 transition"
              >
                OK
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

