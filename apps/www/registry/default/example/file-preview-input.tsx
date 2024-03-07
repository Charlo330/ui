import * as React from "react"
import { useFilePreview, FilePreview, FileImage, FileInput } from "@/registry/default/ui/file-preview"

export default function FilePreviewInputDemo() {
  const {file, setFile} = useFilePreview();
  return (
    <FilePreview file={file} setFile={setFile}>
      <div className="relative mb-5 flex-row justify-center gap-y-2">
        <FileInput/>
        <FileImage width={200} height={200}/>
      </div>
    </FilePreview>
  )
}
