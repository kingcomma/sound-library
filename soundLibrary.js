;(function( window ) {

  var SoundLibrary = function( sounds ) {

    if( !document.createElement( 'audio' ).canPlayType ) { return; }

    this.sounds = sounds;
    this.library = {};
    this.init();

  };

  SoundLibrary.prototype = {

    init: function() {

      //  Loop through each sound
      this.sounds.forEach( function( sound ) {

        //  Add to library
        this.library[ sound.name ] = {};
        this.library[ sound.name ].source = this.determineBestSource( sound.sources );
        this.library[ sound.name ].audio = new Audio( sound.preload ? this.library[ sound.name ].source.file : '' );

      }, this );

    },

    determineBestSource: function( sources ) {

      var audioElement = new Audio(),
          supported,
          bestBet;

      for( var i = 0; i < sources.length; i++ ) {
        
        //  Get support level
        supported = audioElement.canPlayType( sources[i].format );

        //  This sound is supported as well as possible
        //  Remember it and break loop
        if( supported === 'probably' ) {
          bestBet = sources[i];
          break;
        }
        //  This sound is probably supported
        //  Remember it, but keep looping for possible better match
        else if ( supported === 'maybe' ) {
          bestBet = sources[i];
        }
      }
      
      return bestBet;

    },

    isLoaded: function( soundName ) {

      //  Considering ready state of 3 or 4 to mean loaded
      return this.library[ soundName ].audio.readyState > 2 ? true : false;

    },

    isPlayable: function( soundName ) {

      var sound = this.library[ soundName ] || false;

      //  Sound not in library or in library but no source
      if( !sound || ( sound && !sound.source ) ) return false;

      //  Sound exists, return standard canPlayType response with more verbose no response than ""
      return sound.audio.canPlayType( sound.source.format ) || "unknown";

    },

    play: function( soundName ) {
      
      //  Can't play sounds that don't exist
      if( !this.isPlayable( soundName ) ) return false;

      //  If the sound is not already loaded, load
      if( !this.library[ soundName ].audio.currentSrc ) {
        this.library[ soundName ].audio.src = this.library[ soundName ].source.file;
      }
      //  If sound is already loaded, set track to beginning
      else {
        this.library[ soundName ].audio.currentTime = 0;
      }

      //  Play!
      this.library[ soundName ].audio.play();

    }

  };

  window.SoundLibrary = SoundLibrary;

})( window );
