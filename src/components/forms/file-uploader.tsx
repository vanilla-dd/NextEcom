"use client";

import { UploadDropzone } from "@/lib/helpers";

export default function FileUploader({
  onUpload,
}: {
  onUpload: (url: string, fileName: string) => void;
}) {
  return (
    <main className="flex flex-col items-center justify-between border p-24">
      <UploadDropzone
        endpoint="redeemCode"
        className="ut-button:inline-flex ut-button:cursor-pointer ut-button:items-center ut-button:justify-center ut-button:whitespace-nowrap ut-button:rounded-md ut-button:bg-primary ut-button:text-sm ut-button:font-medium ut-button:text-primary-foreground ut-button:ring-offset-background ut-button:transition-colors ut-button:hover:bg-primary/90 ut-button:focus-visible:outline-none ut-button:focus-visible:ring-2 ut-button:focus-visible:ring-ring ut-button:focus-visible:ring-offset-2 ut-button:disabled:pointer-events-none ut-button:disabled:opacity-50 ut-label:text-black"
        onClientUploadComplete={(res) => {
          alert("Upload Completed");
          onUpload(res[0].url, res[0].name);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
          console.log(error);
        }}
      />
    </main>
  );
}
