import React from 'react';
import Messages from './Messages';
import NewMessage from './NewMessage';
const ChatSection = (messages: any) => {
  return (
    <div>
      <Messages messages={messages} />
      <NewMessage />
    </div>
  );
};

export default ChatSection;
