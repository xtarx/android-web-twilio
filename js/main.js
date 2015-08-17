function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Initialize endpoint
function start() {    
    // var token=getParameterByName('token');
    var token = Android.getToken();
    alert('Android.getToken '+token);

    // console.log(token);
    // Create the endpoint, and then initialize the main calling app
    var endpoint = new Twilio.Endpoint(token);
    init(endpoint);

}
// Initialize video calling app with my endpoint
function init(endpoint) {
    console.log('Endpoint Created');
    //console.log(endpoint);
    // Automatically accept any incoming calls

    endpoint.on('invite', function (invitation) {
        console.log('Received an Invite to <join></join> a Conversation from ' + invitation.from);
        invitation.accept().then(showConversation);

    });


    // Listen for incoming calls
    endpoint.listen().then(function (endpoint) {
        console.log("Address " + endpoint.address + " isListening: " + endpoint.isListening + " Listening for Invites");
    },
    function (error) {
        console.log("Endpoint could not start listening");
    });
}

// Show a conversation (inbound or outbound)
function showConversation(conversation) {
    alert('Android.dismissDialog');
    Android.dismissDialog();

    // Attach to DOM
    conversation.localMedia.attach('#me');
    // Listen for participants
    conversation.on('participantConnected', function (participant) {
        participant.media.attach('#you');
    });
}

start();