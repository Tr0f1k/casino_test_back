"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const game_data_json_1 = __importDefault(require("./data/game-data.json"));
const app = (0, express_1.default)();
// Middleware to enable CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.get('/gamedata', (req, res) => {
    try {
        // Sending gameData fetched from import statement
        res.json(game_data_json_1.default);
    }
    catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const REELS = [
    ['cherry', 'lemon', 'apple', 'lemon', 'banana', 'banana', 'lemon', 'lemon'],
    ['lemon', 'apple', 'lemon', 'lemon', 'cherry', 'apple', 'banana', 'lemon'],
    ['lemon', 'apple', 'lemon', 'apple', 'cherry', 'lemon', 'banana', 'lemon'],
];
const REWARD_RULES = [
    { pattern: 'ccc', reward: 50 },
    { pattern: 'cc', reward: 40 },
    { pattern: 'aaa', reward: 20 },
    { pattern: 'aa', reward: 10 },
    { pattern: 'bbb', reward: 15 },
    { pattern: 'bb', reward: 5 },
    { pattern: 'lll', reward: 3 },
];
const generateReelSpinResult = (reel) => reel[Math.floor(Math.random() * reel.length)];
const generateSpinResults = () => {
    const spinResults = REELS.map(generateReelSpinResult);
    return spinResults;
};
function calculateSpinRewards(spinResults) {
    const serializedSpinResults = spinResults
        .map((item) => item[0])
        .join('')
        .toLowerCase();
    const satisfiedRewardRule = REWARD_RULES.find((rule) => serializedSpinResults.startsWith(rule.pattern));
    return (satisfiedRewardRule && satisfiedRewardRule.reward) || 0;
}
app.get('/spin', (req, res) => {
    try {
        const spinResults = generateSpinResults();
        const coinsWon = calculateSpinRewards(spinResults);
        res.json({ spinResults, coinsWon });
    }
    catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
