# SoundLibrary

A tiny (~1kb, compressed) tool to help manage sounds played using HTML5 audio elements.

## Getting Started

Create a sound library by passing an array of data about each of your sounds to the `SoundLibrary()` constructor. Sound data is formatted like so:

```
{
  name: 'mySound',
  sources: [
    {
      file: 'sounds/mySound.ogg',
      format: 'audio/ogg; codecs="vorbis"'
    },
    {
      file: 'sounds/mySound.mp3'
      format: 'audio/mp3'
    }
  ],
  preload: true
}
```

**To be continued...**