# El Pollo Loco

A side-scrolling jump and run game, written in plain JavaScript with an
object-oriented structure. No framework, no game engine.

👉 **[Play the game](https://benjaminblarr.de/el-pollo-loco/)**

## About

Pepe collects coins and bottles of tabasco salsa and uses them against the
chicken boss.

The part worth looking at is the structure behind it. Every moving thing, the
character, the enemies, the bottles, the clouds, inherits from one base class
that knows its position, its size and how to draw itself. On top of that runs a
single loop that clears the canvas many times per second and redraws
everything, applying gravity, animation states and collision checks on every
pass.

Graphics and interface elements are the assets that came with the project. The
audio is not: the original sound effects were weak, so I generated my own set
with ElevenLabs and kept only what still worked.

## Features

- Object-oriented architecture, every entity extends a shared base class
- Collision detection for enemies, bottles and collectibles
- Boss fight with its own state handling
- Health and bottle bars, start and end screens
- Own sound design and background music
- Keyboard controls

## Built with

<p align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo" />
</p>

Rendering through the Canvas API.
