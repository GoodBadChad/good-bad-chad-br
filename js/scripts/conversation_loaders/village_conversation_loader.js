const villageConversationLoader = () => {
    return {
        papaChad: papaChadConversationLoader(),
        mayor: mayorConversationLoader(), 
        blacksmith: blacksmithConversationLoader(),
        mama: mamaChadConversationLoader()
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

const mayorConversationLoader = () => {
    const chad = DialogBubble.SPEAKERS.CHAD;
    const mayor = DialogBubble.SPEAKERS.MAYOR;

    return {
        hopefulGreeting: [
            // 0
            new DialogBubble(mayor,
                "Good morning Chad! It's a beautiful day outside, wouldn't you say?"),
            // 1
            new DecisionBubble('Mayor', 'Beautiful day isn\'t it?', [
                new Choice('Sure is! Great for swimming', 2),
                new Choice('It would be nicer outside this tiny town.', 6)
            ]),
            // 2
            new DialogBubble(chad,
                "Sure is, and warm! Might head over to the lake and see if there's any babes!"),
            // 3
            new DialogBubble(mayor,
                "Maybe wait a bit before doing that. I know it doesn't look it, but I sense there will be a storm. There's a strange chill in the air tonight."),
            // 4
            new DialogBubble(mayor,
                "Years of worrying for the people of this town have given me a sense for these things, but they've also made me a bit paranoid."),
            // 5
            new DialogBubble(mayor,
                "But don't let my nerves spoil your fun. The carelessness of youth is a special thing. It escapes from you all too quickly.",
                true),
            // 6
            new DialogBubble(chad,
                "It's nice, sure, but I wonder what it would look like outside this tiny village. I'm dying to get out and explore."),
            // 7
            new DialogBubble(mayor,
                "That feeling is inevitable. There is indeed a lot to see outside of this \"tiny village\". All of us here have had our time outside the boundaries of this peaceful burg."),
            // 8
            new DialogBubble(mayor,
                "Maybe I'm biased, as mayor of this fine village, but my days on the outside have made me all the more grateful for the tranquility of this region."),
            // 9
            new DialogBubble(mayor,
                "I guess all I'm trying to say is, your time will come, Chad, but you shouldn't be too anxious to escape."),
            // 10
            new DialogBubble(mayor,
                "The carelessness of youth is a special thing, and it has a way of escaping from you way too quickly out there."),
            // 11
            new DialogBubble(mayor,
                "But I'll tell ya Chad, when that day does come and you're ready to set out on some great adventure into the unknown, stop by and talk to me first. I may have something to share with you that could help you along the way.",
                true)
        ]
    };
};

const blacksmithConversationLoader = () => {
    const chad = DialogBubble.SPEAKERS.CHAD;
    const bs = DialogBubble.SPEAKERS.BLACKSMITH;
    return {
        merchant: [
            // 0
            new DialogBubble(bs,
                "Hello."),
            // 1
            new DecisionBubble('Blacksmith', 'Hello.', [
                new Choice('I\'d like to see what you have for sale.', 2),
                new Choice('Leave.', 7)
            ]),
            // 2
            new DialogBubble(bs, 'Okay.'),
            // 3
            new DecisionBubble('Blacksmith', 'Okay', [
                new Choice("Rock ammo (25 for 50 runes)", () => {
                    return INVENTORY.runes >= 50 ? 4 : 9;
                }),
                new Choice("Rock ammo (100 for 100 runes)", () => {
                    return INVENTORY.runes >= 100 ? 5 : 9;
                }),
                new Choice("Bomb ammo (5 for 50 runes)", () => {
                    return INVENTORY.runes >= 50 ? 6 : 9;
                }),
                new Choice('Leave.', 7)
            ]),
            // 4
            new DialogBubble(bs, "Here you go.", true, () => {
                INVENTORY.spendRunes(25);
                INVENTORY.adjustAmmo(AmmoItem.ROCK, 25);
            }),
            // 5
            new DialogBubble(bs, "Here you go.", true, () => {
                INVENTORY.spendRunes(100);
                INVENTORY.adjustAmmo(AmmoItem.ROCK, 100);
            }),
            // 6
            new DialogBubble(bs, "Here you go.", true, () => {
                INVENTORY.spendRunes(50);
                INVENTORY.adjustAmmo(AmmoItem.BOMB, 5);
            }),
            // 7
            new DialogBubble(chad, "See ya!"),
            // 8
            new DialogBubble(bs, "mmhm...", true),
            // 9
            new DialogBubble(bs, "Gonna need more than that.", true)
        ]
    };
}

const mamaChadConversationLoader = () => {
    return {
        goodMorning: [
            // 0
            
        ]
    }
}