(function( window ) {

  var SoundLibrary = function( sounds, settings ) {

    if( !document.createElement( 'audio' ).canPlayType ) { return; }

    this.sounds = sounds;
    this.settings = settings || {};
    this.forceSource = this.settings.forceSource || false;
    this.library = {};
    this.init();

  };

  SoundLibrary.prototype = {

    init: function() {

      var supported,
          bestBet;

      //  Container for all playable sounds
      this.library = {};

      //  Loop through each sound...
      this.sounds.forEach( function( sound ) {

        //  Add sound to library as object containing audio element
        this.library[ sound.name ] = {
          audio: new Audio()
        };

        //  If forceSource is set, don't check source support just set it
        if( this.forceSource && sound.sources.length ) {
          this.library[ sound.name ].audio.src = sound.sources[0].file;
        }
        //  Otherwise, check each source and find most supported
        else {
          //  Loop through each possible source for this individual sound...
          for( var i = 0; i < sound.sources.length; i++ ) {
            
            //  Get support level
            supported = this.library[ sound.name ].audio.canPlayType( sound.sources[i].format );

            //  This sound is supported as well as possible
            //  Remember it and break loop
            if( supported === 'probably' ) {
              bestBet = sound.sources[i].file;
              break;
            }
            //  This sound is probably supported
            //  Remember it, but keep looping for possible better match
            else if ( supported === 'maybe' ) {
              bestBet = sound.sources[i].file;
            }
          }
          
          //  Set audio element's source to bestBet
          this.library[ sound.name ].audio.src = bestBet;
        }
  
      }, this );

    },

    canPlay: function( sound ) {

      return this.library[ sound ] && this.library[ sound ].currentSrc !== "" ? true : false;

    },

    play: function( sound ) {
      
      if( this.canPlay( sound ) ) {
        this.library[ sound ].audio.currentTime = 0;
        this.library[ sound ].audio.play();
      }

    }

  };

  window.SoundLibrary = SoundLibrary;

})( window );