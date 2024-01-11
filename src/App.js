import { ethers } from 'ethers';
import {React, useState} from 'react';
import "./App.css";


function App() {

    //first thing we need to do is establish the states
    const [connectedAddress,setConnectedAddress] = useState("")
    const [review,setReview] = useState("");
    const [newReview,setNewReview] = useState([]);// we had to change the type
    const [allAddresses,setAllAddresses] = useState([]);
   
    const [nowindex,setnowindex] = useState(0);
   
    const connectMetamask = async() =>{
      if(window.ethereum){

     
      const accounts = await window.ethereum.request({method:"eth_requestAccounts"});
      const account = accounts[0] // this is my account
      setConnectedAddress(account)}
    }

    const write = async()=>{
      const provider =new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/b91ba8958d0f40609214cd29e0f4bba3") // because we using seporia eth we use the injected provider with this type of network provider
      const contractAddress = "0xF2eF0441C602607b892b4F6c75f612d0420C4552"
      const ERC20_abi = [
       
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "addresses",
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
    "inputs": [],
    "name": "getAll",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getAllReviews",
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
                    const tx = await contract.addReview(allAddresses[nowindex%allAddresses.length],review)
                         await tx.wait()
                        console.log(tx)            
    }


    const read = async()=>{

      const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/b91ba8958d0f40609214cd29e0f4bba3")
      const contractAddress = "0xF2eF0441C602607b892b4F6c75f612d0420C4552"
      const ERC20_abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      },
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "addresses",
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
    "inputs": [],
    "name": "getAll",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getAllReviews",
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
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]


      const contract = new ethers.Contract(contractAddress,ERC20_abi,provider)
     
      const result = await contract.getAllReviews(allAddresses[nowindex % allAddresses.length]);
      const newResult = result.toString().split(",") // the . to string works on an object
                      setNewReview(newResult)
console.log(newResult)

   
}







    const last = ()=>{
        setnowindex((prevIndex ) =>{
     
          return prevIndex -1
        }
        )

     }


    const next= async()=>{
      const provider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/b91ba8958d0f40609214cd29e0f4bba3")
      const contractAddress = "0xF2eF0441C602607b892b4F6c75f612d0420C4552";
      const ERC20_abi = [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_reviewer",
              "type": "address"
            }
          ],
          "name": "addPerson",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_address",
              "type": "address"
            },
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
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "addresses",
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
          "inputs": [],
          "name": "getAll",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_address",
              "type": "address"
            }
          ],
          "name": "getReviews",
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
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
      const contract = new ethers.Contract(contractAddress,ERC20_abi,provider)
       const rray =  await contract.getAll();
                console.log([...new Set(rray)])
				
             setAllAddresses([...new Set(rray)])
       
         
             setnowindex((previndex)=>{
             return  (previndex + 1)
             })
             

           


    }

   
   
   

   
   
   
   


  return (
    <div className="App">
     
      <div id="outC">
      <div id='inC'>

 


    <h1>
      Chosen Address
    </h1>
      <p>
        {connectedAddress}
      </p>


      <button
      onClick={connectMetamask}
     
      >
        connect metamask
      </button>
      <div>
  <p>
  {allAddresses[nowindex % allAddresses.length]}
  </p>
  <button onClick={last}>last</button>
  <button onClick={next}>next</button>
</div>
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
        read reviews
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
