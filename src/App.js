import { ethers } from 'ethers';
import {React, useState} from 'react';
import "./App.css";


function App() {

    //first thing we need to do is establish the states
    const [connectedAddress,setConnectedAddress] = useState(null)
    const [review,setReview] = useState("");
    const [newReview,setNewReview] = useState([]);// we had to change the type 

    const connectMetamask = async() =>{
      const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
      const account = accounts[0] // this is my account
      setConnectedAddress(account)
    }

    const write = async()=>{
      const provider =new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/b91ba8958d0f40609214cd29e0f4bba3")
      const contractAddress = "0x218C0CE3023316A35F020AD814024e01536800B5"
      const ERC20_abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_review",
				"type": "string"
			}
		],
		"name": "addReview",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAll",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "people",
		"outputs": [
			{
				"internalType": "address",
				"name": "reviewer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "review",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reviewId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "reviews",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
      const privateKey = "5ccb69e0e14929628bdbdd4fbb1159f730f55c26eea04f8f370e6664546a5786"
      const wallet = new ethers.Wallet(privateKey,provider)
      const contract = new ethers.Contract(contractAddress,ERC20_abi,wallet)

                      //tranasction 
                    const tx = await contract.addReview(review)
                         await tx.wait()
                        console.log(tx)            
    }


    const read = async()=>{
      const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/b91ba8958d0f40609214cd29e0f4bba3")
      const contractAddress = "0x218C0CE3023316A35F020AD814024e01536800B5"
      const ERC20_abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_review",
				"type": "string"
			}
		],
		"name": "addReview",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAll",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "people",
		"outputs": [
			{
				"internalType": "address",
				"name": "reviewer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "review",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reviewId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "reviews",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

      const contract = new ethers.Contract(contractAddress,ERC20_abi,provider)
      const result = await contract.getAll();
      const newResult = result.toString().split(",") // the . to string works on an object
                      setNewReview(newResult)

          

    }


  return (
    <div className="App">
      <div id="outC">
      <div id='inC'>

      <button
      onClick={connectMetamask}
      
      >
        connect metamask
      </button>

      <p>
        {connectedAddress}
      </p>

      <input
        value={review}
        onChange={(e)=>setReview(e.target.value)}
        />
      <button onClick={write}>
        write
      </button>

      <button 
        onClick={read}
        
        >
        read
      </button>
 <table>
        <thead>
          <tr>
            <th>Reviews</th>
          </tr>
        </thead>
        <tbody>
          {newReview.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      </table>
  

</div>
          </div>
    </div>
  );
}

export default App;
