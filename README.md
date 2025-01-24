# LINK Game

[Click here to see deployed game](https://mrmatroxa.github.io/the-game-link/)

## Description

"LINK" is an exciting and interactive browser-based game where 2 players control characters to avoid enemies and obstacles. The objective is to survive as long as possible while achieving the highest score. The game features sound effects, animations, and a dynamic environment to enhance the gaming experience.

## MVP

- Player can move and control their character.
- Bombs spawn and detonate after a while.
- Collision detection between player and enemies.
- Score tracking based on enemy interactions.
- Sound effects for various game events (e.g., player death, enemy explosion).
- Basic game over screen with the option to restart.

## Backlog

- Add power-ups that provide temporary advantages to the player.
- Implement different enemy types with unique behaviors.
- Introduce levels with increasing difficulty.
- Add more sound effects.
- Create a high score leaderboard.
- Implement on-line multiplayer mode for competitive play.
- Add character customization options.

### Classes and Methods

- `Game`
  - `start()`: Initializes the game and starts the game loop.
  - `update()`: Updates the game state on each frame.
  - `render()`: Renders the game elements on the screen.
  - `endGame()`: Ends the game and displays the game over screen.
  - `destroyEnemy()`: Handles the logic for destroying enemies.
  - `checkPlayerEnemyCollision(enemy)`: Checks for collisions between the player and enemies.
  - `checkPlayerCollision()`: Checks for collisions between the players.
  - `checkIfEnemyExploded()`: Checks if an enemy has exploded.
- `Player`
  - `move()`: Handles player movement.
  - `didCollide(enemy)`: Checks for collision with an enemy.
- `Enemy`
  - `spawn()`: Spawns a new enemy.
  - `move()`: Handles enemy movement.
  - `explode()`: Handles enemy explosion animation and logic.
  - `checkDead()`: Checks if the enemy is dead.
- `Sound`
  - `audioVolumeMax()`: Sets the audio volume to maximum.
  - `audioVolumeZero()`: Mutes the audio.
  - `sfxToggle()`: Toggles sound effects on and off.

## States and State Transitions

- `Start Screen`: Initial screen where the player can start the game.
- `Playing`: Main game state where the player controls their character.
- `Game Over`: Screen displayed when the player loses, with the option to restart.

## Task

1. Implement player movement and controls.
2. Create enemy spawning and movement logic.
3. Implement collision detection between player and enemies.
4. Add sound effects for game events.
5. Implement score tracking and display.
6. Create game over screen with restart option.
7. Polish game visuals and animations.
8. Test and debug the game.

## Links

- [Github repository Link](https://github.com/MrMatroxa/the-game-link)
- [Deployment Link](https://mrmatroxa.github.io/the-game-link/)
