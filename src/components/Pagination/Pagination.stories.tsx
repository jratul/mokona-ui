import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Pagination } from "./Pagination";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

function PaginationDemo({ totalPages }: { totalPages: number }) {
  const [page, setPage] = React.useState(1);
  return <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />;
}

export const Default: Story = {
  render: () => <PaginationDemo totalPages={10} />,
};

export const FewPages: Story = {
  render: () => <PaginationDemo totalPages={3} />,
};

export const ManyPages: Story = {
  render: () => <PaginationDemo totalPages={50} />,
};
