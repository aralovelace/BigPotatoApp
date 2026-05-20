import { Schema, model, Document } from 'mongoose';

export interface ISoundEffect {
  id: string;
  label: string;
  url: string;
}

export interface IScoring {
  winCondition: string;
  maxScore?: number;
  method: string;
}

export interface IExpansion {
  id: string;
  name: string;
  content: string;
  rules?: string[];
  soundEffects?: ISoundEffect[];
}

export interface IGame extends Document {
  gameId: string;
  qrCode: string;
  name: string;
  description: string;
  playerCount: { min: number; max: number };
  rules: string[];
  timers: { min: number; max: number };
  soundEffects: ISoundEffect[];
  scoring: IScoring;
  expansions: IExpansion[];
}

const soundEffectSchema = new Schema<ISoundEffect>({
  id: { type: String, required: true },
  label: { type: String, required: true },
  url: { type: String, required: true },
});

const expansionSchema = new Schema<IExpansion>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  content: { type: String, required: true },
  rules: [{ type: String }],
  soundEffects: [soundEffectSchema],
});

const gameSchema = new Schema<IGame>(
  {
    gameId: { type: String, required: true, unique: true },
    qrCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    playerCount: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    rules: [{ type: String }],
    timers: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    soundEffects: [soundEffectSchema],
    scoring: {
      winCondition: { type: String, required: true },
      maxScore: { type: Number },
      method: { type: String, required: true },
    },
    expansions: [expansionSchema],
  },
  { timestamps: true }
);

export const Game = model<IGame>('Game', gameSchema);
