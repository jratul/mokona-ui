import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Stepper } from "./Stepper";
import { Button } from "../Button/Button";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Stepper>;

const steps = [
  { title: "은행 선택", description: "입금 은행을 선택하세요" },
  { title: "계좌 입력", description: "계좌번호를 입력하세요" },
  { title: "금액 입력", description: "송금 금액을 입력하세요" },
  { title: "확인", description: "내용을 확인하고 완료하세요" },
];

function StepperDemo({ orientation }: { orientation?: "horizontal" | "vertical" }) {
  const [current, setCurrent] = React.useState(1);
  return (
    <div className="flex flex-col gap-6">
      <Stepper steps={steps} currentStep={current} orientation={orientation} />
      <div className="flex gap-2">
        <Button size="sm" variant="secondary" onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0}>
          이전
        </Button>
        <Button size="sm" onClick={() => setCurrent((c) => Math.min(steps.length, c + 1))} disabled={current === steps.length}>
          다음
        </Button>
      </div>
    </div>
  );
}

export const Horizontal: Story = {
  render: () => <StepperDemo />,
};

export const Vertical: Story = {
  render: () => <StepperDemo orientation="vertical" />,
};
