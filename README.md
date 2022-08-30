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
- Types may be badly managed

# Running it locally
- npm install
- npm run start
- visit http://localhost:3000/