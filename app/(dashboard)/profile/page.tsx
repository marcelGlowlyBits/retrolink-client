"use client";
import { SignInButton, SignUpButton, SignOutButton } from "@clerk/clerk-react";

export default function Profile() {
    return (
        <div>
            <h1>Profile page</h1>
            <SignUpButton />
            <SignInButton />
            <SignOutButton />
        </div>
    )
}