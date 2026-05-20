import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Game } from './models/Game';

dotenv.config();

const games = [
  {
    gameId: 'the-chameleon',
    qrCode: 'BP-QR-CHAM-001',
    version: 2,
    contentUpdatedAt: new Date('2024-09-01'),
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
        content: 'Adds 40 additional topic cards for extended variety and increased replayability across multiple play sessions.',
        rules: [
          'Shuffle the expansion topic cards into the existing deck or use them as a standalone set.',
          'All base game rules apply.',
        ],
        soundEffects: [
          { id: 'cham-exp1-sfx-newcard', label: 'New Topic Reveal', url: '/sfx/chameleon/expansion-1/new-topic.mp3' },
        ],
      },
    ],
  },
  {
    gameId: 'herd-mentality',
    qrCode: 'BP-QR-HERD-001',
    version: 3,
    contentUpdatedAt: new Date('2025-01-15'),
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
        content: '200 additional question cards to extend replayability.',
        rules: ['Shuffle booster cards into the main deck or use as a standalone set.'],
        soundEffects: [],
      },
      {
        id: 'herd-mentality-christmas',
        name: 'Christmas Edition',
        content: '100 festive-themed questions for holiday play.',
        rules: ['Replace the standard question deck with the Christmas deck.', 'All base game rules apply.'],
        soundEffects: [
          { id: 'herd-xmas-sfx-jingle', label: 'Jingle', url: '/sfx/herd-mentality/christmas/jingle.mp3' },
        ],
      },
      {
        id: 'herd-mentality-moosic',
        name: 'Moosic & Moovies',
        content: 'Music and movies themed question set for pop culture fans.',
        rules: ['Use the Moosic & Moovies deck in place of or alongside the standard deck.'],
        soundEffects: [
          { id: 'herd-moosic-sfx-fanfare', label: 'Fanfare', url: '/sfx/herd-mentality/moosic/fanfare.mp3' },
        ],
      },
    ],
  },
  {
    gameId: 'sounds-fishy',
    qrCode: 'BP-QR-FISH-001',
    version: 1,
    contentUpdatedAt: new Date('2024-03-10'),
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
        content: 'Additional question cards to refresh replayability once the original deck becomes familiar.',
        rules: ['Shuffle booster cards into the main deck or use as a standalone set.'],
        soundEffects: [],
      },
    ],
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to MongoDB');

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