import { useState } from "react";
import { EyeIcon, EyeClosedIcon } from "../../../utils/icons";

export default function Input({ icon, ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
      props.type === 'textarea' ?
        <textarea className="w-full p-3 border rounded-lg outline-none border-tertiary-container max-h-96 min-h-24" {...props}></textarea>
        :
        <div className="relative">
          <div className="absolute top-3.5 left-3.5 text-tertiary">{icon}</div>
          <input
            className="w-full p-3 pl-10 border rounded-lg outline-none border-tertiary-container"
            {...props}
            type={props.type === 'password' ? (showPassword ? 'text' : 'password') : props.type}
          />
          {props.type === 'password' && <div className="absolute top-3.5 right-3.5 text-tertiary cursor-pointer" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeClosedIcon height='24' /> : <EyeIcon height='24' />}</div>}
        </div>

  );
}
