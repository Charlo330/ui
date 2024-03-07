import { Input } from "@/registry/new-york/ui/input"
import React from "react"
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FileImage as LucideImage } from "lucide-react";
import { VariantProps, cva } from "class-variance-authority";
import { buttonVariants } from "@/registry/new-york/ui/button";

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

const FileInput = () => {
  const { setFile } = useFilePreviewContext();
  return (
    <Input id="picture" type="file" className="" onChange={(e) => {
      const file = e.target.files?.[0]
      if (file) {
        setFile(URL.createObjectURL(file))
      }
    }} />
  )
}

type FileButtonProps = {
  className?: string
} & VariantProps<typeof buttonVariants>;

const FileButton = ({ className, variant, size }: FileButtonProps) => {
  const { setFile } = useFilePreviewContext();
  const buttonVariant = buttonVariants({ variant, size, className }) || "default";
  return (
    <div>
      <input id="inputButton" type="file" hidden onChange={(e) => {
        const file = e.target.files?.[0]
        if (file) {
          setFile(URL.createObjectURL(file))
        }
      }} />
      <label className={cn("flex cursor-pointer p-2", buttonVariant)} htmlFor="inputButton">{<LucideImage />}</label>
    </div>
  )

}

type FileImageProps = {
  width: number
  height: number
}

const FileImage = ({ width, height }: FileImageProps) => {
  const { file } = useFilePreviewContext();

  return (
    <div>
      {file && <Image width={width} height={height} src={file} alt="" className={`w-[${width}px] h-[${height}px]`} />}
    </div>
  )
}

type FilePreviewProps = {
  children: React.ReactNode
  file: string | null
  setFile: (file: string | null) => void
}

const FilePreview = ({ children, file, setFile }: FilePreviewProps) => {

  return (
    <FilePreviewContext.Provider value={{ file: file, setFile: setFile }}>
      {children}
    </FilePreviewContext.Provider>
  )
}

export { FilePreview, FileImage, FileInput, FileButton, useFilePreview }
