$(function () {
  var syncClient;
  
  var ap = new APlayer({
                        element: document.getElementById('player'),
                        narrow: false,
                        autoplay: true,
                        showlrc: false,
                        mutex: false,
                        theme: '#e6d0b2',
                        preload: 'metadata',
                        mode: 'circulation',
                        music: {
                        title: 'Something Like This',
                        author: 'Chainsmokers',
                        url: 'nyan.mp3',
						pic: 'img.jpg',
                        }
                        });

  
  
  //We'll use message to tell the user what's happening
  var $message = $('#message');
  
  //Get handle to the game board buttons
  //var $buttons = $('#board .board-row button');
  
  //Our interface to the Sync service
  var syncClient;
  
  //We're going to use a single Sync document, our simplest
  //synchronisation primitive, for this demo
  var syncDoc;
  

  
  //Get an access token for the current user, passing a device ID
  //In browser-based apps, every tab is like its own unique device
  //synchronizing state -- so we'll use a random UUID to identify
  //this tab.
  $.getJSON('/token', function (tokenResponse) {
            //Initialize the Sync client
            syncClient = new Twilio.Sync.Client(tokenResponse.token, { logLevel: 'info' });
            
            //Let's pop a message on the screen to show that Sync is ready
            $message.html('Sync initialized!');
            
            //Now that Sync is active, lets enable our game board
           // $buttons.attr('disabled', false);
            
            //This code will create and/or open a Sync document
            //Note the use of promises
            syncClient.document('SyncSong').then(function(doc) {

                 //Lets store it in our global variable
                 syncDoc = doc;
                                                 
                 //Initialize game board UI to current state (if it exists)
                 var data = syncDoc.get();
                 //Sets a flag to determine if music file is still playing or not.
//				var isPlaying = false;
                 if(data){
                     updateUserInterface(data);
                     }
                                                 
                 //Let's subscribe to changes on this document, so when something
                 //changes on this document, we can trigger our UI to update
                 syncDoc.on('updated', updateUserInterface);                             
                 });
            
            });
  //Update the buttons on the board to match our document
  
   ap.on('play', function(){

        //if(ap.audio.currentTime){		
            var data = {"time" : ap.audio.currentTime};
            console.log(data);
            syncDoc.set(data);
			
        //}
  }); 
  

 
  ap.on('pause', function(){
//	  isPlaying = !isPlaying;
        var data = {"time" : ap.audio.currentTime};
        console.log(data);
        syncDoc.set(data);
  });
  
  
  function updateUserInterface(data) {
          console.log(data);
		  if(ap.play(data["time"]))
		  {
			  ap.pause(data["time"]);
		  }
		  else{
			  ap.play(data["time"]);
		  }

      }
  });

