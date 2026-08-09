"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../icon/icon";
import { getMessages } from "../../i18n/messages";
import {
  fileUploadVariants,
  dropzoneVariants,
  fileListVariants,
  fileRowVariants,
  fileRowProgressVariants,
  fileRowProgressBarVariants,
  type DropzoneVariantsProps,
} from "./file-upload.variants";

export interface FileUploadItem {
  id: string;
  file: File;
  /** 0-100. Omit while the file hasn't started uploading. */
  progress?: number;
  status?: "pending" | "uploading" | "done" | "error";
  /** Shown under the row when `status` is `"error"`. Set by this component for validation failures, or by the consumer for an upload failure. */
  error?: string;
}

export interface FileUploadClassNames {
  root?: string;
  dropzone?: string;
  list?: string;
  row?: string;
}

export interface FileUploadProps extends DropzoneVariantsProps, React.AriaAttributes {
  id?: string;
  /** Reaches the dropzone box — the part that visually reads as this component's root. */
  className?: string;
  classNames?: FileUploadClassNames;
  /** Forwarded to the file input. */
  accept?: string;
  multiple?: boolean;
  /** In bytes. Files over this size are added with `status: "error"`. */
  maxSize?: number;
  /** Caps the total number of accepted files; excess drops/selections are ignored. */
  maxFiles?: number;
  disabled?: boolean;
  invalid?: boolean;
  /** Extra instructional copy under the dropzone's main line, e.g. "PNG or JPG, up to 5MB." */
  hint?: React.ReactNode;
  files?: FileUploadItem[];
  defaultFiles?: FileUploadItem[];
  onFilesChange?: (files: FileUploadItem[]) => void;
  /** Fired with just the newly accepted files, before they're merged into `files`. */
  onFilesAdded?: (added: FileUploadItem[]) => void;
}

function generateId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `file-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  return `${value.toFixed(value < 10 ? 1 : 0)} ${units[unitIndex]}`;
}

function matchesAccept(file: File, accept?: string): boolean {
  if (!accept) return true;
  const patterns = accept.split(",").map((p) => p.trim().toLowerCase());
  const fileName = file.name.toLowerCase();
  const fileType = file.type.toLowerCase();
  return patterns.some((pattern) => {
    if (pattern.startsWith(".")) return fileName.endsWith(pattern);
    if (pattern.endsWith("/*")) return fileType.startsWith(pattern.slice(0, -1));
    return fileType === pattern;
  });
}

/**
 * A drag-and-drop file picker + file list with per-file progress. The
 * dropzone is a `<label>` wrapping a screen-reader-visible (not
 * `display:none`) `<input type="file">` — native file inputs are already
 * keyboard-operable (Tab focuses it, Enter/Space opens the OS picker), so
 * drag-and-drop layers on top of, rather than replaces, that. The file list
 * uses roving `tabIndex` across each row's remove button (arrow keys move
 * between rows; Tab exits the list in one stop), and a visually-hidden live
 * region announces how many files were accepted. Necessarily a Client
 * Component (CLAUDE.md rule 2: owns drag state and, in uncontrolled mode,
 * the file list itself).
 */
export const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      id,
      className,
      classNames,
      size,
      accept,
      multiple = true,
      maxSize,
      maxFiles,
      disabled = false,
      invalid = false,
      hint,
      files,
      defaultFiles,
      onFilesChange,
      onFilesAdded,
      "aria-describedby": ariaDescribedBy,
      ...rest
    },
    forwardedRef,
  ) => {
    const t = getMessages();
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(forwardedRef, () => inputRef.current as HTMLInputElement);
    const removeButtonRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
    const pendingFocusIndex = React.useRef<number | null>(null);

    const isControlled = files !== undefined;
    const [uncontrolledFiles, setUncontrolledFiles] = React.useState<FileUploadItem[]>(
      defaultFiles ?? [],
    );
    const items = isControlled ? files : uncontrolledFiles;

    const [dragging, setDragging] = React.useState(false);
    const [rovingIndex, setRovingIndex] = React.useState(0);
    const [liveMessage, setLiveMessage] = React.useState("");

    React.useEffect(() => {
      if (pendingFocusIndex.current === null) return;
      removeButtonRefs.current[pendingFocusIndex.current]?.focus();
      pendingFocusIndex.current = null;
    }, [items]);

    function commit(next: FileUploadItem[]) {
      if (!isControlled) setUncontrolledFiles(next);
      onFilesChange?.(next);
    }

    function addFiles(fileList: FileList | File[]) {
      const incoming = Array.from(fileList);
      const room = typeof maxFiles === "number" ? Math.max(maxFiles - items.length, 0) : incoming.length;
      const accepted = incoming.slice(0, room);

      const added: FileUploadItem[] = accepted.map((file) => {
        if (typeof maxSize === "number" && file.size > maxSize) {
          return { id: generateId(), file, status: "error", error: t.fileUpload.fileTooLarge(file.name, formatBytes(maxSize)) };
        }
        if (!matchesAccept(file, accept)) {
          return { id: generateId(), file, status: "error", error: t.fileUpload.fileTypeNotAllowed(file.name) };
        }
        return { id: generateId(), file, status: "pending" };
      });

      if (added.length === 0) return;
      onFilesAdded?.(added);
      commit([...items, ...added]);
      setLiveMessage(t.fileUpload.filesAdded(added.length));
    }

    function removeAt(index: number) {
      const next = items.filter((_, i) => i !== index);
      commit(next);
      const nextFocusIndex = Math.min(index, next.length - 1);
      if (nextFocusIndex >= 0) {
        pendingFocusIndex.current = nextFocusIndex;
        setRovingIndex(nextFocusIndex);
      } else {
        // The last remaining row was removed — return focus to the dropzone
        // instead of letting it fall back to <body>.
        setRovingIndex(0);
        inputRef.current?.focus();
      }
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
      if (event.target.files) addFiles(event.target.files);
      event.target.value = "";
    }

    function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
      event.preventDefault();
      setDragging(false);
      if (disabled) return;
      if (event.dataTransfer.files.length) addFiles(event.dataTransfer.files);
    }

    function handleRowKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
      const count = items.length;
      if (count === 0) return;
      let nextIndex: number | null = null;
      if (event.key === "ArrowDown") nextIndex = (index + 1) % count;
      else if (event.key === "ArrowUp") nextIndex = (index - 1 + count) % count;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = count - 1;
      else if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        removeAt(index);
        return;
      }
      if (nextIndex !== null) {
        event.preventDefault();
        setRovingIndex(nextIndex);
        removeButtonRefs.current[nextIndex]?.focus();
      }
    }

    return (
      <div className={cn(fileUploadVariants(), classNames?.root)}>
        <label
          htmlFor={inputId}
          data-dragging={dragging ? "true" : undefined}
          data-invalid={invalid ? "true" : undefined}
          data-disabled={disabled ? "true" : undefined}
          onDragEnter={(event) => {
            event.preventDefault();
            if (!disabled) setDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={(event) => {
            event.preventDefault();
            setDragging(false);
          }}
          onDrop={handleDrop}
          className={cn(dropzoneVariants({ size }), classNames?.dropzone, className)}
        >
          <input
            ref={inputRef}
            id={inputId}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleInputChange}
            aria-invalid={invalid || undefined}
            aria-describedby={ariaDescribedBy}
            className="sr-only"
            {...rest}
          />
          <Icon name="upload" size="lg" className="text-foreground-muted" />
          <p className="font-sans text-sm text-foreground">
            {t.fileUpload.dropzone}{" "}
            <span className="font-medium text-primary underline">{t.fileUpload.browse}</span>
          </p>
          {hint ? <p className="font-sans text-xs text-foreground-muted">{hint}</p> : null}
        </label>

        <span role="status" aria-live="polite" className="sr-only">
          {liveMessage}
        </span>

        {items.length > 0 ? (
          <ul className={cn(fileListVariants(), classNames?.list)}>
            {items.map((item, index) => {
              const status = item.status ?? "pending";
              return (
                <li
                  key={item.id}
                  data-status={status}
                  className={cn(fileRowVariants(), classNames?.row)}
                >
                  <Icon
                    name={status === "error" ? "alert-circle" : "file"}
                    className={status === "error" ? "shrink-0 text-danger" : "shrink-0 text-foreground-muted"}
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate font-sans text-sm text-foreground">{item.file.name}</span>
                      <span className="shrink-0 font-sans text-xs text-foreground-muted">
                        {formatBytes(item.file.size)}
                      </span>
                    </div>
                    {status === "uploading" && typeof item.progress === "number" ? (
                      <div
                        role="progressbar"
                        aria-label={t.fileUpload.progress(item.file.name, item.progress)}
                        aria-valuenow={item.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        className={fileRowProgressVariants()}
                      >
                        <div
                          className={fileRowProgressBarVariants()}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    ) : null}
                    {status === "error" && item.error ? (
                      <p className="font-sans text-xs text-danger">{item.error}</p>
                    ) : null}
                  </div>
                  <button
                    ref={(node) => {
                      removeButtonRefs.current[index] = node;
                    }}
                    type="button"
                    tabIndex={index === rovingIndex ? 0 : -1}
                    aria-label={t.fileUpload.remove(item.file.name)}
                    onFocus={() => setRovingIndex(index)}
                    onClick={() => removeAt(index)}
                    onKeyDown={(event) => handleRowKeyDown(event, index)}
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded text-foreground-muted outline-none",
                      "hover:bg-surface-raised hover:text-foreground",
                      "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                    )}
                  >
                    <Icon name="close" size="sm" />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    );
  },
);

FileUpload.displayName = "FileUpload";
