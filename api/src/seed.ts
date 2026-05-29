import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Game } from './models/Game';

dotenv.config();

const games = [
  {
    gameId: 'the-chameleon',
    qrCodes: [
      'BP-QR-CHAM-001',
      'youtu.be/ChameleonGameVideo',
      'https://youtu.be/ChameleonGameVideo',
      'https://www.youtube.com/watch?v=ChameleonGameVideo',
      'bigpotato.tv/the-chameleon',
      'https://bigpotato.tv/the-chameleon',
      'https://bit.ly/bpChameleon',
      'https://tinyurl.com/big-potato-chameleon',
      'https://www.instagram.com/p/ChameleonBigPotato',
      'https://www.facebook.com/BigPotatoGames/videos/chameleon-how-to-play',
    ],
    name: 'The Chameleon',
    description:
      'A social bluffing game where one player is secretly the Chameleon. Everyone else knows the topic — can you blend in without getting caught?',
    playerCount: { min: 3, max: 8 },
    rules: [
      'One player is secretly assigned as the Chameleon using code cards and dice — no one else knows who it is.',
      'All other players learn the secret topic word via their code cards.',
      'Going around the table, each player (including the Chameleon) says one word related to the topic.',
      'Players discuss and vote on who they think the Chameleon is.',
      'If caught, the Chameleon gets one final chance to guess the secret word to avoid losing.',
      'Score points for successfully identifying the Chameleon or, as the Chameleon, for evading detection.',
    ],
    timers: { min: 15, max: 20 },
    soundEffects: [
      { id: 'cham-sfx-reveal', label: 'Chameleon Reveal', url: '/sfx/chameleon/reveal.mp3' },
      { id: 'cham-sfx-vote', label: 'Voting Start', url: '/sfx/chameleon/vote-start.mp3' },
      { id: 'cham-sfx-caught', label: 'Chameleon Caught', url: '/sfx/chameleon/caught.mp3' },
      { id: 'cham-sfx-escaped', label: 'Chameleon Escaped', url: '/sfx/chameleon/escaped.mp3' },
    ],
    scoring: {
      winCondition: 'First player or the Chameleon to reach 5 points wins.',
      maxScore: 5,
      method: 'points',
    },
    expansions: [
      {
        id: 'chameleon-expansion-1',
        name: 'The Chameleon Expansion',
        price: 9.99,
        content: 'Adds 40 additional topic cards for extended variety and increased replayability across multiple play sessions.',
        rules: [
          'Shuffle the expansion topic cards into the existing deck or use them as a standalone set.',
          'All base game rules apply.',
        ],
        soundEffects: [
          { id: 'cham-exp1-sfx-newcard', label: 'New Topic Reveal', url: '/sfx/chameleon/expansion-1/new-topic.mp3' },
        ],
      },
      {
        id: 'chameleon-double-bluff',
        name: 'Double Bluff',
        price: 12.99,
        content: 'A twist on the base game where two players are secretly assigned as the Chameleon, forcing the group to find both before they can win.',
        rules: [
          'Deal two Chameleon cards instead of one at the start of each round.',
          'Both Chameleons know each other but must still act independently.',
          'The group must correctly identify both Chameleons to win the round.',
          'If only one Chameleon is caught, the other scores a point and escapes.',
          'All other base game rules apply.',
        ],
        soundEffects: [
          { id: 'cham-dbluff-sfx-reveal', label: 'Double Reveal', url: '/sfx/chameleon/double-bluff/reveal.mp3' },
          { id: 'cham-dbluff-sfx-escape', label: 'One Escaped', url: '/sfx/chameleon/double-bluff/escape.mp3' },
        ],
      },
      {
        id: 'chameleon-speed-round',
        name: 'Speed Round',
        price: 9.99,
        content: 'A fast-paced variant where players have a strict time limit to give their clue word. No thinking, no hesitating.',
        rules: [
          'Set a timer for 5 seconds per player.',
          'Each player must say their word before their timer runs out or they are eliminated from voting.',
          'If the Chameleon runs out of time they are automatically caught.',
          'All other base game rules apply.',
        ],
        soundEffects: [
          { id: 'cham-speed-sfx-tick', label: 'Countdown Tick', url: '/sfx/chameleon/speed-round/tick.mp3' },
          { id: 'cham-speed-sfx-buzz', label: 'Time Up', url: '/sfx/chameleon/speed-round/buzz.mp3' },
        ],
      },
    ],
  },
  {
    gameId: 'herd-mentality',
    qrCodes: [
      'BP-QR-HERD-001',
      'youtu.be/HerdMentalityVideo',
      'https://youtu.be/HerdMentalityVideo',
      'https://www.youtube.com/watch?v=HerdMentalityVideo',
      'bigpotato.tv/herd-mentality',
      'https://bigpotato.tv/herd-mentality',
      'https://bit.ly/bpHerdMentality',
      'https://tinyurl.com/big-potato-herd',
      'https://www.instagram.com/p/HerdMentalityBigPotato',
      'https://www.tiktok.com/@bigpotatogames/video/herd-mentality-howtoplay',
    ],
    name: 'Herd Mentality',
    description:
      'Think like the herd! Write the same answer as everyone else to win cow tokens — but be the odd one out and you get stuck with the dreaded Pink Cow.',
    playerCount: { min: 4, max: 20 },
    rules: [
      'One player reads a question aloud to the group.',
      'Everyone secretly writes their answer simultaneously.',
      'All answers are revealed at the same time.',
      'Players whose answer matches the majority win a cow token each.',
      'The sole player with the unique odd-one-out answer receives the Pink Cow penalty piece.',
      'While holding the Pink Cow you cannot win — until another player takes it from you.',
      'First player to collect 8 cow tokens wins.',
    ],
    timers: { min: 20, max: 30 },
    soundEffects: [
      { id: 'herd-sfx-reveal', label: 'Answer Reveal', url: '/sfx/herd-mentality/reveal.mp3' },
      { id: 'herd-sfx-pinkcow', label: 'Pink Cow Penalty', url: '/sfx/herd-mentality/pink-cow.mp3' },
      { id: 'herd-sfx-token', label: 'Token Collected', url: '/sfx/herd-mentality/token.mp3' },
      { id: 'herd-sfx-win', label: 'Winner', url: '/sfx/herd-mentality/winner.mp3' },
    ],
    scoring: {
      winCondition: 'First player to collect 8 cow tokens wins.',
      maxScore: 8,
      method: 'tokens',
    },
    expansions: [
      {
        id: 'herd-mentality-booster',
        name: 'Booster Pack',
        price: 9.99,
        content: '200 additional question cards to extend replayability.',
        rules: ['Shuffle booster cards into the main deck or use as a standalone set.'],
        soundEffects: [],
      },
      {
        id: 'herd-mentality-christmas',
        name: 'Christmas Edition',
        price: 12.99,
        content: '100 festive-themed questions for holiday play.',
        rules: ['Replace the standard question deck with the Christmas deck.', 'All base game rules apply.'],
        soundEffects: [
          { id: 'herd-xmas-sfx-jingle', label: 'Jingle', url: '/sfx/herd-mentality/christmas/jingle.mp3' },
        ],
      },
      {
        id: 'herd-mentality-moosic',
        name: 'Moosic & Moovies',
        price: 12.99,
        content: 'Music and movies themed question set for pop culture fans.',
        rules: ['Use the Moosic & Moovies deck in place of or alongside the standard deck.'],
        soundEffects: [
          { id: 'herd-moosic-sfx-fanfare', label: 'Fanfare', url: '/sfx/herd-mentality/moosic/fanfare.mp3' },
        ],
      },
      {
        id: 'herd-mentality-big-herd',
        name: 'Big Herd Edition',
        price: 14.99,
        content: 'Designed for large groups of up to 30 players. Includes oversized answer boards and team scoring rules for parties and events.',
        rules: [
          'Split players into teams of up to 5 if the group exceeds 20 players.',
          'Teams discuss and agree on a single answer before writing.',
          'Majority scoring applies at team level — the team with the most matching answers wins the round.',
          'First team to collect 8 cow tokens wins.',
        ],
        soundEffects: [
          { id: 'herd-bigherd-sfx-crowd', label: 'Crowd Cheer', url: '/sfx/herd-mentality/big-herd/crowd.mp3' },
          { id: 'herd-bigherd-sfx-horn', label: 'Air Horn', url: '/sfx/herd-mentality/big-herd/horn.mp3' },
        ],
      },
      {
        id: 'herd-mentality-kids',
        name: 'Junior Herd',
        price: 12.99,
        content: 'A kid-friendly version with age-appropriate questions suitable for players aged 6 and up. Great for family game night.',
        rules: [
          'Use the Junior Herd question deck only.',
          'Adults may give one hint per round if a child is stuck.',
          'All other base game rules apply.',
        ],
        soundEffects: [
          { id: 'herd-kids-sfx-moo', label: 'Moo', url: '/sfx/herd-mentality/junior/moo.mp3' },
        ],
      },
    ],
  },
  {
    gameId: 'sounds-fishy',
    qrCodes: [
      'BP-QR-FISH-001',
      'instagram.com/p/SoundsFishyPost',
      'https://www.instagram.com/p/SoundsFishyPost',
      'https://youtu.be/SoundsFishyVideo',
      'https://www.youtube.com/watch?v=SoundsFishyVideo',
      'bigpotato.tv/sounds-fishy',
      'https://bigpotato.tv/sounds-fishy',
      'https://bit.ly/bpSoundsFishy',
      'https://tinyurl.com/big-potato-sounds-fishy',
      'https://www.tiktok.com/@bigpotatogames/video/sounds-fishy-howtoplay',
    ],
    name: 'Sounds Fishy',
    description:
      'One real answer. A sea of red herrings. Can you spot the truth among the lies — or fool everyone with your bluff?',
    playerCount: { min: 4, max: 10 },
    rules: [
      'One player takes the blue fish and reads the question card — they have the real answer.',
      'All other players take a red fish and must invent a convincing fake answer.',
      'The blue fish player reads all answers aloud in random order, including the real one.',
      'Players vote on which answer they believe is true.',
      'Earn points for correctly identifying the real answer or for fooling others with your fake one.',
      'No trivia knowledge needed — deception and persuasion win the game.',
    ],
    timers: { min: 15, max: 15 },
    soundEffects: [
      { id: 'fish-sfx-question', label: 'Question Drawn', url: '/sfx/sounds-fishy/question.mp3' },
      { id: 'fish-sfx-vote', label: 'Voting Start', url: '/sfx/sounds-fishy/vote-start.mp3' },
      { id: 'fish-sfx-fooled', label: 'You Got Fooled', url: '/sfx/sounds-fishy/fooled.mp3' },
      { id: 'fish-sfx-correct', label: 'Correct Answer', url: '/sfx/sounds-fishy/correct.mp3' },
    ],
    scoring: {
      winCondition: 'Player with the most points after all question cards are used wins.',
      method: 'points',
    },
    expansions: [
      {
        id: 'sounds-fishy-booster',
        name: 'Sounds Fishy Booster Pack',
        price: 9.99,
        content: 'Additional question cards to refresh replayability once the original deck becomes familiar.',
        rules: ['Shuffle booster cards into the main deck or use as a standalone set.'],
        soundEffects: [],
      },
      {
        id: 'sounds-fishy-science',
        name: 'Science Edition',
        price: 12.99,
        content: 'All questions are science and nature themed. Perfect for curious minds and pub quiz fans who want a tougher challenge.',
        rules: [
          'Use the Science Edition question deck in place of the standard deck.',
          'The blue fish player may give one additional clue if no player votes correctly after the first round.',
          'All other base game rules apply.',
        ],
        soundEffects: [
          { id: 'fish-sci-sfx-beaker', label: 'Lab Bubbles', url: '/sfx/sounds-fishy/science/beaker.mp3' },
          { id: 'fish-sci-sfx-correct', label: 'Correct Buzz', url: '/sfx/sounds-fishy/science/correct.mp3' },
        ],
      },
      {
        id: 'sounds-fishy-kids',
        name: 'Junior Fishy',
        price: 12.99,
        content: 'A simpler question set written for younger players aged 7 and up, with picture-based answer boards included.',
        rules: [
          'Use the Junior Fishy question deck only.',
          'Players may draw their answer instead of writing it.',
          'All other base game rules apply.',
        ],
        soundEffects: [
          { id: 'fish-kids-sfx-splash', label: 'Splash', url: '/sfx/sounds-fishy/junior/splash.mp3' },
        ],
      },
    ],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to MongoDB');

  await Game.collection.dropIndex('qrCode_1').catch(() => {});
  await Game.deleteMany({});
  console.log('Cleared existing games');

  await Game.insertMany(games);
  console.log(`Seeded ${games.length} games`);

  await mongoose.disconnect();
  console.log('Done');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});