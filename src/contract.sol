// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


contract xalis {
    address public owner;

    address[] public addresses;


    struct Person {
        address reviewer;
        string[] reviews;
    }

    mapping(address => Person) public people;
    uint public reviewId;


    function addPerson(address  _address, string memory _review ) public{
        Person storage newPerson = people[_address];
            addresses.push(_address);
            newPerson.reviews.push(_review);
            newPerson.reviewer = _address;
    }

    function addReview(address _address, string memory _review) public {
        Person storage newPerson = people[_address];
        newPerson.reviews.push(_review);
    }



    function getAll() public view returns (address[] memory){
        return addresses;
    }
    function getAllReviews(address _address) public view returns(string[][] memory){
       string[][] memory AllReviews = new string[][](1);
       AllReviews[0] = people[_address].reviews;
       return AllReviews;

    }
}
 