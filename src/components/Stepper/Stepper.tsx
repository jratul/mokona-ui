import * as React from "react";
import { cn } from "../../utils/cn";

export interface StepItem {
  title: string;
  description?: string;
}

export type StepStatus = "completed" | "active" | "upcoming";

export interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

function getStatus(index: number, currentStep: number): StepStatus {
  if (index < currentStep) return "completed";
  if (index === currentStep) return "active";
  return "upcoming";
}

const Stepper = ({ steps, currentStep, orientation = "horizontal", className }: StepperProps) => {
  if (orientation === "vertical") {
    return (
      <div className={cn("flex flex-col", className)}>
        {steps.map((step, index) => {
          const status = getStatus(index, currentStep);
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <StepIndicator index={index} status={status} />
                {!isLast && (
                  <div
                    className={cn(
                      "w-0.5 flex-1 mt-1 mb-1 min-h-[24px]",
                      status === "completed" ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]"
                    )}
                  />
                )}
              </div>
              <div className={cn("flex flex-col pb-6", isLast && "pb-0")}>
                <StepLabel step={step} status={status} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex items-start", className)}>
      {steps.map((step, index) => {
        const status = getStatus(index, currentStep);
        const isLast = index === steps.length - 1;

        return (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center gap-2 min-w-0 flex-1">
              <StepIndicator index={index} status={status} />
              <StepLabel step={step} status={status} centered />
            </div>
            {!isLast && (
              <div
                className={cn(
                  "h-0.5 flex-1 mt-[18px] mx-2 shrink",
                  status === "completed" ? "bg-[var(--color-primary)]" : "bg-[var(--color-border)]"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

function StepIndicator({ index, status }: { index: number; status: StepStatus }) {
  return (
    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold transition-colors duration-200",
        status === "completed"
          ? "bg-[var(--color-primary)] text-white"
          : status === "active"
          ? "border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-[var(--color-surface)]"
          : "border-2 border-[var(--color-border)] text-[var(--color-muted-foreground)] bg-[var(--color-surface)]"
      )}
    >
      {status === "completed" ? <CheckIcon /> : <span>{index + 1}</span>}
    </div>
  );
}

function StepLabel({ step, status, centered }: { step: StepItem; status: StepStatus; centered?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-0.5", centered && "items-center text-center")}>
      <span
        className={cn(
          "text-[13px] font-medium",
          status === "active"
            ? "text-[var(--color-primary)]"
            : status === "completed"
            ? "text-[var(--color-foreground)]"
            : "text-[var(--color-muted-foreground)]"
        )}
      >
        {step.title}
      </span>
      {step.description && (
        <span className="text-[12px] text-[var(--color-muted-foreground)]">{step.description}</span>
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export { Stepper };
