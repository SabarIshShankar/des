import { ChatEngine } from "react-chat-engine";
import React from "react";
import ChatFeed from "./components/ChatFeed";
import LoginForm from "./components/LoginForm";
import "./styles.css";

const projectID = "ce90368b-2e78-4ce8-8627-4beb1e7fa462";
const App = () => {
  if (!localStorage.getItem("username")) {
    return <LoginForm />;
  }

  return (
    <ChatEngine
      height="100vh"
      projectID={projectID}
      userName={localStorage.getItem("username")}
      userSecret={localStorage.getItem("password")}
      renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
      onNewMessage={() =>
        new Audio(
          "https://chat-engine-assets.s3.amazonaws.com/click.mp3"
        ).play()
      }
    />
  );
};

export default App;
