const playgroundConversationLoader = () => {
    return {
        papaChad: papaChadConversationLoader()
    };
};

const papaChadConversationLoader = () => {
    const papa = DialogBubble.SPEAKERS.PAPA_CHAD;
    const chad = DialogBubble.SPEAKERS.CHAD;
    return {
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
        jerseyShore: [
            new DialogBubble(
                papa,
                "Sam, The first night at bed when you left, Ron made out with 2 girls and put his head between a waitress's breasts. Also was grinding with multiple fat women."),
            new DialogBubble(
                papa,
                "When you left crying at klutch, Ron was holding hands and dancing with a female and took down her number. Multiple people in the house know, therefore you should know the truth.",
                 true)
        ]
    };
    
};

// // Algorithm for traversing dialog.
// // DialogEater(string[] convo)
// //  Set i = 0.
// //  while (i < convo.length):
// //      display convo[i].
// //      if (convo.responses):
// //          chosenResponse = [users choice of r1, r2, ...].
// //          i = chosenResponse.next.
// //      else if (!convo.end):
// //          i++.
// //      else:
// //          i = convo.length.
// //  End DialogEater.
