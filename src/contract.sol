// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


contract xalis {
    address public owner;
    string[] public reviews; // Declare an array to store reviews

    struct Person {
        address reviewer;
        string review;
    }

    mapping(address => Person) public people;
    uint public reviewId;

    function addReview(string memory _review) public {
        Person storage newPerson = people[msg.sender];
        newPerson.review = _review;
        reviews.push(_review); // Add the review to the array
        reviewId++;
    }

    function getAll() public view returns (string[] memory){
        return reviews;
    }
}
