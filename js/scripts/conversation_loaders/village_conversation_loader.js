

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
                })
        ],
        huntingInstruction: [
            // 0
            new DialogBubble(papa,
                "Hey son, glad you're here with me. Now, do you remember everything I've taught you about hunting?"),
            // 1
            new DecisionBubble("Papa Chad", "Do you remember what I've taught you?", [
                new Choice("Why don't you remind me?", 2),
                new Choice("Of course! No need to repeat yourself.", 4)
            ]),
            // 2
            new DialogBubble(papa,
                "You should use your slingshot to shoot at the bunnies from a diatance! Get too close, and you'll scare them. If you see any snakes, you should use your sword! They're too quick to shoot at."),
            // 3
            new DialogBubble(none,
                "Left click your mouse to use your slingshot. Right click to use your sword."),
            // 4
            new DialogBubble(papa,
                "Come talk to me after you've killed one of each: a snake and a bunny.",
                true,
                () => {
                    STORY.huntingInstructionsReceived = true;
                })          
        ],
        huntingInstructionShort: [
            new DialogBubble(papa,
                "Come talk to me after you've killed one of each: a snake and a bunny."),
            new DialogBubble(none,
                "Left click your mouse to use your slingshot. Right click to use your sword.")
        ],
        endOfHunt: [
            new DialogBubble(papa,
                "Fantastic work son! Now, run these back over to Mama Chad so she can whip us up some nourishing MEAT!")
        ]
    };
};