// Initialize endpoint
$('#start').on('click', function () {
    // First, grab the SAT token from the server
    var token = "eyJjdHkiOiAidHdpbGlvLXNhdDt2PTEiLCAiYWxnIjogIkhTMjU2IiwgInR5cCI6ICJKV1QifQ.eyJleHAiOiAxNDM5NDc3MDc2LCAiZ3JhbnRzIjogW3siYWN0IjogWyJsaXN0ZW4iLCAiaW52aXRlIl0sICJyZXMiOiAic2lwOnFAQUM3NmMzZDVkMjQwODJlNzNkNDE5ZjEzODRjNDliNjU2NC5lbmRwb2ludC50d2lsaW8uY29tIn0sIHsiYWN0IjogWyJQT1NUIl0sICJyZXMiOiAiaHR0cHM6Ly9hcGkudHdpbGlvLmNvbS8yMDEwLTA0LTAxL0FjY291bnRzL0FDNzZjM2Q1ZDI0MDgyZTczZDQxOWYxMzg0YzQ5YjY1NjQvVG9rZW5zLmpzb24ifV0sICJzdWIiOiAiQUM3NmMzZDVkMjQwODJlNzNkNDE5ZjEzODRjNDliNjU2NCIsICJuYmYiOiAxNDM5NDczNDc2LCAiaXNzIjogIlNLNmQxMTVhZjNhNjg0NGIzNDdhY2E5ODI3MmViZDAwOWIiLCAianRpIjogIlNLNmQxMTVhZjNhNjg0NGIzNDdhY2E5ODI3MmViZDAwOWItMTQzOTQ3MzQ3NiJ9.VUGpGvLoVTHBhxgaSC-DdGcPXSxZvPCT3d8-N4wroIA";
    // Create the endpoint, and then initialize the main calling app
    var endpoint = new Twilio.Endpoint(token);
    // $('#startDiv').hide();
    $('#callDiv').show();
    init(endpoint);

});

function start() {

}
// Initialize video calling app with my endpoint
function init(endpoint) {
    console.log('Endpoint Created');
    //console.log(endpoint);
    // Automatically accept any incoming calls

    endpoint.on('invite', function (invitation) {
        console.log('Received an Invite to join a Conversation from ' + invitation.from);
        invitation.accept().then(showConversation);

    });

    // Start an outbound conversation
    $('#call').on('click', function () {
        endpoint.createConversation($('#other-name').val())
        .then(showConversation);
    });

    // Listen for incoming calls
    //endpoint.listen();

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
    // Attach to DOM
    conversation.localMedia.attach('#me');
    // Listen for participants
    conversation.on('participantConnected', function (participant) {
        participant.media.attach('#you');
    });
}