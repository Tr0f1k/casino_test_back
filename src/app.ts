import express, { Request, Response } from 'express';
import path from 'path';
import gameData from './data/game-data.json';

const app = express();

// Middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://casino-test-back.vercel.app/',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.static(path.join(__dirname, 'public')));

// This endpoint is sending the information about games from JSON file to the frontend
app.get('/gamedata', (req: Request, res: Response) => {
  try {
    res.json(gameData);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Defining the contents of three reels
const REELS: string[][] = [
  ['cherry', 'lemon', 'apple', 'lemon', 'banana', 'banana', 'lemon', 'lemon'],
  ['lemon', 'apple', 'lemon', 'lemon', 'cherry', 'apple', 'banana', 'lemon'],
  ['lemon', 'apple', 'lemon', 'apple', 'cherry', 'lemon', 'banana', 'lemon'],
];

// Patterns of the rewards
const REWARD_RULES: { pattern: string; reward: number }[] = [
  { pattern: 'ccc', reward: 50 },
  { pattern: 'cc', reward: 40 },
  { pattern: 'aaa', reward: 20 },
  { pattern: 'aa', reward: 10 },
  { pattern: 'bbb', reward: 15 },
  { pattern: 'bb', reward: 5 },
  { pattern: 'lll', reward: 3 },
];

// Randomizing the results of spinning all three reels
const generateReelSpinResult = (reel: string[]): string =>
  reel[Math.floor(Math.random() * reel.length)];

// Uniting all three elements from reels random in an array
const generateSpinResults = (): string[] => {
  const spinResults: string[] = REELS.map(generateReelSpinResult);
  return spinResults;
};

// Calculating the spin results
function calculateSpinRewards(spinResults: string[]): number {
  const serializedSpinResults = spinResults
    // Mapping the first letter of each randomized item to the map and checking whether it satisfies any pattern
    .map((item) => item[0])
    .join('')
    .toLowerCase();

  const satisfiedRewardRule = REWARD_RULES.find((rule) =>
    serializedSpinResults.startsWith(rule.pattern),
  );
  return (satisfiedRewardRule && satisfiedRewardRule.reward) || 0;
}

// This endpoint send the spin result and the amount of coins won to the frontend
app.get('/spin', (req: Request, res: Response) => {
  try {
    const spinResults: string[] = generateSpinResults();
    const coinsWon: number = calculateSpinRewards(spinResults);
    res.json({ spinResults, coinsWon });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port: number = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
