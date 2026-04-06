import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Drawer } from "./Drawer";
import { Button } from "../Button";
import { Text } from "../Text";
import { Divider } from "../Divider";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const LeftDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>왼쪽 드로어 열기</Button>
        <Drawer open={open} onOpenChange={setOpen} side="left" title="메뉴">
          <div className="flex flex-col gap-3">
            <Text variant="body1">수학</Text>
            <Divider />
            <Text variant="body1">과학</Text>
            <Divider />
            <Text variant="body1">설정</Text>
          </div>
        </Drawer>
      </>
    );
  },
};

export const RightDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>오른쪽 드로어 열기</Button>
        <Drawer open={open} onOpenChange={setOpen} side="right" title="필터" description="원하는 조건을 선택하세요">
          <div className="flex flex-col gap-3">
            <Text variant="body2" color="muted">난이도</Text>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">기초</Button>
              <Button variant="secondary" size="sm">중급</Button>
              <Button variant="secondary" size="sm">심화</Button>
            </div>
          </div>
        </Drawer>
      </>
    );
  },
};

export const WithTrigger: Story = {
  render: () => (
    <Drawer
      trigger={<Button>트리거로 열기</Button>}
      side="left"
      title="네비게이션"
    >
      <Text variant="body1">드로어 내용</Text>
    </Drawer>
  ),
};

export const NoTitle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>타이틀 없는 드로어</Button>
        <Drawer open={open} onOpenChange={setOpen} side="left">
          <Text variant="body1">타이틀 없이 닫기 버튼만 있는 드로어입니다.</Text>
        </Drawer>
      </>
    );
  },
};
