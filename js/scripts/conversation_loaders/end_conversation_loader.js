const endConversationLoader = () => {
  return {
      wizard: wizardConversationLoaderEnd()
  };
};

const wizardConversationLoaderEnd = () => {
  const chad = DialogBubble.SPEAKERS.CHAD;
  const wizard = DialogBubble.SPEAKERS.WIZARD;
  const none = DialogBubble.SPEAKERS.NONE;

  return {
      victory: [
          // 0
          new DialogBubble(wizard,
              "What?!? How did you defeat my robot horde?!"),
          // 1
          new DialogBubble(chad,
              "Your puny minions are no match for the power of CHAD, evil wizard!"),
          // 2
          new DialogBubble(wizard,
              "I should have known..."),
          // 3
          new DialogBubble(wizard,
            "I wish I had more robots :("),
          // 4
          new DialogBubble(none,
            "Congratulations! You defeated the wizard and won the game.")
      ]
  };
};