import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { BottomSheet } from "./BottomSheet";
import { Button } from "../Button";
import { Text } from "../Text";
import { Divider } from "../Divider";

const meta: Meta<typeof BottomSheet> = {
  title: "Components/BottomSheet",
  component: BottomSheet,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>바텀시트 열기</Button>
        <BottomSheet
          open={open}
          onOpenChange={setOpen}
          title="송금하기"
          description="송금할 계좌를 선택해주세요"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Button fullWidth variant="secondary">토스뱅크 110-123-456789</Button>
            <Button fullWidth variant="secondary">카카오뱅크 333-12-345678</Button>
            <Divider spacing="sm" />
            <Button fullWidth variant="ghost" onClick={() => setOpen(false)}>취소</Button>
          </div>
        </BottomSheet>
      </>
    );
  },
};

export const WithTrigger: Story = {
  render: () => (
    <BottomSheet
      trigger={<Button>열기</Button>}
      title="계좌 선택"
    >
      <Text variant="body1" color="muted">연결된 계좌가 없습니다</Text>
    </BottomSheet>
  ),
};
