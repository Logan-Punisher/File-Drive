"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton, SignedIn, SignedOut, useSession } from "@clerk/nextjs";
import { clients } from "@clerk/nextjs/api";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { Files } from "lucide-react";

export default function Home() {

  const  getFiles = useQuery(api.file.getFiles)

  const session = useSession();
  const createFile = useMutation(api.file.createFile)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton> 
        <Button>Sign Out</Button>
        </SignOutButton>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal"> 
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>

      {
        getFiles?.map(file => {
          return <div key={file._id}>{file.name}</div>
        })
      }

      <Button
        onClick={() => {
          createFile({
            name: "hello World",
           });
         }}
        >
            He ho
        </Button>


    </main>
  );
}
