/**
 * This is going to return a JSON object containing all conversations.
 * Structure: getAllConversations().<dimension>.<entity>.<convoName>
 */
const getAllConversationArrays = () => {
    // The functions called here all return smaller JSON objects, and are declared in their own files in the
    // conversation_loaders directory.
    return {
        //factory:    factoryConversationLoader(),
        //lava:       lavaConversationLoader(),
        //mountain:   mountainConversationLoader(),
        // playground: playgroundConversationLoader(),
        //spooky:     spookyConversationLoader(),
        village:    villageConversationLoader(),
        //woods:      woodsConversationLoader(),
        end:        endConversationLoader()
    };
};