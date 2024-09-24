// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RegistrationLogin {
    struct User {
        string username;
        string email;
        bytes32 passwordHash;
        address userAddress;
        bool registered;
    }
    
    mapping(string => address) usernameToAddress;
    mapping(string => User) users;
    
    event UserRegistered(string username, string email, address userAddress);
    event UserLoggedIn(string username, string email);
    
    function register(string memory _username, string memory _email, string memory _password) public {
        require(!users[_email].registered, "Email already registered");
        require(usernameToAddress[_username] == address(0), "Username already taken");
        
        bytes32 passwordHash = keccak256(abi.encodePacked(_password));
        users[_email] = User(_username, _email, passwordHash, msg.sender, true);
        usernameToAddress[_username] = msg.sender;
        
        emit UserRegistered(_username, _email, msg.sender);
    }
    
    function login(string memory _email, string memory _password) public returns(string memory, address) {
        require(users[_email].registered, "User not registered");
        bytes32 passwordHash = keccak256(abi.encodePacked(_password));
        require(users[_email].passwordHash == passwordHash, "Invalid password");
        
        emit UserLoggedIn(users[_email].username, _email);

        return (users[_email].username, users[_email].userAddress);
    }
}

