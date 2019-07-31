# Web RTC Multi Peer Client and Socket.IO signalling service example

## Automatically connect and share a browsers video feed with an unlimited number of other browsers via RTC connections

### Installation Instructions

**Requires Node JS (https://nodejs.org/en/) to be installed to run the signalling server**

1. git clone https://github.com/james135/what-ya-doin.git rtc-multi-peer-demo && cd ./rtc-multi-peer-demo
2. npm install
3. npm run build
4. node index.js

This will compile the Typescript and begin serving the server on port 3000. Visit http://localhost:3000 to check it out.

## How It Works

Visiting the url with any endpoint e.g. localhost:3000/**some-random-room** creates a Socket.IO room.
Any additional connections to the same endpoint automatically sets up an RTC connection between the peers and begins sharing the video stream.

Open up a few browsers with the same endpoint and you will see multiple video feeds appear.