
import { Input } from "@/registry/default/ui/input"
import React from "react"
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FileImage as LucideImage } from "lucide-react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/registry/default/ui/button";

type FilePreviewContextProps = {
  file: string | null
  setFile: (file: string | null) => void
}

const FilePreviewContext = React.createContext<FilePreviewContextProps | null>(null)


function useFilePreviewContext() {
  const context = React.useContext(FilePreviewContext)

  if (!context) {
    throw new Error("useFilePreviewContext must be used within a <FilePreviewContext />")
  }

  return context
}

const useFilePreview = () => {
  const [file, setFile] = React.useState<string | null>(null);

  return { file, setFile }
}

type FileInputProps = {
  className?: string
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(({ className, ...props }) => {
  const { setFile } = useFilePreviewContext();
  return (
    <Input id="picture" type="file" accept="image/png, image/jpeg, image/svg" className={cn(className)} {...props} onChange={(e) => {
      const file = e.target.files?.[0]
      if (file) {
        setFile(URL.createObjectURL(file))
      }
    }} />
  )
});
FileInput.displayName = "FileInput";

type FileButtonProps = {
  className?: string
  accept?: string
} & VariantProps<typeof buttonVariants>;

const FileButton = React.forwardRef<HTMLInputElement, FileButtonProps>(({ className, variant, size, accept, ...props }: FileButtonProps) => {
  const { setFile } = useFilePreviewContext();
  const buttonVariant = buttonVariants({ variant, size, className }) || "default";
  return (
    <div>
      <input id="inputButton" type="file" accept={accept ? accept : "image/png, image/jpeg, image/svg"} hidden onChange={(e) => {
        const file = e.target.files?.[0]
        if (file) {
          setFile(URL.createObjectURL(file))
        }
      }} />
      <label className={cn("flex cursor-pointer p-2", buttonVariant, className)} {...props} htmlFor="inputButton">{<LucideImage />}</label>
    </div>
  )

});

FileButton.displayName = "FileButton";

type FileImageProps = {
  width: number
  height: number
  className?: string
}

const FileImage = React.forwardRef<HTMLInputElement, FileImageProps>(({ width, height, className }: FileImageProps) => {
  const { file } = useFilePreviewContext();

  return (
    <div>
      {file && <Image width={width} height={height} src={file} alt="" className={cn(`w-[${width}px] h-[${height}px]`, className)} />}
    </div>
  )
});

FileImage.displayName = "FileImage";

type FilePreviewProps = {
  children: React.ReactNode
  file: string | null
  setFile: (file: string | null) => void
}

const FilePreview = React.forwardRef<HTMLDivElement, FilePreviewProps>(({ children, file, setFile }) => {
  return (
    <FilePreviewContext.Provider value={{ file: file, setFile: setFile }}>
      {children}
    </FilePreviewContext.Provider>
  )
});

FilePreview.displayName = "FilePreview";

export { FilePreview, FileImage, FileInput, FileButton, useFilePreview }
