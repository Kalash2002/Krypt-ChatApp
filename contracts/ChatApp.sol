// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract ChatApp {
    //User struc
    struct user {
        string name;
        friend[] friendList;
    }

    //friend struct
    struct friend {
        address pubkey;
        string name;
    }

    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    //fetching all the register user in the application
    struct AllUserStruct {
        string name;
        address accountAddress;
    }
    AllUserStruct[] getAllUsers;

    string public text = "contract connected";

    //show all the register users
    mapping(address => user) userList;
    // contain all the communication happening between two users
    mapping(bytes32 => message[]) allMessages;

    //Check User exist or not

    function checkUserExists(address pubkey) public view returns (bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    //Create acoount
    function createAccount(string calldata name) external {
        // check whther user already exists or not
        require(checkUserExists(msg.sender) == false, "User Already exits");
        require(bytes(name).length > 0, "Username Cannot be empty");

        userList[msg.sender].name = name;
        getAllUsers.push(AllUserStruct(name, msg.sender));
    }


    //Get username on the given address
    function getUsername(address pubkey) external view returns (string memory) {
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

    //Add Friends
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not Registered!");
        require(
            msg.sender != friend_key,
            "User cannot add themselves as friends"
        );
        require(
            checkAlreadyFriends(msg.sender, friend_key) == false,
            "Already added as a friend"
        );

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    //checkAlreadyFreinds
    function checkAlreadyFriends(
        address pubkey1,
        address pubkey2
    ) internal view returns (bool b) {
        if (
            userList[pubkey1].friendList.length >
            userList[pubkey2].friendList.length
        ) {
            address temp = pubkey1;
            pubkey2 = pubkey1;
            pubkey2 = temp;

            for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
                if (userList[pubkey1].friendList[i].pubkey == pubkey2)
                    return true;
            }
            return false;
        }
    }

    function _addFriend(
        address me,
        address friend_key,
        string memory name
    ) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }

    //get my friend
    function geyMyFreind() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }

    //get chatcode
    function _getChatCode(
        address pubkey1 ,address pubkey2

    ) internal pure returns (bytes32) {
        if (pubkey1 < pubkey2) {
           return keccak256(abi.encodePacked(pubkey1 , pubkey2));
        } else {
           return keccak256(abi.encodePacked(pubkey2, pubkey1));

        }

    }

    // Send message
    function sendMessage(address friend_key,string calldata _msg) external {
        //check user whether it is present
        require(checkUserExists(msg.sender), "Create an account");
        //chekc freinds account exists
        require(
            checkUserExists(friend_key),
            "Friend you want to send message is not registered"
        );
        // check they are already friends
        require(
            checkAlreadyFriends(msg.sender, friend_key),"Account you want to send message is not your friend");


        //
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        //updating struct with new message
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    //Read Message
    function readMessage(
        address friend_key
    ) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    //fetch all the users who get registered in our application
    function getAllAppUsers() public view returns(AllUserStruct[] memory){
        return getAllUsers;
    }

    //dummy check
   function  test() public view returns (string memory) {
        return text;
    }
}
