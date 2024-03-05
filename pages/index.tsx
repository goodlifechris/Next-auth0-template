/* eslint-disable react-hooks/rules-of-hooks */
'use client'
import React, { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

function Index() {
  const { user, error, isLoading } = useUser();
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const response = await fetch('/api/auth/token');
      const { accessToken } = await response.json();
      setAccessToken(accessToken);
    };
    if (user) {
      fetchAccessToken();
    }

  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    console.log(user);
    console.log(accessToken);

    return (
      <div>
        Welcome {user.name}! <Link href="/api/auth/logout">Logout</Link>
        <br />
        Your nickname is {user.nickname}.
      </div>
    );
  }

  return <Link href="/api/auth/login">Login</Link>;
}

export default Index;
