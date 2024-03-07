import * as React from "react"
import { FileButton, FilePreview, useFilePreview, FileImage } from "@/registry/new-york/ui/file-preview"

export default function FilePreviewDemo() {
  const {file, setFile} = useFilePreview()
  return (
    <FilePreview file={file} setFile={setFile}>
      <div className="relative mb-5">
        <FileButton className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <FileImage width={200} height={200}/>
      </div>
    </FilePreview>
  )
}
