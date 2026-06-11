import { useState } from "react";
import { CheckIcon } from "../../../utils/icons";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";

export default function Stepper({ steps, extra }) {
  const [activeStep, setActiveStep] = useState(0);
  const { Component } = steps[activeStep]
  const { trigger } = useFormContext();

  const goBack = () => {
    setActiveStep((step) => Math.max(step - 1, 0));
  };

  const goNext = async () => {
    const fields = steps[activeStep].fields ?? [];
    const isStepValid = fields.length === 0 || await trigger(fields, { shouldFocus: true });

    if (!isStepValid) return; 

    setActiveStep((step) => Math.min(step + 1, steps.length - 1));
  };

  return (
    <>
      <div className="flex justify-between items-center space-y-3">
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
              <div className="h-px bg-surface-dim w-full">
                <div
                  className={`h-px bg-primary transition-[width] duration-500 ease-in-out ${i < activeStep ? 'w-full' : 'w-0'
                    }`}
                />
              </div>
            }
          </Fragment>
        ))}
      </div>
      <Component
        onBack={goBack}
        onNext={goNext}
        extra={extra}
      />
    </>
  );
}
