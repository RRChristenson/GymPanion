/*global cordova, module*/

module.exports = {
    login: function(alUser, successCallback, errorCallback) {
    	cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "login", [JSON.stringify(alUser)]);
    },
    registerPushNotification: function(successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "registerPushNotification", []);
    },
    isLoggedIn: function(successCallback, errorCallback) {
    	cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "isLoggedIn", []);
    },
    getUnreadCount: function(successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "getUnreadCount", []);
    },
    getUnreadCountForGroup: function(groupId,successCallback, errorCallback) {
            cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "getUnreadCountForGroup", [groupId]);
    },
    getUnreadCountForUser: function(userId,successCallback, errorCallback) {
            cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "getUnreadCountForUser", [userId]);
    },
    updatePushNotificationToken: function(token, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "updatePushNotificationToken", [token]);
    },
    launchChat: function(successCallback, errorCallback) {
    	cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "launchChat", []);
    },
    launchChatWithUserId: function(userId, successCallback, errorCallback) {
    	cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "launchChatWithUserId", [userId]);
    },
    launchChatWithGroupId: function(groupId, successCallback, errorCallback) {
    	cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "launchChatWithGroupId", [groupId]);
    },
    launchChatWithClientGroupId: function(clientGroupid, successCallback, errorCallback) {
    	cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "launchChatWithClientGroupId", [clientGroupid]);
    },
    startNewConversation: function(selected, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "startNewConversation", [selected]);
    },
    showAllRegisteredUsers: function(showAllContacts, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "showAllRegisteredUsers", [showAllContacts]);
    },
    addContact: function(contact, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "addContact", [JSON.stringify(contact)]);
    },
    updateContact: function(contact, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "updateContact", [JSON.stringify(contact)]);
    },
    removeContact: function(contact, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "removeContact", [JSON.stringify(contact)]);
    },
    addContacts: function(contacts, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "addContacts", [JSON.stringify(contacts)]);
    },
    processPushNotification: function(data, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "processPushNotification", [JSON.stringify(data)]);
    },
    getMessageList: function(data, successCallback, errorCallback){
        cordova.exec(successCallback,errorCallback,"ApplozicCordovaPlugin", "getMessageList", [JSON.stringify(data)]);
    },
    /*
    var group = {
            'groupName': 'hey',
            'groupMemberList': ['userid1', 'userid2', 'userid3'], // Pass list of user Ids in groupMemberList
            'imageUrl': 'https://www.applozic.com/favicon.ico',
            'type' : 1,    //'type' : 1, //(required) 1:private, 2:public, 5:broadcast,7:GroupofTwo
            'metadata' : {
                'key1' : 'value1',
                'key2' : 'value2'
            }
         };
    applozic.createGroup(group, function() {}, function() {});
    */
    createGroup: function(group, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "createGroup", [JSON.stringify(group)]);
    },
    /*
    {
        'groupId': groupId,
        'clientGroupId': clientGroupId, //use either groupId or clientGroupId
        'userId': userIdToAdd
    }
    */
    addGroupMember: function(group, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "addGroupMember", [JSON.stringify(group)]);
    },
    removeGroupMember: function(group, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "removeGroupMember", [JSON.stringify(group)]);
    },
    enableTopicBasedChat: function(enable, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "enableTopicBasedChat", [enable]);
    },
    startTopicBasedChat: function(conversation, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "startTopicBasedChat", [JSON.stringify(conversation)]);
    },
    logout: function(successCallback, errorCallback) {
    	cordova.exec(successCallback, errorCallback, "ApplozicCordovaPlugin", "logout", []);
    }
};
