// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract HelloWorld {
    string[] strings;

    // push one string to array
    function pushToStrings(string memory _data) public{
        strings.push(_data);
    }
    
    //get all the strings in array form
    function GetAllStrings() view public returns(string[] memory){
        return strings;
    }

    //get nth string of strings array
    function GetNthStrings(uint x) view public returns(string memory){
        return strings[x];
    }

    //push array of strings in strings
    function pushStringsArray(string[] memory someData) public{
        for (uint i=0; i < someData.length; i++) {
           strings.push(someData[i]);
        }
    }
    
    //change whole strings, take array of strings as input
    function changeWholeString(string[] memory someData) public{
       strings=someData;

    }
}