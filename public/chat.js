/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/socket/chat.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/socket/chat.ts":
/*!****************************!*\
  !*** ./src/socket/chat.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var signalling_1 = __webpack_require__(/*! ./signalling */ "./src/socket/signalling/index.ts");
var renderChatItem = function (from, text) {
    var container = document.getElementById('chat');
    var node = document.createElement('div');
    node.classList.add('divider');
    node.classList.add('text-center');
    node.setAttribute('data-content', from);
    container.appendChild(node);
    var textNode = document.createTextNode(text);
    container.appendChild(textNode);
};
var config = {
    'iceServers': [
        {
            'urls': [
                // Free public stun servers provided by Google
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun3.l.google.com:19302',
                'stun:stun4.l.google.com:19302',
            ]
        },
    ],
};
// Create signalling service
var signalling = new signalling_1.SignallingService(config, null);
// Attach event hooks
signalling.onPeerMaybeQuit = function (socketId) {
    var guestVideoEl = document.querySelector("#guest-" + socketId);
    if (guestVideoEl) {
        document.getElementById('videos').removeChild(guestVideoEl);
    }
};
signalling.onDataMessage = function (socketId, data) {
    console.log("Message received from " + socketId, data);
    renderChatItem(socketId, data);
};
// Connect to the signalling server
signalling.create();
var input = document.getElementById('chat-input');
var submit = document.getElementById('chat-submit');
submit.onclick = function () {
    renderChatItem('you', input.value);
    signalling.sendDataMessageToAll(input.value);
    input.value = '';
};


/***/ }),

/***/ "./src/socket/signalling/index.ts":
/*!****************************************!*\
  !*** ./src/socket/signalling/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var SignallingService = /** @class */ (function () {
    function SignallingService(rtcServerConfig, localMediaStream) {
        this.rtcServerConfig = rtcServerConfig;
        this.localMediaStream = localMediaStream;
        this.peerList = []; // List of RTC connected peers
        // RTC Connection Hooks (allow the signalling service to communicate with the implementer)
        // Fired when we receive a RTCTrackEvent from a peer
        this.onTrack = null;
        // Fired when a socket quits (note: `maybe` as RTC connection may not be established by this point)
        this.onPeerMaybeQuit = null;
        // Fired when data message received via RTC data channel
        this.onDataMessage = null;
        var path = location.pathname.split('/');
        this.roomName = path[path.length - 1] || 'general'; // Include default name 'general' if empty
    }
    /**
     * Establish Socket.IO connection
     *
     * - Register Socket.IO (signalling) listeners
     * - Register window.unload event to clean up connections and signal to peers
     */
    SignallingService.prototype.create = function () {
        var _this = this;
        this.socket = io();
        this.registerListeners(this.socket);
        window.addEventListener('unload', function () {
            // Notify other sockets
            _this.socket.emit('exit_room', _this.roomName);
            // Clean up connections
            for (var _i = 0, _a = _this.peerList; _i < _a.length; _i++) {
                var peer = _a[_i];
                peer.peerConnection.close();
            }
        });
    };
    /**
     * Send data via RTC to all connections
     *
     * @param message Message to send
     */
    SignallingService.prototype.sendDataMessageToAll = function (message) {
        for (var _i = 0, _a = this.peerList; _i < _a.length; _i++) {
            var peer = _a[_i];
            if (peer && peer.dataChannel) {
                peer.dataChannel.send(message);
            }
        }
    };
    /**
     * Send data via RTC to specific connection
     *
     * @param socketId Socket ID of peer to send data to over RTC
     * @param message Message to send
     */
    SignallingService.prototype.sendDataMessageToPeer = function (socketId, message) {
        var peer = this.peerList.find(function (peer) { return peer.guestSocketId === socketId; });
        if (peer && peer.dataChannel) {
            peer.dataChannel.send(message);
        }
    };
    /**
     * Setup Socket.IO listeners to manage the RTC Signalling process
     *
     * @param socket Global Socket.IO object
     */
    SignallingService.prototype.registerListeners = function (socket) {
        var _this = this;
        // Connected to Socket.IO server
        socket.on('connection_success', function (socketId) {
            console.log("Socket ID: [" + socketId + "]");
            // Store this sockets ID
            _this.socketId = socketId;
            // Request to join the room based on url path
            _this.socket.emit('join_request', _this.roomName);
        });
        // A guest socket has joined the room
        socket.on('fresh_face', function (data) { return __awaiter(_this, void 0, void 0, function () {
            var peerConnection, dataChannel, offer, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("A new socket has connected to '" + data.room_name + "': [" + data.socket_id + "]");
                        peerConnection = this.createRTCPeerConnection(data.socket_id);
                        dataChannel = peerConnection.createDataChannel('data_channel');
                        this.setupDataChannelListeners(dataChannel, data.socket_id);
                        return [4 /*yield*/, this.createOffer(peerConnection)];
                    case 1:
                        offer = _a.sent();
                        // Signal the offer
                        this.socket.emit('signal_offer', { from: this.socketId, to: data.socket_id, offer: offer });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        this.handleError(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // A guest socket has left the room
        socket.on('bye_friend', function (data) {
            console.log("A socket has left '" + data.room_name + "': [" + data.socket_id + "]");
            // Clean up resources
            // 1. Call custom onPeerMaybeQuit() handler
            if (typeof _this.onPeerMaybeQuit === 'function') {
                _this.onPeerMaybeQuit(data.socket_id);
            }
            // 2. Close RTC connection
            var peerIndex = _this.peerList.findIndex(function (peer) { return peer.guestSocketId === data.socket_id; });
            var peer = _this.peerList[peerIndex];
            if (peer && peer.peerConnection) {
                peer.peerConnection.close();
                // 3. Update peer list if peer is found
                _this.peerList.splice(peerIndex, 1);
            }
        });
        // Socket being sent a RTCSessionDescriptionInit as an offer
        socket.on('offer_received', function (data) { return __awaiter(_this, void 0, void 0, function () {
            var peerConnection, answer, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("Receiving an RTC offer from " + data.from);
                        peerConnection = this.createRTCPeerConnection(data.from);
                        peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
                        return [4 /*yield*/, this.createAnswer(peerConnection)];
                    case 1:
                        answer = _a.sent();
                        // Signal the answer
                        this.socket.emit('signal_answer', { from: this.socketId, to: data.from, answer: answer });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        this.handleError(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // Socket being sent as an answer
        socket.on('answer_received', function (data) { return __awaiter(_this, void 0, void 0, function () {
            var peer;
            return __generator(this, function (_a) {
                console.log("Receiving an RTC answer from " + data.from);
                peer = this.peerList.find(function (peer) { return peer.guestSocketId === data.from; });
                if (peer) {
                    // Assign the Answer
                    peer.peerConnection.setRemoteDescription(data.answer);
                }
                return [2 /*return*/];
            });
        }); });
        // Socket being sent an Ice Candidate
        socket.on('ice_received', function (data) { return __awaiter(_this, void 0, void 0, function () {
            var peer;
            return __generator(this, function (_a) {
                console.log("Receiving an Ice Candidate from " + data.from);
                peer = this.peerList.find(function (peer) { return peer.guestSocketId === data.from; });
                if (peer) {
                    // Add the candidate
                    peer.peerConnection.addIceCandidate(new RTCIceCandidate({
                        sdpMLineIndex: data.iceCandidate.label,
                        candidate: data.iceCandidate.candidate
                    }));
                }
                return [2 /*return*/];
            });
        }); });
    };
    /**
     * Create an RTCPeerConnection for a new guest
     *
     * @param guestSocketId Guest socket ID
     */
    SignallingService.prototype.createRTCPeerConnection = function (guestSocketId) {
        var _this = this;
        // Create the RTCPeerConnection
        var peerConnection = new RTCPeerConnection(this.rtcServerConfig);
        // Setup event listeners for this RTCPeerConnection instance
        peerConnection.onicecandidate = function (event) {
            if (event.candidate) {
                var candidate = {
                    label: event.candidate.sdpMLineIndex,
                    candidate: event.candidate.candidate,
                };
                // Signal the Ice Candidate
                _this.socket.emit('signal_ice', { from: _this.socketId, to: guestSocketId, iceCandidate: candidate });
            }
        };
        // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/onconnectionstatechange
        peerConnection.onconnectionstatechange = function (event) {
            console.log("Connection state with " + guestSocketId + " has changed to " + peerConnection.connectionState);
        };
        // Receiving Media Track over the RTC connection
        // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addTrack
        peerConnection.ontrack = function (event) {
            console.log("Receiving media track from " + guestSocketId, event);
            // Call custom onTrack() handler
            if (typeof _this.onTrack === 'function') {
                _this.onTrack(guestSocketId, event);
            }
        };
        // Receiving Data over the RTC data channel
        peerConnection.ondatachannel = function (event) {
            console.log("Receiving data channel from " + guestSocketId, event);
            if (event.channel) {
                _this.setupDataChannelListeners(event.channel, guestSocketId);
            }
        };
        // Add local stream to the connection (if available) so it can be shared
        if (this.localMediaStream) {
            for (var _i = 0, _a = this.localMediaStream.getTracks(); _i < _a.length; _i++) {
                var track = _a[_i];
                peerConnection.addTrack(track);
            }
        }
        // Add connection to list of peers
        this.peerList.push({ guestSocketId: guestSocketId, peerConnection: peerConnection, dataChannel: null });
        return peerConnection;
    };
    SignallingService.prototype.setupDataChannelListeners = function (dataChannel, guestSocketId) {
        var _this = this;
        // Setup Listeners
        dataChannel.onopen = function () {
            console.log("Data channel open [" + guestSocketId + "]");
        };
        dataChannel.onclose = function () {
            console.log("Data channel closed [" + guestSocketId + "]");
        };
        dataChannel.onmessage = function (event) {
            console.log("Receiving data message from " + guestSocketId, event);
            if (typeof _this.onDataMessage === 'function') {
                _this.onDataMessage(guestSocketId, event.data);
            }
        };
        // Save data channel to peer
        var peer = this.peerList.find(function (peer) { return peer.guestSocketId === guestSocketId; });
        if (peer) {
            // Assign the Answer
            peer.dataChannel = dataChannel;
        }
    };
    /**
     * Create an RTCSessionDescriptionInit (offer) and assign to local RTCPeerConnection
     *
     * @param peerConnection RTC Connection
     */
    SignallingService.prototype.createOffer = function (peerConnection) {
        return __awaiter(this, void 0, void 0, function () {
            var offer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, peerConnection.createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true })];
                    case 1:
                        offer = _a.sent();
                        peerConnection.setLocalDescription(offer);
                        return [2 /*return*/, offer];
                }
            });
        });
    };
    /**
     * Create an RTCSessionDescriptionInit (answer) and assign to local RTCPeerConnection
     *
     * @param peerConnection RTC Connection
     */
    SignallingService.prototype.createAnswer = function (peerConnection) {
        return __awaiter(this, void 0, void 0, function () {
            var answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, peerConnection.createAnswer()];
                    case 1:
                        answer = _a.sent();
                        peerConnection.setLocalDescription(answer);
                        return [2 /*return*/, answer];
                }
            });
        });
    };
    /**
     * Handle errors during the signalling process
     *
     * @param err Error
     */
    SignallingService.prototype.handleError = function (err) {
        // TODO - create error handling process
        console.log(err);
    };
    return SignallingService;
}());
exports.SignallingService = SignallingService;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NvY2tldC9jaGF0LnRzIiwid2VicGFjazovLy8uL3NyYy9zb2NrZXQvc2lnbmFsbGluZy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBLCtGQUFpRDtBQUVqRCxJQUFNLGNBQWMsR0FBRyxVQUFDLElBQVksRUFBRSxJQUFZO0lBQ2hELElBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEQsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4QyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLElBQU0sUUFBUSxHQUFH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QUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDL0M7UUFDSCxDQUFDLENBQUM7UUFDRiw0QkFBNEI7UUFDNUIsSUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBSSxJQUFJLFdBQUksQ0FBQyxhQUFhLEtBQUssYUFBYSxFQUFwQyxDQUFvQyxDQUFDLENBQUM7UUFDOUUsSUFBSSxJQUFJLEVBQUU7WUFDUixvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNXLHVDQUFXLEdBQXpCLFVBQTBCLGNBQWlDOzs7Ozs0QkFDM0MscUJBQU0sY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFDLG1CQUFtQixFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUMsQ0FBQzs7d0JBQWhHLEtBQUssR0FBRyxTQUF3Rjt3QkFDdEcsY0FBYyxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDO3dCQUMxQyxzQkFBTyxLQUFLLEVBQUM7Ozs7S0FDZDtJQUVEOzs7O09BSUc7SUFDVyx3Q0FBWSxHQUExQixVQUEyQixjQUFpQzs7Ozs7NEJBQzNDLHFCQUFNLGNBQWMsQ0FBQyxZQUFZLEVBQUU7O3dCQUE1QyxNQUFNLEdBQUcsU0FBbUM7d0JBQ2xELGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDM0Msc0JBQU8sTUFBTSxFQUFDOzs7O0tBQ2Y7SUFFRDs7OztPQUlHO0lBQ0ssdUNBQVcsR0FBbkIsVUFBb0IsR0FBUTtRQUMxQix1Q0FBdUM7UUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBQ0gsd0JBQUM7QUFBRCxDQUFDO0FBL1FZLDhDQUFpQiIsImZpbGUiOiJjaGF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NvY2tldC9jaGF0LnRzXCIpO1xuIiwiaW1wb3J0IHsgU2lnbmFsbGluZ1NlcnZpY2UgfSBmcm9tICcuL3NpZ25hbGxpbmcnO1xuXG5jb25zdCByZW5kZXJDaGF0SXRlbSA9IChmcm9tOiBzdHJpbmcsIHRleHQ6IHN0cmluZykgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhdCcpO1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG5vZGUuY2xhc3NMaXN0LmFkZCgnZGl2aWRlcicpO1xuICBub2RlLmNsYXNzTGlzdC5hZGQoJ3RleHQtY2VudGVyJyk7XG4gIG5vZGUuc2V0QXR0cmlidXRlKCdkYXRhLWNvbnRlbnQnLCBmcm9tKTtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vZGUpO1xuICBjb25zdCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xufVxuXG5jb25zdCBjb25maWc6IFJUQ0NvbmZpZ3VyYXRpb24gPSB7XG4gICdpY2VTZXJ2ZXJzJzogW1xuICAgIHtcbiAgICAgICd1cmxzJzogW1xuICAgICAgICAvLyBGcmVlIHB1YmxpYyBzdHVuIHNlcnZlcnMgcHJvdmlkZWQgYnkgR29vZ2xlXG4gICAgICAgICdzdHVuOnN0dW4ubC5nb29nbGUuY29tOjE5MzAyJyxcbiAgICAgICAgJ3N0dW46c3R1bjEubC5nb29nbGUuY29tOjE5MzAyJyxcbiAgICAgICAgJ3N0dW46c3R1bjIubC5nb29nbGUuY29tOjE5MzAyJyxcbiAgICAgICAgJ3N0dW46c3R1bjMubC5nb29nbGUuY29tOjE5MzAyJyxcbiAgICAgICAgJ3N0dW46c3R1bjQubC5nb29nbGUuY29tOjE5MzAyJyxcbiAgICAgICAgLy8gVE9ETyAtIGFkZCB0dXJuIHNlcnZlcnNcbiAgICAgIF1cbiAgICB9LFxuICBdLFxufTtcbi8vIENyZWF0ZSBzaWduYWxsaW5nIHNlcnZpY2VcbmNvbnN0IHNpZ25hbGxpbmcgPSBuZXcgU2lnbmFsbGluZ1NlcnZpY2UoY29uZmlnLCBudWxsKTtcbi8vIEF0dGFjaCBldmVudCBob29rc1xuc2lnbmFsbGluZy5vblBlZXJNYXliZVF1aXQgPSAoc29ja2V0SWQ6IHN0cmluZykgPT4ge1xuICBjb25zdCBndWVzdFZpZGVvRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZ3Vlc3QtJHtzb2NrZXRJZH1gKSBhcyBIVE1MVmlkZW9FbGVtZW50O1xuICBpZiAoZ3Vlc3RWaWRlb0VsKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvcycpLnJlbW92ZUNoaWxkKGd1ZXN0VmlkZW9FbCk7XG4gIH1cbn1cbnNpZ25hbGxpbmcub25EYXRhTWVzc2FnZSA9IChzb2NrZXRJZDogc3RyaW5nLCBkYXRhOiBzdHJpbmcpID0+IHtcbiAgY29uc29sZS5sb2coYE1lc3NhZ2UgcmVjZWl2ZWQgZnJvbSAke3NvY2tldElkfWAsIGRhdGEpO1xuICByZW5kZXJDaGF0SXRlbShzb2NrZXRJZCwgZGF0YSk7XG59XG4vLyBDb25uZWN0IHRvIHRoZSBzaWduYWxsaW5nIHNlcnZlclxuc2lnbmFsbGluZy5jcmVhdGUoKTtcblxuY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhdC1pbnB1dCcpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5jb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hhdC1zdWJtaXQnKTtcblxuc3VibWl0Lm9uY2xpY2sgPSAoKSA9PiB7XG4gIHJlbmRlckNoYXRJdGVtKCd5b3UnLCBpbnB1dC52YWx1ZSk7XG4gIHNpZ25hbGxpbmcuc2VuZERhdGFNZXNzYWdlVG9BbGwoaW5wdXQudmFsdWUpO1xuICBpbnB1dC52YWx1ZSA9ICcnO1xufSIsImRlY2xhcmUgY29uc3QgaW87IC8vIEdsb2JhbCBTb2NrZXQuSU8gb2JqZWN0XG5cbmludGVyZmFjZSBHdWVzdENvbm5lY3Rpb24ge1xuICBndWVzdFNvY2tldElkOiBzdHJpbmcsIC8vIElEIG9mIHBlZXJzIHNvY2tldCBjb25uZWN0aW9uXG4gIHBlZXJDb25uZWN0aW9uOiBSVENQZWVyQ29ubmVjdGlvbiwgLy8gTG9jYWwgUlRDIGNvbm5lY3Rpb24gZm9yIHRoaXMgcGVlclxuICBkYXRhQ2hhbm5lbDogUlRDRGF0YUNoYW5uZWwsIC8vIERhdGEgY2hhbm5lbCBjb25uZWN0aW9uXG59XG5cbmV4cG9ydCBjbGFzcyBTaWduYWxsaW5nU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBzb2NrZXQ6IGFueTsgIC8vIFNvY2tldC5JT1xuICBwcml2YXRlIHNvY2tldElkOiBzdHJpbmc7IC8vIElEIG9mIHRoaXMgYnJvd3NlcnMgc29ja2V0IGNvbm5lY3Rpb25cbiAgcHJpdmF0ZSBwZWVyTGlzdDogR3Vlc3RDb25uZWN0aW9uW10gPSBbXTsgLy8gTGlzdCBvZiBSVEMgY29ubmVjdGVkIHBlZXJzXG4gIHByaXZhdGUgcm9vbU5hbWU6IHN0cmluZzsgLy8gUm9vbSBuYW1lIGlkZW50aWZpZWQgYnkgbGFzdCBwYXJ0IG9mIHVybCBwYXRoXG5cbiAgLy8gUlRDIENvbm5lY3Rpb24gSG9va3MgKGFsbG93IHRoZSBzaWduYWxsaW5nIHNlcnZpY2UgdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgaW1wbGVtZW50ZXIpXG5cbiAgLy8gRmlyZWQgd2hlbiB3ZSByZWNlaXZlIGEgUlRDVHJhY2tFdmVudCBmcm9tIGEgcGVlclxuICBwdWJsaWMgb25UcmFjazogKHBlZXJJZDogc3RyaW5nLCB0cmFjazogUlRDVHJhY2tFdmVudCkgPT4gdm9pZCA9IG51bGw7XG4gIC8vIEZpcmVkIHdoZW4gYSBzb2NrZXQgcXVpdHMgKG5vdGU6IGBtYXliZWAgYXMgUlRDIGNvbm5lY3Rpb24gbWF5IG5vdCBiZSBlc3RhYmxpc2hlZCBieSB0aGlzIHBvaW50KVxuICBwdWJsaWMgb25QZWVyTWF5YmVRdWl0OiAocGVlcklkOiBzdHJpbmcpID0+IHZvaWQgPSBudWxsO1xuICAvLyBGaXJlZCB3aGVuIGRhdGEgbWVzc2FnZSByZWNlaXZlZCB2aWEgUlRDIGRhdGEgY2hhbm5lbFxuICBwdWJsaWMgb25EYXRhTWVzc2FnZTogKHBlZXJJZDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcnRjU2VydmVyQ29uZmlnOiBSVENDb25maWd1cmF0aW9uLFxuICAgIHByaXZhdGUgbG9jYWxNZWRpYVN0cmVhbTogTWVkaWFTdHJlYW0sXG4gICkge1xuICAgIGNvbnN0IHBhdGggPSBsb2NhdGlvbi5wYXRobmFtZS5zcGxpdCgnLycpO1xuICAgIHRoaXMucm9vbU5hbWUgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV0gfHwgJ2dlbmVyYWwnOyAvLyBJbmNsdWRlIGRlZmF1bHQgbmFtZSAnZ2VuZXJhbCcgaWYgZW1wdHlcbiAgfVxuXG4gIC8qKlxuICAgKiBFc3RhYmxpc2ggU29ja2V0LklPIGNvbm5lY3Rpb25cbiAgICpcbiAgICogLSBSZWdpc3RlciBTb2NrZXQuSU8gKHNpZ25hbGxpbmcpIGxpc3RlbmVyc1xuICAgKiAtIFJlZ2lzdGVyIHdpbmRvdy51bmxvYWQgZXZlbnQgdG8gY2xlYW4gdXAgY29ubmVjdGlvbnMgYW5kIHNpZ25hbCB0byBwZWVyc1xuICAgKi9cbiAgY3JlYXRlKCkge1xuICAgIHRoaXMuc29ja2V0ID0gaW8oKTtcbiAgICB0aGlzLnJlZ2lzdGVyTGlzdGVuZXJzKHRoaXMuc29ja2V0KTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndW5sb2FkJywgKCkgPT4ge1xuICAgICAgLy8gTm90aWZ5IG90aGVyIHNvY2tldHNcbiAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2V4aXRfcm9vbScsIHRoaXMucm9vbU5hbWUpO1xuICAgICAgLy8gQ2xlYW4gdXAgY29ubmVjdGlvbnNcbiAgICAgIGZvciAoY29uc3QgcGVlciBvZiB0aGlzLnBlZXJMaXN0KSB7XG4gICAgICAgIHBlZXIucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGRhdGEgdmlhIFJUQyB0byBhbGwgY29ubmVjdGlvbnNcbiAgICpcbiAgICogQHBhcmFtIG1lc3NhZ2UgTWVzc2FnZSB0byBzZW5kXG4gICAqL1xuICBzZW5kRGF0YU1lc3NhZ2VUb0FsbChtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBmb3IgKGNvbnN0IHBlZXIgb2YgdGhpcy5wZWVyTGlzdCkge1xuICAgICAgaWYgKHBlZXIgJiYgcGVlci5kYXRhQ2hhbm5lbCkge1xuICAgICAgICBwZWVyLmRhdGFDaGFubmVsLnNlbmQobWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNlbmQgZGF0YSB2aWEgUlRDIHRvIHNwZWNpZmljIGNvbm5lY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHNvY2tldElkIFNvY2tldCBJRCBvZiBwZWVyIHRvIHNlbmQgZGF0YSB0byBvdmVyIFJUQ1xuICAgKiBAcGFyYW0gbWVzc2FnZSBNZXNzYWdlIHRvIHNlbmRcbiAgICovXG4gIHNlbmREYXRhTWVzc2FnZVRvUGVlcihzb2NrZXRJZDogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBjb25zdCBwZWVyID0gdGhpcy5wZWVyTGlzdC5maW5kKHBlZXIgPT4gcGVlci5ndWVzdFNvY2tldElkID09PSBzb2NrZXRJZCk7XG4gICAgaWYgKHBlZXIgJiYgcGVlci5kYXRhQ2hhbm5lbCkge1xuICAgICAgcGVlci5kYXRhQ2hhbm5lbC5zZW5kKG1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXR1cCBTb2NrZXQuSU8gbGlzdGVuZXJzIHRvIG1hbmFnZSB0aGUgUlRDIFNpZ25hbGxpbmcgcHJvY2Vzc1xuICAgKlxuICAgKiBAcGFyYW0gc29ja2V0IEdsb2JhbCBTb2NrZXQuSU8gb2JqZWN0XG4gICAqL1xuICBwcml2YXRlIHJlZ2lzdGVyTGlzdGVuZXJzKHNvY2tldDogYW55KSB7XG5cbiAgICAvLyBDb25uZWN0ZWQgdG8gU29ja2V0LklPIHNlcnZlclxuICAgIHNvY2tldC5vbignY29ubmVjdGlvbl9zdWNjZXNzJywgKHNvY2tldElkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBTb2NrZXQgSUQ6IFske3NvY2tldElkfV1gKTtcbiAgICAgIC8vIFN0b3JlIHRoaXMgc29ja2V0cyBJRFxuICAgICAgdGhpcy5zb2NrZXRJZCA9IHNvY2tldElkO1xuICAgICAgLy8gUmVxdWVzdCB0byBqb2luIHRoZSByb29tIGJhc2VkIG9uIHVybCBwYXRoXG4gICAgICB0aGlzLnNvY2tldC5lbWl0KCdqb2luX3JlcXVlc3QnLCB0aGlzLnJvb21OYW1lKTtcbiAgICB9KTtcblxuICAgIC8vIEEgZ3Vlc3Qgc29ja2V0IGhhcyBqb2luZWQgdGhlIHJvb21cbiAgICBzb2NrZXQub24oJ2ZyZXNoX2ZhY2UnLCBhc3luYyAoZGF0YToge3NvY2tldF9pZDogc3RyaW5nLCByb29tX25hbWU6IHN0cmluZ30pID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBBIG5ldyBzb2NrZXQgaGFzIGNvbm5lY3RlZCB0byAnJHtkYXRhLnJvb21fbmFtZX0nOiBbJHtkYXRhLnNvY2tldF9pZH1dYCk7XG4gICAgICAgIC8vIFNldHVwIGEgbmV3IFJUQyBDb25uZWN0aW9uIHdpdGggdGhpcyBzb2NrZXRcbiAgICAgICAgY29uc3QgcGVlckNvbm5lY3Rpb24gPSB0aGlzLmNyZWF0ZVJUQ1BlZXJDb25uZWN0aW9uKGRhdGEuc29ja2V0X2lkKTtcbiAgICAgICAgLy8gU2V0dXAgZGF0YSBjb25uZWN0aW9uXG4gICAgICAgIGNvbnN0IGRhdGFDaGFubmVsID0gcGVlckNvbm5lY3Rpb24uY3JlYXRlRGF0YUNoYW5uZWwoJ2RhdGFfY2hhbm5lbCcpO1xuICAgICAgICB0aGlzLnNldHVwRGF0YUNoYW5uZWxMaXN0ZW5lcnMoZGF0YUNoYW5uZWwsIGRhdGEuc29ja2V0X2lkKTtcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBvZmZlclxuICAgICAgICBjb25zdCBvZmZlciA9IGF3YWl0IHRoaXMuY3JlYXRlT2ZmZXIocGVlckNvbm5lY3Rpb24pO1xuICAgICAgICAvLyBTaWduYWwgdGhlIG9mZmVyXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3NpZ25hbF9vZmZlcicsIHtmcm9tOiB0aGlzLnNvY2tldElkLCB0bzogZGF0YS5zb2NrZXRfaWQsIG9mZmVyfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQSBndWVzdCBzb2NrZXQgaGFzIGxlZnQgdGhlIHJvb21cbiAgICBzb2NrZXQub24oJ2J5ZV9mcmllbmQnLCAoZGF0YToge3NvY2tldF9pZDogc3RyaW5nLCByb29tX25hbWU6IHN0cmluZ30pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBBIHNvY2tldCBoYXMgbGVmdCAnJHtkYXRhLnJvb21fbmFtZX0nOiBbJHtkYXRhLnNvY2tldF9pZH1dYCk7XG4gICAgICAvLyBDbGVhbiB1cCByZXNvdXJjZXNcbiAgICAgIC8vIDEuIENhbGwgY3VzdG9tIG9uUGVlck1heWJlUXVpdCgpIGhhbmRsZXJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vblBlZXJNYXliZVF1aXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5vblBlZXJNYXliZVF1aXQoZGF0YS5zb2NrZXRfaWQpO1xuICAgICAgfVxuICAgICAgLy8gMi4gQ2xvc2UgUlRDIGNvbm5lY3Rpb25cbiAgICAgIGNvbnN0IHBlZXJJbmRleCA9IHRoaXMucGVlckxpc3QuZmluZEluZGV4KHBlZXIgPT4gcGVlci5ndWVzdFNvY2tldElkID09PSBkYXRhLnNvY2tldF9pZCk7XG4gICAgICBjb25zdCBwZWVyID0gdGhpcy5wZWVyTGlzdFtwZWVySW5kZXhdO1xuICAgICAgaWYgKHBlZXIgJiYgcGVlci5wZWVyQ29ubmVjdGlvbikge1xuICAgICAgICBwZWVyLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgIC8vIDMuIFVwZGF0ZSBwZWVyIGxpc3QgaWYgcGVlciBpcyBmb3VuZFxuICAgICAgICB0aGlzLnBlZXJMaXN0LnNwbGljZShwZWVySW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU29ja2V0IGJlaW5nIHNlbnQgYSBSVENTZXNzaW9uRGVzY3JpcHRpb25Jbml0IGFzIGFuIG9mZmVyXG4gICAgc29ja2V0Lm9uKCdvZmZlcl9yZWNlaXZlZCcsIGFzeW5jIChkYXRhOiB7ZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nLCBvZmZlcjogUlRDU2Vzc2lvbkRlc2NyaXB0aW9uSW5pdH0pID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZpbmcgYW4gUlRDIG9mZmVyIGZyb20gJHtkYXRhLmZyb219YCk7XG4gICAgICAgIC8vIFNldHVwIGEgbmV3IFJUQyBDb25uZWN0aW9uIHdpdGggdGhpcyBzb2NrZXRcbiAgICAgICAgY29uc3QgcGVlckNvbm5lY3Rpb24gPSB0aGlzLmNyZWF0ZVJUQ1BlZXJDb25uZWN0aW9uKGRhdGEuZnJvbSk7XG4gICAgICAgIHBlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oZGF0YS5vZmZlcikpO1xuICAgICAgICBjb25zdCBhbnN3ZXIgPSBhd2FpdCB0aGlzLmNyZWF0ZUFuc3dlcihwZWVyQ29ubmVjdGlvbik7XG4gICAgICAgIC8vIFNpZ25hbCB0aGUgYW5zd2VyXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3NpZ25hbF9hbnN3ZXInLCB7ZnJvbTogdGhpcy5zb2NrZXRJZCwgdG86IGRhdGEuZnJvbSwgYW5zd2VyfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU29ja2V0IGJlaW5nIHNlbnQgYXMgYW4gYW5zd2VyXG4gICAgc29ja2V0Lm9uKCdhbnN3ZXJfcmVjZWl2ZWQnLCBhc3luYyAoZGF0YToge2Zyb206IHN0cmluZywgdG86IHN0cmluZywgYW5zd2VyOiBSVENTZXNzaW9uRGVzY3JpcHRpb25Jbml0fSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFJlY2VpdmluZyBhbiBSVEMgYW5zd2VyIGZyb20gJHtkYXRhLmZyb219YCk7XG4gICAgICAvLyBGaW5kIHRoZSBsb2NhbCBSVEMgY29ubmVjdGlvbiBmb3IgdGhpcyBwYXJ0aWN1bGFyIGd1ZXN0XG4gICAgICBjb25zdCBwZWVyID0gdGhpcy5wZWVyTGlzdC5maW5kKHBlZXIgPT4gcGVlci5ndWVzdFNvY2tldElkID09PSBkYXRhLmZyb20pO1xuICAgICAgaWYgKHBlZXIpIHtcbiAgICAgICAgLy8gQXNzaWduIHRoZSBBbnN3ZXJcbiAgICAgICAgcGVlci5wZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihkYXRhLmFuc3dlcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTb2NrZXQgYmVpbmcgc2VudCBhbiBJY2UgQ2FuZGlkYXRlXG4gICAgc29ja2V0Lm9uKCdpY2VfcmVjZWl2ZWQnLCBhc3luYyAoZGF0YToge2Zyb206IHN0cmluZywgdG86IHN0cmluZywgaWNlQ2FuZGlkYXRlOiB7bGFiZWw6IG51bWJlciwgY2FuZGlkYXRlOiBzdHJpbmd9fSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFJlY2VpdmluZyBhbiBJY2UgQ2FuZGlkYXRlIGZyb20gJHtkYXRhLmZyb219YCk7XG4gICAgICAvLyBGaW5kIHRoZSBsb2NhbCBSVEMgY29ubmVjdGlvbiBmb3IgdGhpcyBwYXJ0aWN1bGFyIGd1ZXN0XG4gICAgICBjb25zdCBwZWVyID0gdGhpcy5wZWVyTGlzdC5maW5kKHBlZXIgPT4gcGVlci5ndWVzdFNvY2tldElkID09PSBkYXRhLmZyb20pO1xuICAgICAgaWYgKHBlZXIpIHtcbiAgICAgICAgLy8gQWRkIHRoZSBjYW5kaWRhdGVcbiAgICAgICAgcGVlci5wZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZSh7XG4gICAgICAgICAgc2RwTUxpbmVJbmRleDogZGF0YS5pY2VDYW5kaWRhdGUubGFiZWwsXG4gICAgICAgICAgY2FuZGlkYXRlOiBkYXRhLmljZUNhbmRpZGF0ZS5jYW5kaWRhdGVcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBSVENQZWVyQ29ubmVjdGlvbiBmb3IgYSBuZXcgZ3Vlc3RcbiAgICpcbiAgICogQHBhcmFtIGd1ZXN0U29ja2V0SWQgR3Vlc3Qgc29ja2V0IElEXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZVJUQ1BlZXJDb25uZWN0aW9uKGd1ZXN0U29ja2V0SWQ6IHN0cmluZykge1xuICAgIC8vIENyZWF0ZSB0aGUgUlRDUGVlckNvbm5lY3Rpb25cbiAgICBjb25zdCBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbih0aGlzLnJ0Y1NlcnZlckNvbmZpZyk7XG4gICAgLy8gU2V0dXAgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGlzIFJUQ1BlZXJDb25uZWN0aW9uIGluc3RhbmNlXG4gICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQuY2FuZGlkYXRlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHtcbiAgICAgICAgICBsYWJlbDogZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgY2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlLFxuICAgICAgICB9O1xuICAgICAgICAvLyBTaWduYWwgdGhlIEljZSBDYW5kaWRhdGVcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnc2lnbmFsX2ljZScsIHtmcm9tOiB0aGlzLnNvY2tldElkLCB0bzogZ3Vlc3RTb2NrZXRJZCwgaWNlQ2FuZGlkYXRlOiBjYW5kaWRhdGV9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUlRDUGVlckNvbm5lY3Rpb24vb25jb25uZWN0aW9uc3RhdGVjaGFuZ2VcbiAgICBwZWVyQ29ubmVjdGlvbi5vbmNvbm5lY3Rpb25zdGF0ZWNoYW5nZSA9IGV2ZW50ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBDb25uZWN0aW9uIHN0YXRlIHdpdGggJHtndWVzdFNvY2tldElkfSBoYXMgY2hhbmdlZCB0byAke3BlZXJDb25uZWN0aW9uLmNvbm5lY3Rpb25TdGF0ZX1gKTtcbiAgICB9XG5cbiAgICAvLyBSZWNlaXZpbmcgTWVkaWEgVHJhY2sgb3ZlciB0aGUgUlRDIGNvbm5lY3Rpb25cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUlRDUGVlckNvbm5lY3Rpb24vYWRkVHJhY2tcbiAgICBwZWVyQ29ubmVjdGlvbi5vbnRyYWNrID0gZXZlbnQgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFJlY2VpdmluZyBtZWRpYSB0cmFjayBmcm9tICR7Z3Vlc3RTb2NrZXRJZH1gLCBldmVudCk7XG4gICAgICAvLyBDYWxsIGN1c3RvbSBvblRyYWNrKCkgaGFuZGxlclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLm9uVHJhY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5vblRyYWNrKGd1ZXN0U29ja2V0SWQsIGV2ZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZWNlaXZpbmcgRGF0YSBvdmVyIHRoZSBSVEMgZGF0YSBjaGFubmVsXG4gICAgcGVlckNvbm5lY3Rpb24ub25kYXRhY2hhbm5lbCA9IChldmVudCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFJlY2VpdmluZyBkYXRhIGNoYW5uZWwgZnJvbSAke2d1ZXN0U29ja2V0SWR9YCwgZXZlbnQpO1xuICAgICAgaWYgKGV2ZW50LmNoYW5uZWwpIHtcbiAgICAgICAgdGhpcy5zZXR1cERhdGFDaGFubmVsTGlzdGVuZXJzKGV2ZW50LmNoYW5uZWwsIGd1ZXN0U29ja2V0SWQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBBZGQgbG9jYWwgc3RyZWFtIHRvIHRoZSBjb25uZWN0aW9uIChpZiBhdmFpbGFibGUpIHNvIGl0IGNhbiBiZSBzaGFyZWRcbiAgICBpZiAodGhpcy5sb2NhbE1lZGlhU3RyZWFtKSB7XG4gICAgICBmb3IgKGNvbnN0IHRyYWNrIG9mIHRoaXMubG9jYWxNZWRpYVN0cmVhbS5nZXRUcmFja3MoKSkge1xuICAgICAgICBwZWVyQ29ubmVjdGlvbi5hZGRUcmFjayh0cmFjayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGNvbm5lY3Rpb24gdG8gbGlzdCBvZiBwZWVyc1xuICAgIHRoaXMucGVlckxpc3QucHVzaCh7Z3Vlc3RTb2NrZXRJZCwgcGVlckNvbm5lY3Rpb24sIGRhdGFDaGFubmVsOiBudWxsfSk7XG5cbiAgICByZXR1cm4gcGVlckNvbm5lY3Rpb247XG4gIH1cblxuICBwcml2YXRlIHNldHVwRGF0YUNoYW5uZWxMaXN0ZW5lcnMoZGF0YUNoYW5uZWw6IFJUQ0RhdGFDaGFubmVsLCBndWVzdFNvY2tldElkOiBzdHJpbmcpIHtcbiAgICAvLyBTZXR1cCBMaXN0ZW5lcnNcbiAgICBkYXRhQ2hhbm5lbC5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgRGF0YSBjaGFubmVsIG9wZW4gWyR7Z3Vlc3RTb2NrZXRJZH1dYCk7XG4gICAgfTtcbiAgICBkYXRhQ2hhbm5lbC5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYERhdGEgY2hhbm5lbCBjbG9zZWQgWyR7Z3Vlc3RTb2NrZXRJZH1dYCk7XG4gICAgfTtcbiAgICBkYXRhQ2hhbm5lbC5vbm1lc3NhZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZpbmcgZGF0YSBtZXNzYWdlIGZyb20gJHtndWVzdFNvY2tldElkfWAsIGV2ZW50KTtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vbkRhdGFNZXNzYWdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMub25EYXRhTWVzc2FnZShndWVzdFNvY2tldElkLCBldmVudC5kYXRhKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIC8vIFNhdmUgZGF0YSBjaGFubmVsIHRvIHBlZXJcbiAgICBjb25zdCBwZWVyID0gdGhpcy5wZWVyTGlzdC5maW5kKHBlZXIgPT4gcGVlci5ndWVzdFNvY2tldElkID09PSBndWVzdFNvY2tldElkKTtcbiAgICBpZiAocGVlcikge1xuICAgICAgLy8gQXNzaWduIHRoZSBBbnN3ZXJcbiAgICAgIHBlZXIuZGF0YUNoYW5uZWwgPSBkYXRhQ2hhbm5lbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIFJUQ1Nlc3Npb25EZXNjcmlwdGlvbkluaXQgKG9mZmVyKSBhbmQgYXNzaWduIHRvIGxvY2FsIFJUQ1BlZXJDb25uZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSBwZWVyQ29ubmVjdGlvbiBSVEMgQ29ubmVjdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVPZmZlcihwZWVyQ29ubmVjdGlvbjogUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICBjb25zdCBvZmZlciA9IGF3YWl0IHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKHtvZmZlclRvUmVjZWl2ZVZpZGVvOiB0cnVlLCBvZmZlclRvUmVjZWl2ZUF1ZGlvOiB0cnVlfSk7XG4gICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihvZmZlcik7XG4gICAgcmV0dXJuIG9mZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBSVENTZXNzaW9uRGVzY3JpcHRpb25Jbml0IChhbnN3ZXIpIGFuZCBhc3NpZ24gdG8gbG9jYWwgUlRDUGVlckNvbm5lY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHBlZXJDb25uZWN0aW9uIFJUQyBDb25uZWN0aW9uXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGNyZWF0ZUFuc3dlcihwZWVyQ29ubmVjdGlvbjogUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICBjb25zdCBhbnN3ZXIgPSBhd2FpdCBwZWVyQ29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoKTtcbiAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKGFuc3dlcik7XG4gICAgcmV0dXJuIGFuc3dlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgZXJyb3JzIGR1cmluZyB0aGUgc2lnbmFsbGluZyBwcm9jZXNzXG4gICAqXG4gICAqIEBwYXJhbSBlcnIgRXJyb3JcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyOiBhbnkpIHtcbiAgICAvLyBUT0RPIC0gY3JlYXRlIGVycm9yIGhhbmRsaW5nIHByb2Nlc3NcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==