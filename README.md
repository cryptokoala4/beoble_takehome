# Introduction

An Ether.js web3 coding challenge app built with vanilla React.js and Typescript. React/CSS frameworks and code generation libs are intentionally not used as requested.

The app can be viewed at !(http insecured)!: http://www.jackywhlee.com.s3-website-ap-southeast-1.amazonaws.com/ 

This app's core features are:
- Display connected network's basic information
- Display connected user's basic information
- Sign a message using the signMessage Ether.js api
- Search an ENS name and display its basic information

Basic coverage includes:
- Detect if Metamask is installed
- Updates UI when Metamask is connected
- Detects if user accidently hides Metamask popup window

Missing features:
- Displaying the signed message's public key
- Types may be badly managed
- Better error handling e.g. when a searched ENS name doesn't exist / null ENS Avatar
- Better state handling of Provider
- Better CSS handling (lack of CSS framework makes it time consuming)

The requirements for this coding challenge are:
- You must use React, Typescript, and Web3.js / Ethers.js (either one of two)
- Do not use any Project generation tool like CRA (Create-React-App)
- Use 3rd party libraries as less as possible
- Your product should be responsive - so that can satisfy both desktop and mobile UX.
- Write a short Readme document to explain your task.

# Running it locally
- npm install
- npm run start
- visit http://localhost:3000/

<img width="1140" alt="image" src="https://user-images.githubusercontent.com/13989105/187558784-ccadb9c4-6783-496f-9563-a81ca7c5bbbb.png">

