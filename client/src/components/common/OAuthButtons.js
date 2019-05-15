import React from "react";
import GoogleButton from "./GoogleButton";
import GithubButton from "./GithubButton";

export default function OAuthButtons() {
  return (
    <div
      className="oauth-buttons"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
      }}
    >
      <GoogleButton />
      <GithubButton />
    </div>
  );
}
