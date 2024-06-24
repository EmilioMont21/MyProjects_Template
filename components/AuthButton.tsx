import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {
AlertDialog,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTitle,
AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { User } from 'lucide-react'
import { createClient } from "@/utils/supabase/server";
import Link from 'next/link';
import { login, signup } from '@/app/login/actions'
import { redirect } from "next/navigation";

async function AuthButton() {

    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const signOut = async () => {
        "use server";
    
        const supabase = createClient();
        await supabase.auth.signOut();
        return redirect("/");
      };

      console.log(user?.email)

    return user ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <User/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>         
                <DropdownMenuItem>
                    <Link href="/saved" className='w-full'>
                        Saved
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <form action={signOut} className='w-full'>
                        <button className='w-full'>
                        Logout
                        </button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <AlertDialog>
            <AlertDialogTrigger asChild>
            <Button variant="outline">Sign in</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Sign in</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription></AlertDialogDescription>
                    <form>
                        <label htmlFor="email">Email:</label>
                        <input id="email" name="email" type="email" required />
                        <label htmlFor="password">Password:</label>
                        <input id="password" name="password" type="password" required />
                        <button formAction={login}>Log in</button>
                        <button formAction={signup}>Sign up</button>
                    </form>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AuthButton