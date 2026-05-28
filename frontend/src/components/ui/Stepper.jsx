import { useState } from "react";

export default function Stepper({ steps }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <div className="flex justify-between items-center">
        {steps.map((step, i) => (
          <div className="flex flex-col justify-center items-center gap-2">
            <div
              className={`rounded-full size-12 text-center flex justify-center items-center ${activeStep === i ? "bg-primary text-white" : "bg-surface-container text-tertiary"}`}
            >
              {i + 1}
            </div>
            <span
              className={`${activeStep === i ? "text-primary font-semibold" : "text-tertiary"}`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
      {steps[activeStep].children}
    </>
  );
}
