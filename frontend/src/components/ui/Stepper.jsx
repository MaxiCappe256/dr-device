import { useState } from "react";
import { CheckIcon } from "../../utils/icons";
import { Fragment } from "react";

export default function Stepper({ steps }) {
  const [activeStep, setActiveStep] = useState(0);
  const { Component } = steps[activeStep]

  return (
    <>
      <div className="flex justify-between items-center">
        {steps.map((step, i) => (
          <Fragment key={step.id}>
            <div
              className="flex flex-col justify-center items-center gap-2 select-none w-fit"
              >
              <div
                className={`rounded-full size-12 text-center flex justify-center items-center ${activeStep === i ? "bg-primary text-white" : i < activeStep ? 'border-2 border-primary text-white' : 'bg-surface-container text-tertiary'}`}
              >
                {i < activeStep ? <CheckIcon className="text-primary" height="24" /> : i + 1}
              </div>
              <span
                className={`truncate ${activeStep === i ? "text-primary font-semibold" : "text-tertiary"}`}
              >
                {step.label}
              </span>
            </div>
            {i != steps.length - 1 &&
              <div className="h-[1px] bg-surface-dim w-full">
                <div
                  className={`h-[1px] bg-primary transition-[width] duration-500 ease-in-out ${i < activeStep ? 'w-full' : 'w-0'
                    }`}
                />
              </div>
            }
          </Fragment>
        ))}
      </div>
      <Component
        onBack={() => setActiveStep((s) => s - 1)}
        onNext={() => setActiveStep((s) => s + 1)}
      />
    </>
  );
}
