// @ts-check
const eslint = require('@eslint/js');
const { defineConfig } = require('eslint/config');
const globals = require('globals');

// Every class and function in this project lives on the global scope: the 26 files
// are loaded through separate <script> tags, not as modules, so ESLint cannot see
// across file boundaries. Listing the names here is what makes no-undef able to
// catch a typo instead of reporting every cross-file reference as unknown.
const GAME_CLASSES = [
  'AudioHub',
  'BabyChicken',
  'BackgroundObject',
  'BottleBar',
  'BottleInAir',
  'BottleOnGround',
  'Character',
  'Chicken',
  'Cloud',
  'Coin',
  'CoinBar',
  'CollectableObject',
  'DrawableObject',
  'Endboss',
  'EndbossHealthBar',
  'HealthBar',
  'ImageHub',
  'IntervalHub',
  'Keyboard',
  'Level',
  'MoveableObject',
  'StatusBar',
  'ThrowableObject',
  'World',
];

const GAME_FUNCTIONS = [
  'addTouchLogic',
  'closeControls',
  'closeImpressum',
  'closeOptions',
  'createBackgrounds',
  'enterFullscreen',
  'exitFullscreen',
  'fullscreen',
  'hideAddressBar',
  'init',
  'initLevel',
  'openControls',
  'openImpressum',
  'openOptions',
  'openStartscreen',
  'playStartSounds',
  'playStartscreenMusic',
  'returnToHome',
  'startGame',
  'startTouchControls',
  'syncAudioAndButtons',
  'toggleFullscreen',
  'toggleMute',
  'togglePause',
  'toggleTouchControls',
  'updateFullscreenButton',
  'updateGameScreens',
];

// Writable, because these are assigned from files other than the one declaring them.
const GAME_STATE = [
  'canvas',
  'enterButton',
  'exitButton',
  'gameStarted',
  'isMuted',
  'keyboard',
  'level1',
  'muteButton',
  'refGameOverScreen',
  'refWinningScreen',
  'world',
];

const declare = (names, access) => Object.fromEntries(names.map((name) => [name, access]));

module.exports = defineConfig([
  {
    files: ['**/*.js'],
    ignores: ['eslint.config.js'],
    extends: [eslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: {
        ...globals.browser,
        ...declare(GAME_CLASSES, 'readonly'),
        ...declare(GAME_FUNCTIONS, 'readonly'),
        ...declare(GAME_STATE, 'writable'),
      },
    },
    rules: {
      // The globals list above declares every class and function so the other 25 files
      // can see them, while each file also declares the one it owns. That overlap is
      // the design here, not a mistake, so builtinGlobals must stay off - otherwise
      // all 26 declarations get reported as redeclarations of themselves.
      'no-redeclare': ['error', { builtinGlobals: false }],

      // Buttons in index.html call these functions through onclick, which ESLint cannot
      // see. Limiting the check to local scope still reports dead code inside functions
      // without 27 false positives on the global ones.
      'no-unused-vars': ['error', { vars: 'local' }],
    },
  },
  {
    files: ['eslint.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: globals.node,
    },
  },
]);
