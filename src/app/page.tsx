"use client";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { UploadButton } from "./upload-button";
import { FileCard } from "./file-card";
import Image from "next/image";
import { Files, Loader2 } from "lucide-react";




export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId : string | undefined = undefined; 
  
  if(organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const  getFiles = useQuery(api.file.getFiles,orgId  ? { orgId } :'skip' )
  const isLoading = getFiles === undefined;


  return (
    <main className="container mx-auto pt-12">
      { isLoading && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
          <Loader2 className="h-32 w-32 animate-spin text-gray-500" />
          <div className="text-2xl">Loading...Hang-On</div>
          
        </div>
      )}

      {!isLoading && getFiles.length === 0 && (
        <div className="flex flex-col gap-8 w-full items-center mt-24">
        <Image
          alt="Image of empty directory"
          width= '300'
          height= '300' 
          
          src="/empty.svg"
        />
        
          <div className="text-2xl "> You have no files, upload a file</div>
          
          <UploadButton />
        </div>
      )}

      {!isLoading && getFiles.length > 0 &&( 
        <>
        <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">CyberTechzy</h1>
        <UploadButton />
      </div>


      <div className="grid grid-cols-3 gap-4">
      {
        getFiles?.map((file) => {
          return <FileCard key={file._id} file={file}/>
        })}
      </div>

      </>
      )}
    </main>
  );
}
