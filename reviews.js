// ============================================================
// FILM REVIEWS — Hand-selected Letterboxd reviews
// ============================================================
// Keyed by film title (must match titles in events.js exactly).
// Each entry is an array of review objects with:
//   name:          First name of the reviewer
//   rating:        0.5–5.0 in 0.5 increments (null if not rated)
//   text:          The review text
//   liked:         true if the reviewer hearted the film (optional)
//   rewatch:       true if tagged as a rewatch (optional)
//   letterboxdUrl: Permalink to the review on Letterboxd
//   date:          Date the review was written (YYYY-MM-DD)
// ============================================================

const FILM_REVIEWS = {

  "Eephus": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "The first time I watched this I was focused on the thing that was ending. This time out, I really appreciated the thing that was happening, and the memory it created. Til the end of time those guys will be telling the story of this game.",
      letterboxdUrl: "https://letterboxd.com/djweaver29/film/eephus/1/",
      date: "2026-04-07"
    },
  ],

  "The Taste of Things": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "What a lovely start to a new season of Movies in the Barn.",
      letterboxdUrl: "https://boxd.it/9iqXFj",
      date: "2025-04-01"
    },
    {
      name: "Nik O.",
      rating: 4.5,
      liked: true,
      letterboxdUrl: "https://boxd.it/9iqfKT",
      date: "2025-04-01"
    },
  ],

  "Babette's Feast": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "The gentlest comeuppance to ever be received.",
      letterboxdUrl: "https://boxd.it/9uKmYr",
      date: "2025-04-22"
    },
    {
      name: "Nathan H.",
      rating: 3.5,
      liked: true,
      letterboxdUrl: "https://boxd.it/9JMwSx",
      date: "2025-04-22"
    },
  ],

  "An Affair to Remember": [
    {
      name: "Dylan W.",
      text: "It's so interesting to see McCarey revisit a movie 18 years later and not change all that much. It's a little bit longer and there's some change in the dialogue, but way more is the same than is different. It's an interesting exercise. Especially when the original is so perfect. I don't think there's anything improved by remaking it, but it's fun to get to see a movie I love again for the first time.",
      letterboxdUrl: "https://boxd.it/9CYYN7",
      date: "2025-05-06"
    },
    {
      name: "Nathan H.",
      rating: 3.0,
      liked: true,
      letterboxdUrl: "https://boxd.it/9JMuhf",
      date: "2025-05-06"
    },
  ],

  "Before Sunset": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Second hottest \"I know\" in cinema.",
      letterboxdUrl: "https://boxd.it/9KUz2f",
      date: "2025-05-20"
    },
  ],

  "Godzilla": [
    {
      name: "Dylan W.",
      text: "The idea of protecting Godzilla and studying him is thrown to the side so quickly and immediately dismissed any time it is mentioned. So much so that you expect the noble act to be not killing him. But instead they do opt to kill him, but with a million precautions to ensure it can't happen this way again.\n\nThat is a noble act, and this movie holds it out a such. But Godzilla has already done the destructive acts. We can assume that he will strike again based on previous evidence, but he's just chilling on his own when he is killed. His death isn't just because of a presumption that he'll strike again. It's also revenge for atrocities already committed.\n\nStarting to think this movie might be a metaphor...",
      letterboxdUrl: "https://boxd.it/9TJR8z",
      date: "2025-06-03"
    },
    {
      name: "Nathan H.",
      liked: true,
      letterboxdUrl: "https://boxd.it/aEGEoV",
      date: "2025-06-03"
    },
  ],

  "Godzilla Minus One": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "I love that the original Godzilla ends in a self-sacrifice and that Godzilla Minus One does not.",
      letterboxdUrl: "https://boxd.it/a2sfQb",
      date: "2025-06-17"
    },
    {
      name: "Alex S.",
      rating: 2.0,
      text: "I don't think this actually happened",
      letterboxdUrl: "https://boxd.it/a2qVUv",
      date: "2025-06-17"
    },
  ],

  "Lilo & Stitch": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Boy this movie rules. Amazing that it packs so much heart alongside a goofy sci-fi premise. Like Stitch better when he's not talking. Forgot how much alien stuff is in this; terrified to find out what the live action Pleakly looks like. So fun getting to hear some of the kids singing along to the songs. I was so obsessed with Lilo & Stitch as a franchise growing up that I forgot how genuinely small in scope this movie is. Real big fan.",
      letterboxdUrl: "https://boxd.it/agAgNf",
      date: "2025-07-08"
    },
    {
      name: "Nathan H.",
      rating: 4.0,
      rewatch: true,
      liked: true,
      letterboxdUrl: "https://boxd.it/aEGFT1",
      date: "2025-07-08"
    },
  ],

  "Treasure Planet": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Did not appreciate how hard the \"camera\" goes in some of these scenes as a kid. Treasure Planet walked so Tintin could run.",
      letterboxdUrl: "https://boxd.it/arlCV5",
      date: "2025-07-22"
    },
  ],

  "Sing Street": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "I watch a movie like this and think <i>I should have been in a band when I was in high school in Dublin in the 80s</i>.",
      letterboxdUrl: "https://boxd.it/aIeSeZ",
      date: "2025-08-12"
    },
  ],

  "Moonrise Kingdom": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "It's incredible that Wes captures what it felt like to be a kid in a movie that's engaging for adults. Call them precocious all you want, but I would sit there as a kid with my friends and devise these exact sorts of schemes, thinking we were the smartest people out there. We just never had the follow through to actually do them.",
      letterboxdUrl: "https://boxd.it/aSns43",
      date: "2025-08-26"
    },
  ],

  "The Florida Project": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "My recollection was that Halley was a more sympathetic character. The movie doesn't need her to be for it to work though. So often this sort of narrative portrays someone who is truly trying their best, but Halley isn't . She's just existing in the only way she knows how.",
      letterboxdUrl: "https://boxd.it/b5TMf7",
      date: "2025-09-16"
    },
  ],

  "Daddy Longlegs": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "This guy sleeps with a woman, then invites himself and his two kids on a weekend trip with her and her boyfriend, and he faces no consequences.",
      letterboxdUrl: "https://boxd.it/befhQd",
      date: "2025-09-30"
    },
    {
      name: "Nathan H.",
      rating: 3.0,
      rewatch: true,
      liked: true,
      letterboxdUrl: "https://boxd.it/bq9XIV",
      date: "2025-09-30"
    },
  ],

  "Phantom of the Paradise": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Carburetors man, that’s what life’s all about.",
      letterboxdUrl: "https://boxd.it/boZBXl",
      date: "2025-10-17"
    },
    {
      name: "Nathan H.",
      rating: 4.0,
      liked: true,
      letterboxdUrl: "https://boxd.it/bq9Mnn",
      date: "2025-10-17"
    },
  ],

  "Little Shop of Horrors": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "I know every other cameo is bigger and more exciting, but Christopher Guest steals the whole movie with his one scene.",
      letterboxdUrl: "https://boxd.it/bwMnzv",
      date: "2025-10-28"
    },
    {
      name: "Toby P.",
      rating: 3.5,
      liked: true,
      text: "What a wild ride this is! Wasn't sure what to expect and wasn't sure if this would be my thing but was pleasantly surprised!",
      letterboxdUrl: "https://boxd.it/bwNbYF",
      date: "2025-10-28"
    },
  ],

  "Patty Hearst": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Had a good time watching this again post One Battle After Another.",
      letterboxdUrl: "https://boxd.it/bGzU5R",
      date: "2025-11-11"
    },
  ],

  "Inside Man": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Such a triumphant end to a great year of barn movies.",
      letterboxdUrl: "https://boxd.it/bQl3cn",
      date: "2025-11-25"
    },
    {
      name: "Nathan H.",
      rating: 3.5,
      liked: true,
      letterboxdUrl: "https://boxd.it/bVySPh",
      date: "2025-11-25"
    },
  ],

  "The Last Duel": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "This movie is a tightrope walk. Affleck in act 2 should throw the balance off entirely, yet somehow he doesn't. Good movie.",
      letterboxdUrl: "https://boxd.it/6nNLyR",
      date: "2024-04-30"
    },
    {
      name: "Nathan H.",
      rating: 3.0,
      liked: true,
      letterboxdUrl: "https://boxd.it/6ttXmx",
      date: "2024-04-30"
    },
  ],

  "Love Affair": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "There are moments of melodrama and singing which feel dated, but by and large this movie plays incredibly well in 2024. So much joy sitting in a room of people as they laugh at jokes that are 85 years old. As someone who primarily flirts through wit and banter, it's no surprise that a talky romance connects with me. But watching everyone else connect to it and enjoy different moments was truly incredible.",
      letterboxdUrl: "https://boxd.it/6tBJJD",
      date: "2024-05-14"
    },
    {
      name: "Nathan H.",
      rating: 3.5,
      liked: true,
      letterboxdUrl: "https://boxd.it/6tBJ9Z",
      date: "2024-05-14"
    },
  ],

  "Before Sunrise": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Ethan Hawke is such a Linklater stand-in in this movie. It's wild how much this movie feels a piece with Slackers and Waking Life. Kinda can't believe you can make something with so much pretentious, philosophical dialogue that is so romantic. A true testament to the chemistry of the performances, but also the decision to not make these characters too much of one thing.",
      letterboxdUrl: "https://boxd.it/6zlUgJ",
      date: "2024-05-28"
    },
  ],

  "Whip It": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Much like a well worn Stryper t-shirt, this movie is so comfy but maybe a little threadbare. I still love watching it, and getting to watch it with a crowd rules, but some of the gaps are starting to show.",
      letterboxdUrl: "https://boxd.it/6F21YR",
      date: "2024-06-11"
    },
  ],

  "Lady Bird": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "It had been too long, and I forgot how much I love this movie. There's a lot of charm and wit, but there's also just straightforward comedy, which I had fully forgotten.\n\nIt's also the first time I've seen it since watching The Wise Kids, and man, would those movies pair well together. I showed it in the barn alongside Whip It this month, which I stand by as a great pairing, but I had forgotten that it was set across an entire year of school and had as interplay with faith as it does. So if you're reading this and like Lady Bird, you should really watch The Wise Kids. Even if you're not reading this and don't like Lady Bird, you should watch The Wise Kids. It is well worth your time.",
      letterboxdUrl: "https://boxd.it/6KvYrb",
      date: "2024-06-25"
    },
  ],

  "Fantastic Mr. Fox": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Every performance is a career best, but Dafoe is unreal.",
      letterboxdUrl: "https://boxd.it/6TxVyj",
      date: "2024-07-16"
    },
    {
      name: "Jacob L.",
      rating: 4.0,
      liked: true,
      text: "Somehow I haven't seen this film before today. What a great movie, I regret not having seen it all the way through sooner.",
      letterboxdUrl: "https://boxd.it/6WNAy7",
      date: "2024-07-16"
    },
  ],

  "Chicken Run": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Mrs. Tweedy is one of the scariest villains ever put on film.",
      letterboxdUrl: "https://boxd.it/6ZUmY7",
      date: "2024-07-30"
    },
    {
      name: "Nathan H.",
      rating: 3.5,
      rewatch: true,
      liked: true,
      letterboxdUrl: "https://boxd.it/76g9il",
      date: "2024-07-30"
    },
  ],

  "Guardians of the Galaxy": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Programmed this in as a barn movie this year on the excuse that it turned 10 years old this month. The impact this movie has had in the 10 years since is enormous.\n\nMarvel has also changed so much in those 10 years. This movie was considered a massive risk as no one had heard of these characters, but these days no one has heard of any of the characters who get movies. James Gunn was a director who hadn't had a prior hit, which also became the template. The irreverence of this movie was so unexpected and risque at the time, but Disney just released an R-rated Deadpool movie.\n\nBut none of the subsequent movies hit the balance of this film. The closest I've seen is last year's Dungeons & Dragons (which is also the movie I paired with this one for the month). There's a sincerity and earnestness here, alongside all the dumb jokes \n\nFor the most part, this movie aged incredibly well. There are some jokes that don't land, but they didn't then either. The CGI looks better than most movies Marvel releases now, but it has moments of video game-iness. A lot of the fighting is still cut to death. And the one-sided-telephone-call of Rocket & Groot could've used a second pass (Han & Chewy did it better). Exposition gets shoehorned throughout in ways that work and ways that don't.\n\nWhat does work is an incredible cast and well defined characters. The movie juggles a huge ensemble by giving some core characters one comedic schtick, but this is a feature, not a flaw. Even then, we get backstory for everyone sprinkled in. So much more is communicated through Rocket giving us tidbits of his past than forcing us to endure his trauma firsthand in Vol. 3.\n\nGunn knows how to play with the tropes that were already present in Marvel 6 years into its existence. The frequent subversions had me laughing, while not undermining the emotional weight. It turns out, when you focus more on characters than plot, the rest just kind of falls into place.\n\nTen years out, I am even more convinced that this is the best the MCU has to offer",
      letterboxdUrl: "https://boxd.it/76r7sv",
      date: "2024-08-14"
    },
  ],

  "Dungeons & Dragons: Honor Among Thieves": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "I won't be so bold as to say this iterates on Guardians of the Galaxy, but it certainly uses the template well.",
      letterboxdUrl: "https://boxd.it/7cyNT7",
      date: "2024-08-27"
    },
  ],

  "Elvis": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Arguably this movie should not be over 2 and half hours long. But that time does give it the ability to do focus in on Elvis's life with more specificity than it would if you crammed it all in to 2 hours. A 2 hour movie would need to either breeze past even more or focus in on something really specific, and I think either way I'd probably like it less. The biopic formula exists for a reason, and Luhrmann finds interesting choices to make inside that general template. I would love to see someone use the Steve Jobs template for a musician though. \n\nAnyway, this movie is fun, it's kinetic, and it's definitely worth watching on a large screen with some friends.",
      letterboxdUrl: "https://boxd.it/7m2Cqz",
      date: "2024-09-17"
    },
  ],

  "Priscilla": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Imagining Tom Hanks in a fat suit every time Elvis has a one-sided telephone call with The Colonel.",
      letterboxdUrl: "https://boxd.it/7s9nUn",
      date: "2024-10-01"
    },
    {
      name: "Chriss K.",
      rating: 4.0,
      text: "genuinely frightening in a way that makes me want to read her memoir all in one sitting and then not be able to fall asleep afterwards. jacob elordi elvis voice so damn hard to parse",
      letterboxdUrl: "https://boxd.it/7s9BoZ",
      date: "2024-10-01"
    },
  ],

  "The Witches of Eastwick": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "This movie goes so far off the rails that it somehow lands back on them. So much laughter and so much discomfort. Incredibly fortunate to have friends who trust me enough to take them on this ride.",
      letterboxdUrl: "https://boxd.it/7z4HHB",
      date: "2024-10-15"
    },
  ],

  "Death Becomes Her": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "It's been a long time since I've laughed this hard this frequently during a movie.",
      letterboxdUrl: "https://boxd.it/7GfmUJ",
      date: "2024-10-29"
    },
  ],

  "Digging for Fire": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Rosemarie DeWitt and Orlando Bloom wearing the same outfit on the beach is so funny.",
      letterboxdUrl: "https://boxd.it/7NtxLf",
      date: "2024-11-12"
    },
  ],

  "While We're Young": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "You can draw a straight line from the ending of this movie to the ending of White Noise. It also makes me want to rewatch Mistress America, which goes off the rails at the end and has generally been my bottom ranked Baumbach. Funny that he makes Meyerowitz after this because it really feels like this should be the moment he pivots from Stiller as the self insert to Driver. Even that movie though has a heightened climax as a sort of emotional catharsis.\n\nIt's a real toss up between this and Marriage Story for which is Baumbach's most palatable/commercial movie, but Marriage Story got so much critical and Academy acclaim that it feels more elevated, where as this movie really feels like it doesn't have a fan base. It's too commercial for the nerds but still unconventional enough to drive away normies.\n\nBut here's the thing, I love it. \n\nI programmed it in as the final night of Movies in the Barn 2024 knowing it would be a crowd pleaser. But in the run up to that, I started to think of that as being all it was, and as such, I wasn't really looking forward to it. But getting to watch it with a crowd put me right back on track.\n\nThis movie is so rife with understated jokes and incredible performances. In typical Baumbach fashion, everyone is doing the things they do best, but in a way that still feels somewhat grounded. And the points he's making contrasting old and new are heavy handed, but I genuinely like the ideas he's wrestling with.\n\nIt's not as though Noah Baumbach needs someone else to go to bat for him. He's had a long career that somehow seems to still be on the rise. But I also don't think this movie gets its due. So it may have entered the category of movies I've seen so much that they seem cliché, but it did so on merit.",
      letterboxdUrl: "https://boxd.it/7Uv84H",
      date: "2024-11-26"
    },
  ],

  "RRR": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Could not wipe the stupid grin off my face to whole way through. Somehow even better when you know what's coming. Perfect movie to kick of the season!",
      letterboxdUrl: "https://boxd.it/48I5Qt",
      date: "2023-04-18"
    },
  ],

  "Captain Fantastic": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "This is the first time I realized how much our first tour of the campsite mirrors the tour of the house at the end. Also the red suit is what he wore to the wedding. I know I'm becoming IMDb trivia, but I love all the little things you notice when you watch a movie over and over.",
      letterboxdUrl: "https://boxd.it/4fXzMp",
      date: "2023-05-16"
    },
  ],

  "Brick": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "No matter how many times I say, \"it's a noir set in highschool\" no one I show it to seems prepared for the fact that it's a noir, set in a highschool.",
      letterboxdUrl: "https://boxd.it/4ndOWJ",
      date: "2023-06-13"
    },
  ],

  "Herbie Fully Loaded": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "An incredible reinvention of the magic that is Herbie.\n\nAngela Robinson knocks it out of the park with a legacy sequel that acknowledges and harkens back to the history of the franchise, while still finding fun and interesting new story beats. This movie really follows the formula of The Love Bug, underdog story of someone low class taking on someone high class, with a love story, and a moment where the driver thinks that they're winning due to their own skills, and it all wraps up with the big race where they win it together. It's a great setup, and this movie knows enough to realize it's not better than it.\n\nBut then it just finds little ways to change it up. Casting Lindsay Lohan and making the story about her proving herself works so well; rather than the washed up racecar driver of Jim Douglas, Maggie Peyton is someone who never had the chance. And while we still have the moment where the driver chooses a cooler car over Herbie, he doesn't lose the race because he's drunk, he does it out of defiance and hurt feelings. \n\nThe set pieces are fun and the effects look good, even if the conceit of them can be a bit hokey. The cast rules; every single one of them is giving the exact right performance. It's just a movie firing on all cylinders (that's a car joke).\n\nAND THE SOUNDTRACK. The decision to give this movie a 70s soundtrack is pure genius. It's a nostalgic movie, carrying on the legacy of a series that ran from 68 to 80 (and then a brief blip in the 90s). And while the originals didn't utilize pop music, working it in here is so savvy.\n\nThis movie is delightful, and even if it's not high art, I think it's got a lot of merit.",
      letterboxdUrl: "https://boxd.it/4D79j9",
      date: "2023-08-01"
    },
  ],

  "The Killing": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Sam: \"I didn't know movies from the fifties could be funny.\"",
      letterboxdUrl: "https://boxd.it/4M5bH5",
      date: "2023-08-29"
    },
  ],

  "Get Out": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "It should not have taken me so long to rewatch this.",
      letterboxdUrl: "https://boxd.it/50Yhof",
      date: "2023-10-17"
    },
    {
      name: "Andrew A.",
      rating: 4.0,
      liked: true,
      text: "After it finished I initially thought I wasn't that impressed, and then I just thought about it for a moment longer and realized no, it's fantastic. One of the few horror movies that qualify as entertainment for me.",
      letterboxdUrl: "https://boxd.it/51amEB",
      date: "2023-10-18"
    },
  ],

  "The Thing": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "I love how much of the score in this movie is just the wind blowing.",
      letterboxdUrl: "https://boxd.it/55QJMN",
      date: "2023-10-31"
    },
  ],

  "Paths of Glory": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "I should watch more black and white movies on the projector. The cinematography in this movie is outstanding. I love the point at which we've seen this landscape at night for a while, and then the flare goes off and suddenly it's revealed that there are bodies all around. Breathtaking.",
      letterboxdUrl: "https://boxd.it/5aeokn",
      date: "2023-11-14"
    },
    {
      name: "Chriss K.",
      rating: 5.0,
      text: "\"he thinks i don't have enough respect for him-- he's right.\"\n\nit's so easy to forget that kubrick had a sick little sense of humor about him. you get all wrapped up in the sort of security blanket of a uniformly somber miserable tone and then BAM WHA-POW the man hits you with such an infectiously funny line or sight gag and you feel so genuinely bad for laughing??? peak audience manipulation. and reflective, in its way, of the fact that every exploited soldier ever (wow, so every soldier ever??) was like, a person! who laughed! he knew exactly what he was doing and it is FUCKED\n\nhi dylan :) thanks 4 having me :)",
      letterboxdUrl: "https://boxd.it/5afllT",
      date: "2023-11-14"
    },
    {
      name: "Andrew A.",
      rating: 4.0,
      liked: true,
      letterboxdUrl: "https://boxd.it/5oPX6F",
      date: "2023-11-14"
    },
    {
      name: "Nathan H.",
      rating: 3.5,
      liked: true,
      letterboxdUrl: "https://boxd.it/5afP9N",
      date: "2023-11-14"
    },
  ],

  "A Few Good Men": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "The moment where Cruise gets to break out a Nicholson impression is beautiful.",
      letterboxdUrl: "https://boxd.it/5eYccf",
      date: "2023-11-28"
    },
    {
      name: "Drew N.",
      rating: 5.0,
      liked: true,
      text: "The script and acting is through the roof. Wonderful.",
      letterboxdUrl: "https://boxd.it/5eW4ZT",
      date: "2023-11-28"
    },
  ],

  "Marriage Story": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "I think this is Baumbach's funniest movie since Kicking and Screaming. I also just love it. Every person who shows up, every performance they give, is incredible. Cannot wait for where he goes next. Truly my favorite filmmaker.",
      letterboxdUrl: "https://boxd.it/2Ne56j",
      date: "2022-04-27"
    },
  ],

  "The Shape of Water": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "To the tune of Julie Delphy in Before Sunset:\n<i>Honey, you are gonna fuck that fish</i>",
      letterboxdUrl: "https://boxd.it/2PHZrX",
      date: "2022-05-12"
    },
    {
      name: "Andrew A.",
      rating: 4.0,
      liked: true,
      letterboxdUrl: "https://boxd.it/2PGJe7",
      date: "2022-05-11"
    },
    {
      name: "Nathan H.",
      rating: 3.5,
      rewatch: true,
      liked: true,
      letterboxdUrl: "https://boxd.it/2PGJBv",
      date: "2022-05-11"
    },
  ],

  "Speed Racer": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "When Speed Racer came out, I was 10. My family rented it from Blockbuster because my dad grew up with the cartoon. I grew up watching NASCAR and loving movies like Herbie Fully Loaded and Cars. And this just felt like the natural progression of that; it was still a kids' movie, but there was a darker edge. The piranha scene rattled around in my head for years. \n\nTowards the end of my time in highschool and shortly after graduating, I got more into movies, and started semi-ironically revisiting my childhood movies with friends. Through that movies like The Iron Giant grew in stature, while Speed Racer came tumbling down. I remember starting it late at night with a bunch of friends, and being so taken aback by the visuals and tone, that we turned it off.\n\nA year or two after that, I programmed it in to a night of bad movies, which had become a summer tradition. We all gathered, seeing it on the big screen for the first time and laughed at how many of us ever thought it was good. The colors were too cartoon-y, the anime influence too uncool, and it seemed utterly unaware of its own silliness.\n\nFive years later (the present), while programming out months of movies, I decide to pay homage to the bad movie nights of years past and make July a month of \"overly ambitious sci-fi\", scheduling showings of Speed Racer and Valerian. So I sat down tonight expecting to relive the glory of the last time I watched this disaster of a movie.\n\nExcept this time, I earnestly loved it. \n\nEvery move made here, is made with such intention. Every performance calibrated perfectly. And the effects are beautiful. This is a movie about the earnest, idealist underdogs winning out against the cynical powers at be, and the Wachowskis made a movie just as earnest as the characters it contains.\n\nGo Speed Racer Go!",
      letterboxdUrl: "https://boxd.it/2ZSbnD",
      date: "2022-07-06"
    },
    {
      name: "Andrew A.",
      rating: 3.5,
      liked: true,
      letterboxdUrl: "https://boxd.it/324hnL",
      date: "2022-07-17"
    },
  ],

  "Ishtar": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Loved it when I watched it by myself, loved it when I watched it with a group. This movie is just a joy.",
      letterboxdUrl: "https://boxd.it/37qy5D",
      date: "2022-08-10"
    },
  ],

  "O Brother, Where Art Thou?": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Boy is this movie perfect. The Coens really are experts of pacing. The movie doesn't feel brisk by any means but it ebs and flows with brilliant little detours to where it's never fast paced nor slow.",
      letterboxdUrl: "https://boxd.it/3aeqhT",
      date: "2022-08-24"
    },
  ],

  "Once Upon a Time... in Hollywood": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Tarantino is so indulgent in this movie, but it totally works for me, and I'm into it. It just breezes by.",
      letterboxdUrl: "https://boxd.it/3pPAvl",
      date: "2022-11-09"
    },
  ],

  "Shattered Glass": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "It's perfectly solid. The performances are great all around. I'd like a little bit of character development for some of the others in the office, but I appreciate that we experience things via Steve. And I'm a sucker for any movie about journalism.",
      letterboxdUrl: "https://boxd.it/1RfMIP",
      date: "2021-05-12"
    },
    {
      name: "Andrew A.",
      rating: 3.0,
      liked: true,
      text: "Amazing acting performance from anny",
      letterboxdUrl: "https://boxd.it/1RfGGN",
      date: "2021-05-12"
    },
  ],

  "Nightcrawler": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "The James Newton Howard score is amazing. How are we not constantly talking about it?",
      letterboxdUrl: "https://boxd.it/1T6ZyX",
      date: "2021-05-26"
    },
    {
      name: "Andrew A.",
      rating: 4.0,
      liked: true,
      text: "Jake is a god",
      letterboxdUrl: "https://boxd.it/1T6Mk9",
      date: "2021-05-26"
    },
    {
      name: "Nathan H.",
      rewatch: true,
      liked: true,
      letterboxdUrl: "https://boxd.it/1T6M9l",
      date: "2021-05-26"
    },
  ],

  "Snowpiercer": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "A great one. Well directed, interesting moral philosophy, incredible casting, amazing lighting, etc. I genuinely don't know what to criticize. Tilda Swinton rocks.",
      letterboxdUrl: "https://boxd.it/1WLKmh",
      date: "2021-06-23"
    },
    {
      name: "Nathan H.",
      liked: true,
      letterboxdUrl: "https://boxd.it/1WLuX7",
      date: "2021-06-23"
    },
  ],

  "Me and Orson Welles": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Loved it the second time! This is always the watch that makes or breaks things, but watching in the barn on a hot summer night with a handful of close friends, it was just irresistible. The performances are great. The pacing is excellent. It's got so much charm.\n\nI'm genuinely bummed that the troubled release buried this movie so deep. I feel like if the right people would discover it, it could gain some legs. Richard Linklater directing Zach Efron! The people deserve to know!\n\nIn all seriousness though, this movie will never garner that kind of acclaim. It's a really good movie for sure, but I don't know that it's doing anything truly elevated. There are no big swings here. I still think it should be seen though. Quite possibly in my top half of Linklater films.",
      letterboxdUrl: "https://boxd.it/1ZJE7N",
      date: "2021-07-14"
    },
  ],

  "I Wanna Hold Your Hand": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Still in unequivocal love with this movie.",
      letterboxdUrl: "https://boxd.it/21PmpJ",
      date: "2021-07-28"
    },
    {
      name: "Andrew A.",
      rating: 4.0,
      liked: true,
      letterboxdUrl: "https://boxd.it/21OZYB",
      date: "2021-07-28"
    },
  ],

  "A Most Violent Year": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "I don’t think I have new thoughts on this one. It still looks beautiful, is plotted well, and has a stellar performance from Oscar Isaac. On the other hand, Jessica Chastain still has an underwritten and ill fitting role. And in the end I am still really high on this movie. I like how it tackles morality in a corrupt system. A solid watch for sure.",
      letterboxdUrl: "https://boxd.it/23SZyp",
      date: "2021-08-11"
    },
  ],

  "Allied": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Possibly the only movie that has a spoiler in the typeface.",
      letterboxdUrl: "https://boxd.it/25TnHt",
      date: "2021-08-25"
    },
    {
      name: "Nathan H.",
      liked: true,
      letterboxdUrl: "https://boxd.it/25TbQD",
      date: "2021-08-25"
    },
  ],

  "Parasite": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Still living in the afterglow of this winning Best Picture.",
      letterboxdUrl: "https://boxd.it/27TuVZ",
      date: "2021-09-08"
    },
  ],

  "Dead Pigs": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "Watching this with other people was a delight. Credits rolled, and we were just sitting there with stupid grins on our faces. Simply put, this movie rocks.",
      letterboxdUrl: "https://boxd.it/29K6vD",
      date: "2021-09-22"
    },
  ],

  "What We Do in the Shadows": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "I'm back in love with this movie baby! After my lackluster second watch, I was pretty down on this, but then I was programming my theme month for Movies in the Barn, and I wanted to do horror. I am not a horror guy, so I went horror comedy, and if I'm going to show The Lost Boys, this is such a natural follow-up. So I bit the bullet hoping it would play well in the room. And it absolutely did! This movie has so little horror and so many great laughs. It drags a little til the end, but luckily they knew to keep it a tight 85 minutes. It's fantastic flick.",
      letterboxdUrl: "https://boxd.it/2eYWnf",
      date: "2021-10-27"
    },
    {
      name: "Andrew A.",
      rating: 4.0,
      liked: true,
      letterboxdUrl: "https://boxd.it/2eYVCD",
      date: "2021-10-27"
    },
  ],

  "Arrival": [
    {
      name: "Dylan W.",
      rewatch: true,
      text: "\"You wanna make a baby?\" is my \"Fall collection. Ikea.",
      letterboxdUrl: "https://boxd.it/2jnOtP",
      date: "2021-11-24"
    },
    {
      name: "Nathan H.",
      rating: 4.5,
      liked: true,
      letterboxdUrl: "https://boxd.it/2jnX1P",
      date: "2021-11-24"
    },
  ],

  "Everybody Wants Some!!": [
    {
      name: "Andrew A.",
      rewatch: true,
      liked: true,
      letterboxdUrl: "https://boxd.it/34A7eh",
      date: "2022-06-22"
    },
    {
      name: "Nathan H.",
      rating: 3.5,
      rewatch: true,
      liked: true,
      letterboxdUrl: "https://boxd.it/2WsBU5",
      date: "2022-06-22"
    },
  ],

  "The Iron Giant": [
    {
      name: "Nathan H.",
      rating: 4.0,
      liked: true,
      letterboxdUrl: "https://boxd.it/2Sex9Z",
      date: "2022-05-25"
    },
  ],

  "The Road Warrior": [
    {
      name: "Nathan H.",
      liked: true,
      letterboxdUrl: "https://boxd.it/1V0Jqf",
      date: "2021-06-09"
    },
  ],

};
