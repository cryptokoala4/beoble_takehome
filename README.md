# Introduction

An Ether.js web3 coding challenge app built with vanilla React.js and Typescript. React/CSS frameworks and code generation libs are intentionally not used as requested.

The app can be viewed at !(http insecured)!: http://www.jackywhlee.com.s3-website-ap-southeast-1.amazonaws.com/ 

This app's core features are:
- Display connected network's basic information
- Display connected user's basic information
- Sign a message with the user's using the signMessage Ether.js api
- Search an ENS name and display its basic information

Basic coverage includes:
- Detect if Metamask is installed
- Updates UI when Metamask is connected
- Detects if user accidently hides Metamask popup window

Missing features:
- Displaying the signed message's public key
- Types may be badly managedimage.png

The actual requirements for this coding challenge:
- You must use React, Typescript, and Web3.js / Ethers.js (either one of two)
- Do not use any Project generation tool like CRA (Create-React-App)
- Use 3rd party libraries as less as possible
- Your product should be responsive - so that can satisfy both desktop and mobile UX.
- Write a short Readme document to explain your task.

# Running it locally
- npm install
- npm run start
- visit http://localhost:3000/