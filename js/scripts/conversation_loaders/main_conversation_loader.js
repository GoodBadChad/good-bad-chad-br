/**
 * This is going to return a JSON object containing all conversations.
 * Structure: convos.<dimension>.<entity>.<convoName>
 */
const getAllConversations  = () => {
    return {
        //factory:    factoryConversationLoader(),
        //lava:       lavaConversationLoader(),
        //mountain:   mountainConversationLoader(),
        playground: playgroundConversationLoader(),
        //spooky:     spookyConversationLoader(),
        //village:    villageConversationLoader(),
        //woods:      woodsConversationLoader()
    };
};