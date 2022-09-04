import * as bcrypt from 'bcrypt';
interface SeedBook {
  name: string;
  description: string;
  obsevations: string;
  stock: number;
  status: boolean;
  price: number;
  slug: string;
  genres: string[];
}

interface SeedUser {
  email: string;
  username: string;
  password: string;
  fullname: string;
  roles: string[];
}

interface SeedData {
  users: SeedUser[];
  products: SeedBook[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'admin@admin.com',
      username: 'Admin',
      password: bcrypt.hashSync('123456aA', 10),
      fullname: 'Admin',
      roles: ['admin', 'user'],
    },
    {
      email: 'user@user.com',
      username: 'UserOne',
      password: bcrypt.hashSync('123456aA', 10),
      fullname: 'User One',
      roles: ['user'],
    },
    {
      email: 'userTwo@user.com',
      username: 'UserTwo',
      password: bcrypt.hashSync('123456aA', 10),
      fullname: 'User Two',
      roles: ['user'],
    },
    {
      email: 'userThree@user.com',
      username: 'UserThree',
      password: bcrypt.hashSync('123456aA', 10),
      fullname: 'User Three',
      roles: ['user'],
    },
  ],
  products: [
    {
      name: 'Lord of the Rings the Fellowship of the Ring',
      description:
        'The Dark Lord Sauron, who seeks the One Ring, which contains part of his soul, in order to return to power. The Ring has' +
        ' found its way to the young hobbit Frodo Baggins. The fate of Middle-earth hangs in the balance as Frodo and eight companions' +
        ' (who form the Fellowship of the Ring) begin their journey to Mount Doom in the land of Mordor, the only place where the Ring' +
        ' can be destroyed.',
      stock: 5,
      price: 35.9,
      status: true,
      slug: 'lord_of_the_rings_the_fellowship_of_the_ring',
      obsevations: 'Only 3 stock left in spanish',
      genres: ['Fantasy'],
    },
    {
      name: 'Lord of the rings Two towers',
      description:
        "Frodo and Sam continue their journey towards Mordor to destroy the One Ring, meeting and joined by Gollum, the ring's" +
        ' former keeper. Aragorn, Legolas, and Gimli come to the war-torn nation of Rohan and are reunited with the resurrected Gandalf,' +
        " before fighting against the legions of the treacherous wizard Saruman at the Battle of Helm's Deep. Merry and Pippin escape" +
        ' capture, meet Treebeard the Ent, and help to plan an attack on Isengard, fortress of Saruman.',
      stock: 3,
      price: 40.0,
      status: true,
      slug: 'lord_of_the_rings_two_towers',
      obsevations: '',
      genres: ['Fantasy'],
    },
    {
      name: 'Lord of the rings return of the kings',
      description:
        'Frodo, Sam and Gollum are making their final way toward Mount Doom in Mordor in order to destroy the One Ring, ' +
        "unaware of Gollum's true intentions, while Merry, Pippin, Gandalf, Aragorn, Legolas, Gimli and the rest are joining" +
        ' forces together against Sauron and his legions in Minas Tirith',
      stock: 10,
      price: 55.5,
      status: true,
      slug: 'lord_of_the_rings_return_of_the_kings',
      obsevations: '',
      genres: ['Fantasy'],
    },
    {
      name: 'The Raven',
      description:
        'The Raven is an internationally acclaimed narrative poem, first published in 1845. It follows an unnamed narrator, who at' +
        ' first sits reading, intent on forgetting the loss of his beloved Leonora. A knock on the door of his room reveals nothing,' +
        ' but incites the soul to light up. A similar tapping is heard, slightly louder, this time on the window. When the young man ' +
        ' goes to investigate, a raven enters his room. Paying no attention to the man, the raven perches on a bust of Pallas.',
      stock: 5,
      price: 22.5,
      status: true,
      slug: 'the_raven',
      obsevations: '',
      genres: ['Poem'],
    },
    {
      name: "Tom Sawyer's adventures",
      description:
        'Along the banks of the Mississippi, Tom Sawyer and his inseparable Huckleberry Finn make every day unforgettable. They play at being' +
        ' pirates, discover a hidden treasure and manage to win the game against the terrible Injun Joe. Although they sometimes get into trouble,' +
        ' the two friends show great courage and a heart of gold!',
      stock: 20,
      price: 13.5,
      status: true,
      slug: 'tom_sawyers_adventures',
      obsevations: '',
      genres: ['Narrative', 'Bildungsroman', 'picaresque'],
    },
    {
      name: 'For Whom the Bell Tolls',
      description:
        'For Whom the Bell Tolls, in English For Whom the Bell Tolls, is a novel published in 1940, whose author, Ernest Hemingway, participated in' +
        ' the Spanish Civil War as a correspondent, being able to see the events that took place during the war.',
      stock: 2,
      price: 55.5,
      status: true,
      slug: 'for_whom_the_bell_tolls',
      obsevations: 'Few units',
      genres: ['War novel'],
    },
    {
      name: 'Chronicle of a Death Foretold',
      description:
        'Chronicle of a Death Foretold is a novel by Colombian writer Gabriel García Márquez, first published in 1981. It was included in the list of ' +
        ' the 100 best novels in Spanish of the 20th century by the Spanish newspaper El Mundo.',
      stock: 0,
      price: 43.3,
      status: false,
      slug: 'chronicle_of_a_death_foretold',
      obsevations: '',
      genres: ['Narrative', 'Detective novel', 'Magical Realism'],
    },
  ],
};
