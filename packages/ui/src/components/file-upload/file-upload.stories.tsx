import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { FileUpload, type FileUploadItem } from "./file-upload";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  // No "autodocs" tag: file-upload.mdx attaches a custom docs page via
  // <Meta of={FileUploadStories} />.
  parameters: {
    docs: {
      description: {
        component: `
A drag-and-drop file picker + file list with per-file progress. The dropzone
is a \`<label>\` wrapping a screen-reader-visible \`<input type="file">\` —
native file inputs are already keyboard-operable, so drag-and-drop is an
enhancement layered on top rather than a replacement for it. The file list
uses roving \`tabIndex\` across each row's remove button. A Client Component
(owns drag state and, in uncontrolled mode, the file list itself).

## Overriding this component

**1. Tokens** — \`--ui-color-primary\`, \`--ui-color-border\`, \`--ui-color-danger\`.

**2. \`dropzoneVariants\` / \`fileRowVariants\`** — exported publicly.

**3. \`classNames\`** — a slot map (\`root\`, \`dropzone\`, \`list\`, \`row\`).
        `,
      },
    },
  },
  args: {
    "aria-label": "Product images",
    hint: "PNG or JPG, up to 5MB each.",
    invalid: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Playground: Story = {
  render: (args) => {
    function Demo() {
      const [files, setFiles] = React.useState<FileUploadItem[]>([]);
      return <FileUpload {...args} files={files} onFilesChange={setFiles} />;
    }
    return <Demo />;
  },
};

export const WithValidation: Story = {
  args: { maxSize: 1024 * 1024, accept: "image/*", maxFiles: 3 },
  render: (args) => {
    function Demo() {
      const [files, setFiles] = React.useState<FileUploadItem[]>([]);
      return <FileUpload {...args} files={files} onFilesChange={setFiles} />;
    }
    return <Demo />;
  },
};

export const UploadingWithProgress: Story = {
  render: () => {
    const demoFile = new File(["demo"], "sneaker-hero.png", { type: "image/png" });
    const [files, setFiles] = React.useState<FileUploadItem[]>([
      { id: "1", file: demoFile, status: "uploading", progress: 62 },
    ]);
    return <FileUpload aria-label="Product images" files={files} onFilesChange={setFiles} />;
  },
};

export const WithError: Story = {
  render: () => {
    const demoFile = new File(["demo"], "resume.pdf", { type: "application/pdf" });
    const [files, setFiles] = React.useState<FileUploadItem[]>([
      { id: "1", file: demoFile, status: "error", error: "This file type isn't supported." },
    ]);
    return <FileUpload aria-label="Product images" files={files} onFilesChange={setFiles} />;
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Invalid: Story = {
  args: { invalid: true },
};
