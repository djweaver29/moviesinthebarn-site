// ============================================================
// MOVIE META — Genre, Director & Cast (sourced from TMDB)
// ============================================================
// Keyed by film title (must match titles in events.js exactly).
// Merged into EVENTS at load time by each page's inline script.
// ============================================================

const MOVIE_META = {

  // ── 2026 ────────────────────────────────────────────────

  "Eephus": {
    genres: ["Comedy", "Drama"],
    director: "Carson Lund",
    cast: ["Keith William Richards", "Wayne Diamond", "Aje-Nai Bridges"],
    hasBluray: true
  },
  "Dazed and Confused": {
    genres: ["Comedy", "Drama"],
    director: "Richard Linklater",
    cast: ["Jason London", "Wiley Wiggins", "Matthew McConaughey"],
    hasBluray: true, has4K: true
  },
  "The Awful Truth": {
    genres: ["Comedy", "Romance"],
    director: "Leo McCarey",
    cast: ["Irene Dunne", "Cary Grant", "Ralph Bellamy"],
    hasBluray: true
  },
  "Before Midnight": {
    genres: ["Drama", "Romance"],
    director: "Richard Linklater",
    cast: ["Ethan Hawke", "Julie Delpy", "Seamus Davey-Fitzpatrick"],
    hasBluray: true
  },
  "Chronicle": {
    genres: ["Action", "Drama", "Sci-Fi"],
    director: "Josh Trank",
    cast: ["Dane DeHaan", "Alex Russell", "Michael B. Jordan"],
    hasBluray: true, hasDVD: true
  },
  "Sky High": {
    genres: ["Action", "Adventure", "Comedy"],
    director: "Mike Mitchell",
    cast: ["Michael Angarano", "Kurt Russell", "Kelly Preston"],
    hasBluray: true
  },
  "Robin Hood": {
    genres: ["Animation", "Adventure", "Comedy"],
    director: "Wolfgang Reitherman",
    cast: ["Brian Bedford", "Phil Harris", "Roger Miller"],
    hasBluray: true, hasDVD: true
  },
  "The Princess Bride": {
    genres: ["Adventure", "Family", "Fantasy"],
    director: "Rob Reiner",
    cast: ["Cary Elwes", "Mandy Patinkin", "Robin Wright"],
    hasBluray: true, has4K: true
  },
  "Mission: Impossible - Ghost Protocol": {
    genres: ["Action", "Adventure", "Thriller"],
    director: "Brad Bird",
    cast: ["Tom Cruise", "Jeremy Renner", "Simon Pegg"],
    hasBluray: true
  },
  "RED": {
    genres: ["Action", "Comedy", "Thriller"],
    director: "Robert Schwentke",
    cast: ["Bruce Willis", "Morgan Freeman", "John Malkovich"],
    hasBluray: true
  },
  "Seven Brides for Seven Brothers": {
    genres: ["Musical", "Romance"],
    director: "Stanley Donen",
    cast: ["Howard Keel", "Jane Powell", "Jeff Richards"],
    hasBluray: true
  },
  "Annie Get Your Gun": {
    genres: ["Musical", "Romance", "Western"],
    director: "George Sidney",
    cast: ["Betty Hutton", "Howard Keel", "Louis Calhern"],
    hasBluray: true
  },
  "Exam": {
    genres: ["Mystery", "Thriller"],
    director: "Stuart Hazeldine",
    cast: ["Adar Beck", "Gemma Chan", "Nathalie Cox"],
    hasBluray: true
  },
  "Gattaca": {
    genres: ["Drama", "Sci-Fi", "Thriller"],
    director: "Andrew Niccol",
    cast: ["Ethan Hawke", "Uma Thurman", "Jude Law"],
    hasBluray: true, has4K: true
  },
  "BlackBerry": {
    genres: ["Comedy", "Drama"],
    director: "Matt Johnson",
    cast: ["Jay Baruchel", "Glenn Howerton", "Matt Johnson"]
  },
  "Steve Jobs": {
    genres: ["Biography", "Drama"],
    director: "Danny Boyle",
    cast: ["Michael Fassbender", "Kate Winslet", "Seth Rogen"],
    hasBluray: true
  },

  // ── 2025 ────────────────────────────────────────────────

  "The Taste of Things": {
    genres: ["Drama", "Romance"],
    director: "Tran Anh Hung",
    cast: ["Juliette Binoche", "Benoit Magimel", "Emmanuel Salinger"]
  },
  "Babette's Feast": {
    genres: ["Drama"],
    director: "Gabriel Axel",
    cast: ["Stephane Audran", "Bodil Kjer", "Birgitte Federspiel"],
    hasBluray: true
  },
  "An Affair to Remember": {
    genres: ["Drama", "Romance"],
    director: "Leo McCarey",
    cast: ["Cary Grant", "Deborah Kerr", "Richard Denning"]
  },
  "Before Sunset": {
    genres: ["Drama", "Romance"],
    director: "Richard Linklater",
    cast: ["Ethan Hawke", "Julie Delpy"],
    hasBluray: true
  },
  "Godzilla": {
    genres: ["Horror", "Sci-Fi"],
    director: "Ishiro Honda",
    cast: ["Takashi Shimura", "Akihiko Hirata", "Akira Takarada"],
    hasBluray: true, has4K: true
  },
  "Godzilla Minus One": {
    genres: ["Action", "Drama", "Sci-Fi"],
    director: "Takashi Yamazaki",
    cast: ["Ryunosuke Kamiki", "Minami Hamabe", "Yuki Yamada"],
    has4K: true
  },
  "Lilo & Stitch": {
    genres: ["Animation", "Adventure", "Comedy"],
    director: "Chris Sanders, Dean DeBlois",
    cast: ["Daveigh Chase", "Chris Sanders", "Tia Carrere"]
  },
  "Treasure Planet": {
    genres: ["Animation", "Adventure", "Family"],
    director: "Ron Clements, John Musker",
    cast: ["Joseph Gordon-Levitt", "Brian Murray", "Emma Thompson"]
  },
  "Sing Street": {
    genres: ["Comedy", "Drama", "Music"],
    director: "John Carney",
    cast: ["Ferdia Walsh-Peelo", "Lucy Boynton", "Jack Reynor"]
  },
  "Moonrise Kingdom": {
    genres: ["Comedy", "Drama", "Romance"],
    director: "Wes Anderson",
    cast: ["Jared Gilman", "Kara Hayward", "Bruce Willis"],
    hasBluray: true
  },
  "The Florida Project": {
    genres: ["Drama"],
    director: "Sean Baker",
    cast: ["Brooklynn Prince", "Bria Vinaite", "Willem Dafoe"]
  },
  "Daddy Longlegs": {
    genres: ["Comedy", "Drama"],
    director: "Benny Safdie, Josh Safdie",
    cast: ["Ronald Bronstein", "Sage Ranaldo", "Frey Ranaldo"],
    hasBluray: true
  },
  "Phantom of the Paradise": {
    genres: ["Comedy", "Horror", "Music"],
    director: "Brian De Palma",
    cast: ["William Finley", "Paul Williams", "Jessica Harper"]
  },
  "Little Shop of Horrors": {
    genres: ["Comedy", "Horror", "Musical"],
    director: "Frank Oz",
    cast: ["Rick Moranis", "Ellen Greene", "Steve Martin"]
  },
  "Patty Hearst": {
    genres: ["Biography", "Crime", "Drama"],
    director: "Paul Schrader",
    cast: ["Natasha Richardson", "William Forsythe", "Ving Rhames"]
  },
  "Inside Man": {
    genres: ["Crime", "Drama", "Thriller"],
    director: "Spike Lee",
    cast: ["Denzel Washington", "Clive Owen", "Jodie Foster"]
  },

  // ── 2024 ────────────────────────────────────────────────

  "Anatomy of a Fall": {
    genres: ["Crime", "Drama", "Thriller"],
    director: "Justine Triet",
    cast: ["Sandra Huller", "Swann Arlaud", "Milo Machado-Graner"],
    hasBluray: true
  },
  "The Last Duel": {
    genres: ["Action", "Drama", "History"],
    director: "Ridley Scott",
    cast: ["Matt Damon", "Adam Driver", "Jodie Comer"],
    hasBluray: true
  },
  "Love Affair": {
    genres: ["Drama", "Romance"],
    director: "Leo McCarey",
    cast: ["Irene Dunne", "Charles Boyer", "Maria Ouspenskaya"],
    hasBluray: true
  },
  "Before Sunrise": {
    genres: ["Drama", "Romance"],
    director: "Richard Linklater",
    cast: ["Ethan Hawke", "Julie Delpy"],
    hasBluray: true
  },
  "Whip It": {
    genres: ["Comedy", "Drama", "Sport"],
    director: "Drew Barrymore",
    cast: ["Ellen Page", "Marcia Gay Harden", "Drew Barrymore"],
    hasBluray: true
  },
  "Lady Bird": {
    genres: ["Comedy", "Drama"],
    director: "Greta Gerwig",
    cast: ["Saoirse Ronan", "Laurie Metcalf", "Tracy Letts"],
    hasBluray: true, hasDVD: true
  },
  "Fantastic Mr. Fox": {
    genres: ["Animation", "Adventure", "Comedy"],
    director: "Wes Anderson",
    cast: ["George Clooney", "Meryl Streep", "Jason Schwartzman"],
    hasBluray: true
  },
  "Chicken Run": {
    genres: ["Animation", "Adventure", "Comedy"],
    director: "Peter Lord, Nick Park",
    cast: ["Mel Gibson", "Julia Sawalha", "Miranda Richardson"],
    hasBluray: true
  },
  "Guardians of the Galaxy": {
    genres: ["Action", "Adventure", "Comedy"],
    director: "James Gunn",
    cast: ["Chris Pratt", "Vin Diesel", "Bradley Cooper"],
    hasBluray: true
  },
  "Dungeons & Dragons: Honor Among Thieves": {
    genres: ["Action", "Adventure", "Comedy"],
    director: "Jonathan Goldstein, John Francis Daley",
    cast: ["Chris Pine", "Michelle Rodriguez", "Rege-Jean Page"],
    hasBluray: true
  },
  "Elvis": {
    genres: ["Biography", "Drama", "Music"],
    director: "Baz Luhrmann",
    cast: ["Austin Butler", "Tom Hanks", "Olivia DeJonge"],
    hasBluray: true, hasDVD: true
  },
  "Priscilla": {
    genres: ["Biography", "Drama"],
    director: "Sofia Coppola",
    cast: ["Cailee Spaeny", "Jacob Elordi", "Ari Cohen"],
    hasBluray: true, hasDVD: true
  },
  "The Witches of Eastwick": {
    genres: ["Comedy", "Fantasy", "Horror"],
    director: "George Miller",
    cast: ["Jack Nicholson", "Cher", "Susan Sarandon"],
    hasBluray: true
  },
  "Death Becomes Her": {
    genres: ["Comedy", "Fantasy"],
    director: "Robert Zemeckis",
    cast: ["Meryl Streep", "Bruce Willis", "Goldie Hawn"],
    hasBluray: true
  },
  "Digging for Fire": {
    genres: ["Comedy", "Drama"],
    director: "Joe Swanberg",
    cast: ["Jake Johnson", "Rosemarie DeWitt", "Sam Rockwell"],
    hasDVD: true
  },
  "While We're Young": {
    genres: ["Comedy", "Drama"],
    director: "Noah Baumbach",
    cast: ["Ben Stiller", "Naomi Watts", "Adam Driver"],
    hasBluray: true
  },

  // ── 2023 ────────────────────────────────────────────────

  "RRR": {
    genres: ["Action", "Drama"],
    director: "S. S. Rajamouli",
    cast: ["N.T. Rama Rao Jr.", "Ram Charan", "Ajay Devgn"]
  },
  "The Grand Budapest Hotel": {
    genres: ["Adventure", "Comedy", "Crime"],
    director: "Wes Anderson",
    cast: ["Ralph Fiennes", "F. Murray Abraham", "Tony Revolori"]
  },
  "Captain Fantastic": {
    genres: ["Comedy", "Drama"],
    director: "Matt Ross",
    cast: ["Viggo Mortensen", "George MacKay", "Samantha Isler"]
  },
  "Gifted": {
    genres: ["Drama"],
    director: "Marc Webb",
    cast: ["Chris Evans", "Mckenna Grace", "Lindsay Duncan"]
  },
  "Brick": {
    genres: ["Crime", "Drama", "Mystery"],
    director: "Rian Johnson",
    cast: ["Joseph Gordon-Levitt", "Nora Zehetner", "Lukas Haas"]
  },
  "Donnie Darko": {
    genres: ["Drama", "Mystery", "Sci-Fi"],
    director: "Richard Kelly",
    cast: ["Jake Gyllenhaal", "Jena Malone", "Mary McDonnell"]
  },
  "The Love Bug": {
    genres: ["Comedy", "Family", "Fantasy"],
    director: "Robert Stevenson",
    cast: ["Dean Jones", "Michele Lee", "David Tomlinson"]
  },
  "Herbie Fully Loaded": {
    genres: ["Comedy", "Family", "Sport"],
    director: "Angela Robinson",
    cast: ["Lindsay Lohan", "Michael Keaton", "Matt Dillon"]
  },
  "Logan Lucky": {
    genres: ["Comedy", "Crime", "Drama"],
    director: "Steven Soderbergh",
    cast: ["Channing Tatum", "Adam Driver", "Daniel Craig"]
  },
  "The Killing": {
    genres: ["Crime", "Drama", "Film-Noir"],
    director: "Stanley Kubrick",
    cast: ["Sterling Hayden", "Coleen Gray", "Vince Edwards"]
  },
  "Cha Cha Real Smooth": {
    genres: ["Comedy", "Drama", "Romance"],
    director: "Cooper Raiff",
    cast: ["Cooper Raiff", "Dakota Johnson", "Vanessa Burghardt"]
  },
  "Tully": {
    genres: ["Comedy", "Drama"],
    director: "Jason Reitman",
    cast: ["Charlize Theron", "Mackenzie Davis", "Ron Livingston"]
  },
  "Get Out": {
    genres: ["Horror", "Mystery", "Thriller"],
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"]
  },
  "The Thing": {
    genres: ["Horror", "Mystery", "Sci-Fi"],
    director: "John Carpenter",
    cast: ["Kurt Russell", "Wilford Brimley", "Keith David"]
  },
  "Paths of Glory": {
    genres: ["Drama", "War"],
    director: "Stanley Kubrick",
    cast: ["Kirk Douglas", "Ralph Meeker", "Adolphe Menjou"]
  },
  "A Few Good Men": {
    genres: ["Drama", "Thriller"],
    director: "Rob Reiner",
    cast: ["Tom Cruise", "Jack Nicholson", "Demi Moore"]
  },

  // ── 2022 ────────────────────────────────────────────────

  "Annette": {
    genres: ["Drama", "Musical"],
    director: "Leos Carax",
    cast: ["Adam Driver", "Marion Cotillard", "Simon Helberg"]
  },
  "Marriage Story": {
    genres: ["Comedy", "Drama", "Romance"],
    director: "Noah Baumbach",
    cast: ["Adam Driver", "Scarlett Johansson", "Laura Dern"]
  },
  "The Shape of Water": {
    genres: ["Adventure", "Drama", "Fantasy"],
    director: "Guillermo del Toro",
    cast: ["Sally Hawkins", "Michael Shannon", "Octavia Spencer"]
  },
  "The Iron Giant": {
    genres: ["Animation", "Action", "Adventure"],
    director: "Brad Bird",
    cast: ["Eli Marienthal", "Vin Diesel", "Jennifer Aniston"]
  },
  "Scott Pilgrim vs. the World": {
    genres: ["Action", "Comedy", "Romance"],
    director: "Edgar Wright",
    cast: ["Michael Cera", "Mary Elizabeth Winstead", "Kieran Culkin"]
  },
  "Everybody Wants Some!!": {
    genres: ["Comedy"],
    director: "Richard Linklater",
    cast: ["Blake Jenner", "Tyler Hoechlin", "Ryan Guzman"]
  },
  "Speed Racer": {
    genres: ["Action", "Adventure", "Family"],
    director: "Lana Wachowski, Lilly Wachowski",
    cast: ["Emile Hirsch", "Christina Ricci", "John Goodman"]
  },
  "Valerian and the City of a Thousand Planets": {
    genres: ["Action", "Adventure", "Fantasy"],
    director: "Luc Besson",
    cast: ["Dane DeHaan", "Cara Delevingne", "Clive Owen"]
  },
  "Ishtar": {
    genres: ["Adventure", "Comedy"],
    director: "Elaine May",
    cast: ["Warren Beatty", "Dustin Hoffman", "Isabelle Adjani"]
  },
  "O Brother, Where Art Thou?": {
    genres: ["Adventure", "Comedy", "Crime"],
    director: "Joel Coen, Ethan Coen",
    cast: ["George Clooney", "John Turturro", "Tim Blake Nelson"]
  },
  "Little Women": {
    genres: ["Drama", "Romance"],
    director: "Greta Gerwig",
    cast: ["Saoirse Ronan", "Emma Watson", "Florence Pugh"]
  },
  "The Beguiled": {
    genres: ["Drama", "Thriller", "War"],
    director: "Sofia Coppola",
    cast: ["Nicole Kidman", "Colin Farrell", "Kirsten Dunst"]
  },
  "The Rider": {
    genres: ["Drama", "Western"],
    director: "Chloe Zhao",
    cast: ["Brady Jandreau", "Tim Jandreau", "Lilly Jandreau"]
  },
  "Nadia, Butterfly": {
    genres: ["Drama"],
    director: "Pascal Plante",
    cast: ["Katerine Savard", "Ariane Mainville", "Hilary Caldwell"]
  },
  "Once Upon a Time... in Hollywood": {
    genres: ["Comedy", "Drama"],
    director: "Quentin Tarantino",
    cast: ["Leonardo DiCaprio", "Brad Pitt", "Margot Robbie"]
  },
  "Inherent Vice": {
    genres: ["Comedy", "Crime", "Drama"],
    director: "Paul Thomas Anderson",
    cast: ["Joaquin Phoenix", "Josh Brolin", "Owen Wilson"]
  },

  // ── 2021 ────────────────────────────────────────────────

  "Shattered Glass": {
    genres: ["Biography", "Drama"],
    director: "Billy Ray",
    cast: ["Hayden Christensen", "Peter Sarsgaard", "Chloe Sevigny"]
  },
  "Nightcrawler": {
    genres: ["Crime", "Drama", "Thriller"],
    director: "Dan Gilroy",
    cast: ["Jake Gyllenhaal", "Rene Russo", "Bill Paxton"]
  },
  "The Road Warrior": {
    genres: ["Action", "Adventure", "Sci-Fi"],
    director: "George Miller",
    cast: ["Mel Gibson", "Bruce Spence", "Michael Preston"]
  },
  "Snowpiercer": {
    genres: ["Action", "Drama", "Sci-Fi"],
    director: "Bong Joon-ho",
    cast: ["Chris Evans", "Song Kang-ho", "Tilda Swinton"]
  },
  "Me and Orson Welles": {
    genres: ["Comedy", "Drama"],
    director: "Richard Linklater",
    cast: ["Zac Efron", "Christian McKay", "Claire Danes"]
  },
  "I Wanna Hold Your Hand": {
    genres: ["Comedy"],
    director: "Robert Zemeckis",
    cast: ["Nancy Allen", "Bobby Di Cicco", "Marc McClure"]
  },
  "A Most Violent Year": {
    genres: ["Crime", "Drama", "Thriller"],
    director: "J.C. Chandor",
    cast: ["Oscar Isaac", "Jessica Chastain", "David Oyelowo"]
  },
  "Allied": {
    genres: ["Action", "Drama", "Romance"],
    director: "Robert Zemeckis",
    cast: ["Brad Pitt", "Marion Cotillard", "Jared Harris"]
  },
  "Parasite": {
    genres: ["Comedy", "Drama", "Thriller"],
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"]
  },
  "Dead Pigs": {
    genres: ["Comedy", "Drama"],
    director: "Cathy Yan",
    cast: ["Zazie Beetz", "Yang Hao", "Li Meng"]
  },
  "The Lost Boys": {
    genres: ["Comedy", "Horror"],
    director: "Joel Schumacher",
    cast: ["Jason Patric", "Corey Haim", "Kiefer Sutherland"]
  },
  "What We Do in the Shadows": {
    genres: ["Comedy", "Horror"],
    director: "Taika Waititi, Jemaine Clement",
    cast: ["Taika Waititi", "Jemaine Clement", "Jonathan Brugh"]
  },
  "Contact": {
    genres: ["Drama", "Mystery", "Sci-Fi"],
    director: "Robert Zemeckis",
    cast: ["Jodie Foster", "Matthew McConaughey", "James Woods"]
  },
  "Arrival": {
    genres: ["Drama", "Mystery", "Sci-Fi"],
    director: "Denis Villeneuve",
    cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker"]
  },
};
