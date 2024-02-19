

const villageConversationLoader = () => {
    return {
        papaChad: papaChadConversationLoader()
    };
};

const papaChadConversationLoader = () => {
    const chad = DialogBubble.SPEAKERS.CHAD;
    const papa = DialogBubble.SPEAKERS.PAPA_CHAD;
    const none = DialogBubble.SPEAKERS.NONE;

    return {
        huntingInvite: [
            // 0
            new DialogBubble(papa,
                "Good morning Chad! Did you get a good night's rest?"),
            // 1
            new DialogBubble(chad,
                "I slept amazing Papa Chad! Snug as a bug in a rug. Had some crazy dreams though. I was in some spooky woods, and there were pigs everywhere!"),
            // 2
            new DialogBubble(papa,
                "Ha, sounds crazy son. Are you hungry? I'm about to go hunting, get some MEAT! for Mama Chad to cook up for us. You should join me!"),
            // 3
            new DialogBubble(chad,
                "I'm always hungry!"),
            // 4
            new DialogBubble(papa,
                "Heh, I know that's right. Well, get yourself ready and meet me on the western side of town. We'll go hunting in the field over yonder."),
            // 5
            new DialogBubble(none,
                "Use the A and D keys to move left and right!",
                true,
                () => {
                    STORY.invitedHunting = true;
                    console.log(STORY);
                })
        ]
    };
};