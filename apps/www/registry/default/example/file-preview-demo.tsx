import * as React from "react"
import { useFilePreview, FilePreview, FileButton, FileImage } from "@/registry/default/ui/file-preview"

export default function FilePreviewDemo() {
  const {file, setFile} = useFilePreview();
  return (
    <FilePreview file={file} setFile={setFile} className="relative mb-5">
        <FileButton className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" variant={"default"}/>
        <FileImage width={200} height={200}/>
    </FilePreview>
  )
}
