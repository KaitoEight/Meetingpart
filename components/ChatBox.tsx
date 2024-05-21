import { useState, useEffect } from 'react';
import type { User, Channel as StreamChannel } from 'stream-chat';
import { useCreateChatClient, Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
import 'stream-chat-react/dist/css/v2/index.css';

const apiKey = 'rfau69vhgw5y';
const userId = 'yellow-hall-4';
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoieWVsbG93LWhhbGwtNCJ9.G6sHQDKEUSTWGLmgneeM6HOaTDK56ezlUkVXXV3r3wY';

// Set up a User object with the userId

const user: User = {
    id: userId,
};

const ChatBox = () => {

    // Initializes state for the chat box channel with useState

    const [channel, setChannel] = useState<StreamChannel>();

    // Uses useCreateChatClient hook from stream-chat-react to
    // create a chat box service with the API key, user token, and userData

    const client = useCreateChatClient({
        apiKey,
        tokenOrProvider: userToken,
        userData: user,
    });

    // useEffect is here to hook initializes the chat box channel
    // either when the component mounts or when client have changed.
    // It also checks if the client exits, if not then creates new channel
    // Displays a message "Chat is being set up" when chat box is being set up.

    useEffect(() => {
        if (!client) return;

        const channel = client.channel('messaging', 'custom_channel_id', {
            members: [userId],
        });

        setChannel(channel);
    }, [client]);


    if (!client) return <div> Chat is being set up </div>;

    // Renders chat box UI using stream-chat-react.
    // Chat component on the outside to require chat client.

    return (
        <Chat client={client}>
            <Channel channel={channel}>
                <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                </Window>
                <Thread />
            </Channel>
        </Chat>
    );
};

// Export ChatBox component for use in other components

export default ChatBox;
