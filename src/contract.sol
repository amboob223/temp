// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;


        contract xalis{
           
            address public owner;
            string public review;

                struct Person{
                    address reviewer;
                    string review;
                }

            mapping(uint => Person) public people;
            uint public reviewId;

            function addReview (string memory _review) public{ 
                         
                Person storage newPerson = people[reviewId];
                         newPerson.review =_review;
                         review = _review;
                      reviewId++;
            }


        }