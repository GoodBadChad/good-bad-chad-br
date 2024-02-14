/** @returns a JSON object including all conversation arrays which exist in the playground dimension. */
const playgroundConversationLoader = () => {
    // The functions declared here, all defined below, return smaller JSON objects.
    return {
        papaChad: playgroundPapaChadConversationLoader()
    };
};

/** @returns a JSON object including all of Papa Chad's conversation arrays (in the playground). */
const playgroundPapaChadConversationLoader = () => {
    const papa = DialogBubble.SPEAKERS.PAPA_CHAD;
    const chad = DialogBubble.SPEAKERS.CHAD;
    const none = DialogBubble.SPEAKERS.NONE;
    
    return {
        // Note: the following conversation array is not displayed perfectly, because dialog
        //       does not support multiple people talking yet.
        testNoChoices: [
            // 0
            new DialogBubble(
                papa,
                "Good morning son."),
            // 1
            new DialogBubble(
                papa,
                "I hope you've slept well."),
            // 2
            new DialogBubble(
                papa,
                "It is time for you to join me on a hunt!"),
            // 3
            new DialogBubble(
                chad,
                "Ok dad sounds good!",
                true)
        ],
        // The following works perfectly - 1 person talking just going from line to line.
        jerseyShore: [
            new DialogBubble(
                papa,
                "Sam, The first night at bed when you left, Ron made out with 2 girls and put his head between a waitress's breasts. Also was grinding with multiple fat women."),
            new DialogBubble(
                papa,
                "When you left crying at klutch, Ron was holding hands and dancing with a female and took down her number. Multiple people in the house know, therefore you should know the truth.",
                 true)
        ],
        huntingInvitation: [
            // 0
            new DialogBubble(
                papa,
                "Good morning son! How did you sleep?"
            ),
            // 1
            new DecisionBubble(
                "Papa Chad",
                "How did you sleep?",
                [
                    new Choice("Great!", 2),
                    new Choice("Horribly!", 5)
                ]
            ),
            // 2
            new DialogBubble(
                chad,
                "Sleep? I practically hibernated, I feel great!"
            ),
            // 3
            new DialogBubble(
                papa,
                "Great, let's go hunting. I'll meet you in the field on the left."
            ),
            // 4
            new DialogBubble(
                none,
                "Use the A and D keys to walk left and right!",
                true
            ),
            // 5
            new DialogBubble(
                chad,
                "Nah, I was up all night tossing and turning."
            ),
            // 6
            new DialogBubble(
                papa,
                "Alright, get some rest son. We'll go hunting when you're ready."
            )
        ]
    };
};