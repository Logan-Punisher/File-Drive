"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, SignedIn, SignedOut, useOrganization, useSession, useUser } from "@clerk/nextjs";
import { clients } from "@clerk/nextjs/api";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { Files } from "lucide-react";

export default function Home() {
  const organization = useOrganization();
  const user = useUser()
  let orgId : string | undefined = undefined; 
  
  if(organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }


  const  getFiles = useQuery(api.file.getFiles,orgId  ? { orgId } :'skip' )

  const session = useSession();
  const createFile = useMutation(api.file.createFile)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      

      {
        getFiles?.map(file => {
          return <div key={file._id}>{file.name}</div>
        })
      }

      <Button
        onClick={() => {
          if(!orgId) return;
          createFile({
            name: "hello World",
            orgId,
           });
         }}
        >
            He ho
        </Button>


    </main>
  );
}
