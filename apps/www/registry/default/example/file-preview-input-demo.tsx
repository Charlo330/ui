import * as React from "react"
import { useFilePreview, FilePreview, FileImage, FileInput } from "@/registry/default/ui/file-preview"

export default function FilePreviewInputDemo() {
  const {file, setFile} = useFilePreview();
  return (
    <FilePreview file={file} setFile={setFile} className="relative mb-5">
        <FileInput/>
        <FileImage width={200} height={200} className="m-auto mt-2"/>
    </FilePreview>
  )
}
