import { Link } from "react-router";
import logoSvg from "../../../assets/logo-dr-device.svg";

export default function Logo({ to, showText = true, className = "", iconClassName = "", textClassName = "", ...props }) {
  const content = (
    <div className={`flex items-center ${className}`}>
      <img
        src={logoSvg}
        alt="Dr. Device"
        className={`size-15 ${iconClassName}`}
        aria-hidden="true"
      />
      {showText && (
        <span className={`text-2xl font-bold tracking-[-0.02em] ${textClassName}`}>
          Dr. Device
        </span>
      )}
    </div>
  );

  if (to) {
    return <Link to={to} {...props}>{content}</Link>;
  }

  return <div {...props}>{content}</div>;
}
