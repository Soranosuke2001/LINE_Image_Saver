import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import axios from "axios";
import qs from "qs";

import { encrypt } from "@/lib";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");

  if (!code || !state) {
    console.log("Code or State was not found");
    throw new Error("Code or State was not found")
  }

  // Issue a access token
  const data = {
    grant_type: process.env.LINE_TOKEN_GRANT_TYPE!,
    code: code,
    redirect_uri: process.env.LINE_TOKEN_REDIRECT_URI!,
    client_id: process.env.LINE_TOKEN_CLIENT_ID!,
    client_secret: process.env.LINE_TOKEN_CLIENT_SECRET!,
  };

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response1 = await axios.post(
      process.env.LINE_TOKEN_AUTH_URL!,
      qs.stringify(data),
      { headers }
    );
    if (response1.status !== 200) {
      console.log("There was an error issuing a access token");
      throw new Error("Error issuing a access token")
    }

    const { access_token, expires_in, id_token } = response1.data;

    // Verify access token
    const response2 = await axios.get(process.env.LINE_VERIFY_TOKEN_AUTH_URL!, {
      params: {
        access_token,
      },
    });
    if (response2.status !== 200) {
      console.log("There was an error verifying the access token");
      throw new Error("Access token is not valid")
    }

    // Verify id token
    const token_data = {
      id_token,
      client_id: process.env.LINE_TOKEN_CLIENT_ID!,
    };

    const response3 = await axios.post(
      process.env.LINE_VERIFY_TOKEN_AUTH_URL!,
      qs.stringify(token_data),
      { headers }
    );
    if (response3.status !== 200) {
      console.log("There was an error verifying the id token");
      throw new Error("ID token is not valid")
    }

    // Set the session cookie
    const expires = new Date(Date.now() + expires_in);
    const session = await encrypt({ access_token, expires });
    cookies().set("session", session, { expires, httpOnly: true });

    // Fetch user data
    const auth_header = {
      Authorization: `Bearer ${access_token}`,
    };
    const response4 = await axios.get(process.env.LINE_FETCH_PROFILE_URL!, {
      headers: auth_header,
    });
    if (response4.status !== 200) {
      console.log("There was an error fetching the user data");
      throw new Error("Unable to fetch user data")
    }

    const { sub, name, picture } = response4.data;

    if (!sub || !name || !picture) {
      console.log("The access token was not valid");
      throw new Error("Access token is not valid")
    }

    cookies().set("user_id", sub, { expires });
    cookies().set("username", name, { expires });
    cookies().set("profile_image", picture, { expires });
  } catch (error) {
    console.error("Error making the POST request", error);
    redirect("/error");
  }

  redirect("/media");
}
