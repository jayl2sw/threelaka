import React from 'react';

type MessageProps = {
  author: any;
  content: any;
  sameAuthor: any;
  messageCreatedByMe: any;
};

const Message = ({
  author,
  content,
  sameAuthor,
  messageCreatedByMe,
}: MessageProps) => {
  const alignClass = messageCreatedByMe
    ? 'message_align_right'
    : 'message_align_left';

  const authorText = messageCreatedByMe ? 'You' : author;

  return (
    <div className={`message_container ${alignClass}`}>
      {!sameAuthor && <p className="message_title">{authorText}</p>}
      <p className={`message_content`}>{content}</p>
    </div>
  );
};

const Messages = (messages: any) => {
  return (
    <div className="messages_container">
      <div className="messages_container">
        {messages.map((message: any, index: number) => {
          const sameAuthor =
            index > 0 && message.identity === messages[index - 1].identity;

          return (
            <Message
              key={`${message.content}${index}`}
              author={message.identity}
              content={message.content}
              sameAuthor={sameAuthor}
              messageCreatedByMe={message.messageCreatedByMe}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
