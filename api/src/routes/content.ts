import { Router, Request, Response } from "express";
import { Game } from "../models/Game";

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  const games = await Game.find({}, 'gameId name description playerCount expansions -_id').lean();
  res.json(games.map(g => ({
    gameId: g.gameId,
    name: g.name,
    description: g.description,
    playerCount: g.playerCount,
    expansionCount: g.expansions.length,
  })));
});

router.get('/scan', async (req: Request, res: Response) => {
  const code = req.query.code as string | undefined;
  if (!code) {
    res.status(400).json({ error: 'code is required' });
    return;
  }

  // Normalise: strip protocol so https://youtu.be/X matches alias youtu.be/X
  const normalised = code.replace(/^https?:\/\//, '');
  const game = await Game.findOne({ qrCodes: { $in: [code, normalised] } }, 'gameId -_id').lean();

  if (!game) {
    res.status(404).json({ error: 'Game not found' });
    return;
  }

  res.json({ gameId: game.gameId });
});

router.get('/:gameId', async (req: Request, res: Response) => {

    const { gameId } = req.params;

    const game = await Game.findOne({ gameId }).lean();

    if (!game) {
       res.status(404).json({ error: `No game found for ID: ${gameId}` });
       return;
    }

    res.json({
        gameId: game.gameId,
        name: game.name,
        description: game.description,
        playerCount: game.playerCount,
        rules: game.rules,
        timers: game.timers,
        soundEffects: game.soundEffects,
        scoring: game.scoring,
        expansions: game.expansions.map(exp => ({
            id: exp.id,
            name: exp.name,
            content: exp.content,
            price: exp.price,
            rules: exp.rules,
            soundEffects: exp.soundEffects
        }))

    });

});

router.get('/:gameId/expansions/:expansionId', async (req: Request, res: Response) => {

    const { gameId, expansionId } = req.params;

    const game = await Game.findOne({ gameId }).lean();

      if (!game) {
       res.status(404).json({ error: `No game found for ID: ${gameId}` });
       return;
    }

    const expansion = game.expansions.find((e) => e.id === expansionId);

    if (!expansion){
        res.status(404).json({error: `No expansion for ID ${expansionId}`});
        return;
    }

    res.json({
        id: expansion.id,
        name: expansion.name,
        content: expansion.content,
        price: expansion.price,
        rules: expansion.rules ?? [],
        soundEffects: expansion.soundEffects ?? []
    });

});

export default router;