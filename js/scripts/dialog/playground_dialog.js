const CONVO1 = [
    {//index 0
        speaker:    "Papa Chad",
        text:       "Good Morning son! How did you sleep?",
        choices:  {
            c1: {
                text: "BAD",
                next: 1
            },
            c2: {
                text: "GOOD",
                next: 2
            }
        }   
    },
    {//index 1
        speaker:    "Papa Chad",
        text:       "Go back to bed then son.",
        end:        true
    },
    {// index 2
        speaker:    "Papa Chad",
        text:       "Let's go hunt some rabbits then!"
    },
    {// index 3
        speaker:    "Chad",
        text:       "Okay dad! GREAT!"
    },
    {// index 4
        speaker:    null,
        text:       "Use A and D to move right and left!",
        end: true
    }
];

// Algorithm for traversing dialog.
// DialogEater(string[] convo)
//  Set i = 0.
//  while (i < convo.length):
//      display convo[i].
//      if (convo.responses):
//          chosenResponse = [users choice of r1, r2, ...].
//          i = chosenResponse.next.
//      else if (!convo.end):
//          i++.
//      else:
//          i = convo.length.
//  End DialogEater.
