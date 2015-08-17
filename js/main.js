function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Initialize endpoint
function start() {
       // First, grab the SAT token from the server
   // var token = "eyJhbGciOiAiSFMyNTYiLCAiY3R5IjogInR3aWxpby1zYXQ7dj0xIiwgInR5cCI6ICJKV1QifQ.eyJuYmYiOiAxNDM5ODA4ODQ4LCAiaXNzIjogIlNLNmQxMTVhZjNhNjg0NGIzNDdhY2E5ODI3MmViZDAwOWIiLCAiZ3JhbnRzIjogW3sicmVzIjogInNpcDpxQEFDNzZjM2Q1ZDI0MDgyZTczZDQxOWYxMzg0YzQ5YjY1NjQuZW5kcG9pbnQudHdpbGlvLmNvbSIsICJhY3QiOiBbImxpc3RlbiIsICJpbnZpdGUiXX0sIHsicmVzIjogImh0dHBzOi8vYXBpLnR3aWxpby5jb20vMjAxMC0wNC0wMS9BY2NvdW50cy9BQzc2YzNkNWQyNDA4MmU3M2Q0MTlmMTM4NGM0OWI2NTY0L1Rva2Vucy5qc29uIiwgImFjdCI6IFsiUE9TVCJdfV0sICJleHAiOiAxNDM5ODEyNDQ4LCAianRpIjogIlNLNmQxMTVhZjNhNjg0NGIzNDdhY2E5ODI3MmViZDAwOWItMTQzOTgwODg0OCIsICJzdWIiOiAiQUM3NmMzZDVkMjQwODJlNzNkNDE5ZjEzODRjNDliNjU2NCJ9.vSL2fqjmYP8Q6QmFLNqM26p19hKESTy3aenIs0hH2qQ";
    
    var token=getParameterByName('token');
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
    // Attach to DOM
    conversation.localMedia.attach('#me');
    // Listen for participants
    conversation.on('participantConnected', function (participant) {
        participant.media.attach('#you');
    });
}

start();