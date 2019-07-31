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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/socket/video.ts");
/******/ })
/************************************************************************/
/******/ ({

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


/***/ }),

/***/ "./src/socket/video.ts":
/*!*****************************!*\
  !*** ./src/socket/video.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var signalling_1 = __webpack_require__(/*! ./signalling */ "./src/socket/signalling/index.ts");
/**
 * Get Media for this browser i.e. access Webcam and Microphone
 *
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints
 * @param constraints MediaStreamConstraints
 */
var getUserMedia = function (constraints) {
    if (navigator.mediaDevices === undefined) {
        return Promise.reject(new Error('navigator.mediaDevices is unavailable'));
    }
    return navigator.mediaDevices.getUserMedia(constraints);
};
/**
 * Create a <video></video> element for the guest
 *
 * @param guestId Guest socket ID assigned as elements id=""
 */
var insertVideoElement = function (guestId) {
    var video = document.createElement('video');
    video.id = "guest-" + guestId;
    video.autoplay = true;
    document.getElementById('videos').appendChild(video);
    return video;
};
// Assign browsers media stream to <video></video> element
var setLocalMediaStream = function (stream) {
    var localVideoEl = document.getElementById('localVideo');
    localVideoEl.srcObject = stream;
    return stream;
};
// Get local media stream and setup the signalling service if successful
getUserMedia({ audio: false, video: true })
    .then(setLocalMediaStream)
    .then(function (stream) {
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCIceServer#Example
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
    var signalling = new signalling_1.SignallingService(config, stream);
    // Attach event hooks
    signalling.onPeerMaybeQuit = function (socketId) {
        var guestVideoEl = document.querySelector("#guest-" + socketId);
        if (guestVideoEl) {
            document.getElementById('videos').removeChild(guestVideoEl);
        }
    };
    signalling.onTrack = function (socketId, event) {
        var guestVideoEl = (document.querySelector("#guest-" + socketId) || insertVideoElement(socketId));
        if (event.streams && event.streams[0]) {
            guestVideoEl.srcObject = event.streams[0];
        }
        else {
            var inboundStream = new MediaStream([event.track]);
            guestVideoEl.srcObject = inboundStream;
        }
    };
    // Connect to the signalling server
    signalling.create();
})["catch"](function (err) {
    console.log(err);
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NvY2tldC9zaWduYWxsaW5nL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zb2NrZXQvdmlkZW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0RBO0lBZ0JFLDJCQUNVLGVBQWlDLEVBQ2pDLGdCQUE2QjtRQUQ3QixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7UUFDakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFhO1FBZC9CLGFBQVEsR0FBc0IsRUFBRSxDQUFDLENBQUMsOEJBQThCO1FBR3hFLDBGQUEwRjtRQUUxRixvREFBb0Q7UUFDN0MsWUFBTyxHQUFtRCxJQUFJLENBQUM7UUFDdEUsbUdBQW1HO1FBQzVGLG9CQUFlLEdBQTZCLElBQUksQ0FBQztRQUN4RCx3REFBd0Q7UUFDakQsa0JBQWEsR0FBOEMsSUFBSSxDQUFDO1FBTXJFLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElB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QyxDQUFDLENBQUMsRUFBRTtZQUNyQyxZQUFZLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0M7YUFBTTtZQUNMLElBQUksYUFBYSxHQUFHLElBQUksV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbkQsWUFBWSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7U0FDeEM7SUFDSCxDQUFDO0lBQ0QsbUNBQW1DO0lBQ25DLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN0QixDQUFDLENBQUMsQ0FDRCxPQUFLLEVBQUMsVUFBQyxHQUFRO0lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuQixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJ2aWRlby5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zb2NrZXQvdmlkZW8udHNcIik7XG4iLCJkZWNsYXJlIGNvbnN0IGlvOyAvLyBHbG9iYWwgU29ja2V0LklPIG9iamVjdFxuXG5pbnRlcmZhY2UgR3Vlc3RDb25uZWN0aW9uIHtcbiAgZ3Vlc3RTb2NrZXRJZDogc3RyaW5nLCAvLyBJRCBvZiBwZWVycyBzb2NrZXQgY29ubmVjdGlvblxuICBwZWVyQ29ubmVjdGlvbjogUlRDUGVlckNvbm5lY3Rpb24sIC8vIExvY2FsIFJUQyBjb25uZWN0aW9uIGZvciB0aGlzIHBlZXJcbiAgZGF0YUNoYW5uZWw6IFJUQ0RhdGFDaGFubmVsLCAvLyBEYXRhIGNoYW5uZWwgY29ubmVjdGlvblxufVxuXG5leHBvcnQgY2xhc3MgU2lnbmFsbGluZ1NlcnZpY2Uge1xuXG4gIHByaXZhdGUgc29ja2V0OiBhbnk7ICAvLyBTb2NrZXQuSU9cbiAgcHJpdmF0ZSBzb2NrZXRJZDogc3RyaW5nOyAvLyBJRCBvZiB0aGlzIGJyb3dzZXJzIHNvY2tldCBjb25uZWN0aW9uXG4gIHByaXZhdGUgcGVlckxpc3Q6IEd1ZXN0Q29ubmVjdGlvbltdID0gW107IC8vIExpc3Qgb2YgUlRDIGNvbm5lY3RlZCBwZWVyc1xuICBwcml2YXRlIHJvb21OYW1lOiBzdHJpbmc7IC8vIFJvb20gbmFtZSBpZGVudGlmaWVkIGJ5IGxhc3QgcGFydCBvZiB1cmwgcGF0aFxuXG4gIC8vIFJUQyBDb25uZWN0aW9uIEhvb2tzIChhbGxvdyB0aGUgc2lnbmFsbGluZyBzZXJ2aWNlIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIGltcGxlbWVudGVyKVxuXG4gIC8vIEZpcmVkIHdoZW4gd2UgcmVjZWl2ZSBhIFJUQ1RyYWNrRXZlbnQgZnJvbSBhIHBlZXJcbiAgcHVibGljIG9uVHJhY2s6IChwZWVySWQ6IHN0cmluZywgdHJhY2s6IFJUQ1RyYWNrRXZlbnQpID0+IHZvaWQgPSBudWxsO1xuICAvLyBGaXJlZCB3aGVuIGEgc29ja2V0IHF1aXRzIChub3RlOiBgbWF5YmVgIGFzIFJUQyBjb25uZWN0aW9uIG1heSBub3QgYmUgZXN0YWJsaXNoZWQgYnkgdGhpcyBwb2ludClcbiAgcHVibGljIG9uUGVlck1heWJlUXVpdDogKHBlZXJJZDogc3RyaW5nKSA9PiB2b2lkID0gbnVsbDtcbiAgLy8gRmlyZWQgd2hlbiBkYXRhIG1lc3NhZ2UgcmVjZWl2ZWQgdmlhIFJUQyBkYXRhIGNoYW5uZWxcbiAgcHVibGljIG9uRGF0YU1lc3NhZ2U6IChwZWVySWQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJ0Y1NlcnZlckNvbmZpZzogUlRDQ29uZmlndXJhdGlvbixcbiAgICBwcml2YXRlIGxvY2FsTWVkaWFTdHJlYW06IE1lZGlhU3RyZWFtLFxuICApIHtcbiAgICBjb25zdCBwYXRoID0gbG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKTtcbiAgICB0aGlzLnJvb21OYW1lID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdIHx8ICdnZW5lcmFsJzsgLy8gSW5jbHVkZSBkZWZhdWx0IG5hbWUgJ2dlbmVyYWwnIGlmIGVtcHR5XG4gIH1cblxuICAvKipcbiAgICogRXN0YWJsaXNoIFNvY2tldC5JTyBjb25uZWN0aW9uXG4gICAqXG4gICAqIC0gUmVnaXN0ZXIgU29ja2V0LklPIChzaWduYWxsaW5nKSBsaXN0ZW5lcnNcbiAgICogLSBSZWdpc3RlciB3aW5kb3cudW5sb2FkIGV2ZW50IHRvIGNsZWFuIHVwIGNvbm5lY3Rpb25zIGFuZCBzaWduYWwgdG8gcGVlcnNcbiAgICovXG4gIGNyZWF0ZSgpIHtcbiAgICB0aGlzLnNvY2tldCA9IGlvKCk7XG4gICAgdGhpcy5yZWdpc3Rlckxpc3RlbmVycyh0aGlzLnNvY2tldCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3VubG9hZCcsICgpID0+IHtcbiAgICAgIC8vIE5vdGlmeSBvdGhlciBzb2NrZXRzXG4gICAgICB0aGlzLnNvY2tldC5lbWl0KCdleGl0X3Jvb20nLCB0aGlzLnJvb21OYW1lKTtcbiAgICAgIC8vIENsZWFuIHVwIGNvbm5lY3Rpb25zXG4gICAgICBmb3IgKGNvbnN0IHBlZXIgb2YgdGhpcy5wZWVyTGlzdCkge1xuICAgICAgICBwZWVyLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogU2VuZCBkYXRhIHZpYSBSVEMgdG8gYWxsIGNvbm5lY3Rpb25zXG4gICAqXG4gICAqIEBwYXJhbSBtZXNzYWdlIE1lc3NhZ2UgdG8gc2VuZFxuICAgKi9cbiAgc2VuZERhdGFNZXNzYWdlVG9BbGwobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgZm9yIChjb25zdCBwZWVyIG9mIHRoaXMucGVlckxpc3QpIHtcbiAgICAgIGlmIChwZWVyICYmIHBlZXIuZGF0YUNoYW5uZWwpIHtcbiAgICAgICAgcGVlci5kYXRhQ2hhbm5lbC5zZW5kKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZW5kIGRhdGEgdmlhIFJUQyB0byBzcGVjaWZpYyBjb25uZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSBzb2NrZXRJZCBTb2NrZXQgSUQgb2YgcGVlciB0byBzZW5kIGRhdGEgdG8gb3ZlciBSVENcbiAgICogQHBhcmFtIG1lc3NhZ2UgTWVzc2FnZSB0byBzZW5kXG4gICAqL1xuICBzZW5kRGF0YU1lc3NhZ2VUb1BlZXIoc29ja2V0SWQ6IHN0cmluZywgbWVzc2FnZTogc3RyaW5nKSB7XG4gICAgY29uc3QgcGVlciA9IHRoaXMucGVlckxpc3QuZmluZChwZWVyID0+IHBlZXIuZ3Vlc3RTb2NrZXRJZCA9PT0gc29ja2V0SWQpO1xuICAgIGlmIChwZWVyICYmIHBlZXIuZGF0YUNoYW5uZWwpIHtcbiAgICAgIHBlZXIuZGF0YUNoYW5uZWwuc2VuZChtZXNzYWdlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0dXAgU29ja2V0LklPIGxpc3RlbmVycyB0byBtYW5hZ2UgdGhlIFJUQyBTaWduYWxsaW5nIHByb2Nlc3NcbiAgICpcbiAgICogQHBhcmFtIHNvY2tldCBHbG9iYWwgU29ja2V0LklPIG9iamVjdFxuICAgKi9cbiAgcHJpdmF0ZSByZWdpc3Rlckxpc3RlbmVycyhzb2NrZXQ6IGFueSkge1xuXG4gICAgLy8gQ29ubmVjdGVkIHRvIFNvY2tldC5JTyBzZXJ2ZXJcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3Rpb25fc3VjY2VzcycsIChzb2NrZXRJZDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgU29ja2V0IElEOiBbJHtzb2NrZXRJZH1dYCk7XG4gICAgICAvLyBTdG9yZSB0aGlzIHNvY2tldHMgSURcbiAgICAgIHRoaXMuc29ja2V0SWQgPSBzb2NrZXRJZDtcbiAgICAgIC8vIFJlcXVlc3QgdG8gam9pbiB0aGUgcm9vbSBiYXNlZCBvbiB1cmwgcGF0aFxuICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnam9pbl9yZXF1ZXN0JywgdGhpcy5yb29tTmFtZSk7XG4gICAgfSk7XG5cbiAgICAvLyBBIGd1ZXN0IHNvY2tldCBoYXMgam9pbmVkIHRoZSByb29tXG4gICAgc29ja2V0Lm9uKCdmcmVzaF9mYWNlJywgYXN5bmMgKGRhdGE6IHtzb2NrZXRfaWQ6IHN0cmluZywgcm9vbV9uYW1lOiBzdHJpbmd9KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zb2xlLmxvZyhgQSBuZXcgc29ja2V0IGhhcyBjb25uZWN0ZWQgdG8gJyR7ZGF0YS5yb29tX25hbWV9JzogWyR7ZGF0YS5zb2NrZXRfaWR9XWApO1xuICAgICAgICAvLyBTZXR1cCBhIG5ldyBSVEMgQ29ubmVjdGlvbiB3aXRoIHRoaXMgc29ja2V0XG4gICAgICAgIGNvbnN0IHBlZXJDb25uZWN0aW9uID0gdGhpcy5jcmVhdGVSVENQZWVyQ29ubmVjdGlvbihkYXRhLnNvY2tldF9pZCk7XG4gICAgICAgIC8vIFNldHVwIGRhdGEgY29ubmVjdGlvblxuICAgICAgICBjb25zdCBkYXRhQ2hhbm5lbCA9IHBlZXJDb25uZWN0aW9uLmNyZWF0ZURhdGFDaGFubmVsKCdkYXRhX2NoYW5uZWwnKTtcbiAgICAgICAgdGhpcy5zZXR1cERhdGFDaGFubmVsTGlzdGVuZXJzKGRhdGFDaGFubmVsLCBkYXRhLnNvY2tldF9pZCk7XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgb2ZmZXJcbiAgICAgICAgY29uc3Qgb2ZmZXIgPSBhd2FpdCB0aGlzLmNyZWF0ZU9mZmVyKHBlZXJDb25uZWN0aW9uKTtcbiAgICAgICAgLy8gU2lnbmFsIHRoZSBvZmZlclxuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdzaWduYWxfb2ZmZXInLCB7ZnJvbTogdGhpcy5zb2NrZXRJZCwgdG86IGRhdGEuc29ja2V0X2lkLCBvZmZlcn0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEEgZ3Vlc3Qgc29ja2V0IGhhcyBsZWZ0IHRoZSByb29tXG4gICAgc29ja2V0Lm9uKCdieWVfZnJpZW5kJywgKGRhdGE6IHtzb2NrZXRfaWQ6IHN0cmluZywgcm9vbV9uYW1lOiBzdHJpbmd9KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgQSBzb2NrZXQgaGFzIGxlZnQgJyR7ZGF0YS5yb29tX25hbWV9JzogWyR7ZGF0YS5zb2NrZXRfaWR9XWApO1xuICAgICAgLy8gQ2xlYW4gdXAgcmVzb3VyY2VzXG4gICAgICAvLyAxLiBDYWxsIGN1c3RvbSBvblBlZXJNYXliZVF1aXQoKSBoYW5kbGVyXG4gICAgICBpZiAodHlwZW9mIHRoaXMub25QZWVyTWF5YmVRdWl0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMub25QZWVyTWF5YmVRdWl0KGRhdGEuc29ja2V0X2lkKTtcbiAgICAgIH1cbiAgICAgIC8vIDIuIENsb3NlIFJUQyBjb25uZWN0aW9uXG4gICAgICBjb25zdCBwZWVySW5kZXggPSB0aGlzLnBlZXJMaXN0LmZpbmRJbmRleChwZWVyID0+IHBlZXIuZ3Vlc3RTb2NrZXRJZCA9PT0gZGF0YS5zb2NrZXRfaWQpO1xuICAgICAgY29uc3QgcGVlciA9IHRoaXMucGVlckxpc3RbcGVlckluZGV4XTtcbiAgICAgIGlmIChwZWVyICYmIHBlZXIucGVlckNvbm5lY3Rpb24pIHtcbiAgICAgICAgcGVlci5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAvLyAzLiBVcGRhdGUgcGVlciBsaXN0IGlmIHBlZXIgaXMgZm91bmRcbiAgICAgICAgdGhpcy5wZWVyTGlzdC5zcGxpY2UocGVlckluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFNvY2tldCBiZWluZyBzZW50IGEgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uSW5pdCBhcyBhbiBvZmZlclxuICAgIHNvY2tldC5vbignb2ZmZXJfcmVjZWl2ZWQnLCBhc3luYyAoZGF0YToge2Zyb206IHN0cmluZywgdG86IHN0cmluZywgb2ZmZXI6IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbkluaXR9KSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zb2xlLmxvZyhgUmVjZWl2aW5nIGFuIFJUQyBvZmZlciBmcm9tICR7ZGF0YS5mcm9tfWApO1xuICAgICAgICAvLyBTZXR1cCBhIG5ldyBSVEMgQ29ubmVjdGlvbiB3aXRoIHRoaXMgc29ja2V0XG4gICAgICAgIGNvbnN0IHBlZXJDb25uZWN0aW9uID0gdGhpcy5jcmVhdGVSVENQZWVyQ29ubmVjdGlvbihkYXRhLmZyb20pO1xuICAgICAgICBwZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihuZXcgUlRDU2Vzc2lvbkRlc2NyaXB0aW9uKGRhdGEub2ZmZXIpKTtcbiAgICAgICAgY29uc3QgYW5zd2VyID0gYXdhaXQgdGhpcy5jcmVhdGVBbnN3ZXIocGVlckNvbm5lY3Rpb24pO1xuICAgICAgICAvLyBTaWduYWwgdGhlIGFuc3dlclxuICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdzaWduYWxfYW5zd2VyJywge2Zyb206IHRoaXMuc29ja2V0SWQsIHRvOiBkYXRhLmZyb20sIGFuc3dlcn0pO1xuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFNvY2tldCBiZWluZyBzZW50IGFzIGFuIGFuc3dlclxuICAgIHNvY2tldC5vbignYW5zd2VyX3JlY2VpdmVkJywgYXN5bmMgKGRhdGE6IHtmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcsIGFuc3dlcjogUlRDU2Vzc2lvbkRlc2NyaXB0aW9uSW5pdH0pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZpbmcgYW4gUlRDIGFuc3dlciBmcm9tICR7ZGF0YS5mcm9tfWApO1xuICAgICAgLy8gRmluZCB0aGUgbG9jYWwgUlRDIGNvbm5lY3Rpb24gZm9yIHRoaXMgcGFydGljdWxhciBndWVzdFxuICAgICAgY29uc3QgcGVlciA9IHRoaXMucGVlckxpc3QuZmluZChwZWVyID0+IHBlZXIuZ3Vlc3RTb2NrZXRJZCA9PT0gZGF0YS5mcm9tKTtcbiAgICAgIGlmIChwZWVyKSB7XG4gICAgICAgIC8vIEFzc2lnbiB0aGUgQW5zd2VyXG4gICAgICAgIHBlZXIucGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24oZGF0YS5hbnN3ZXIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU29ja2V0IGJlaW5nIHNlbnQgYW4gSWNlIENhbmRpZGF0ZVxuICAgIHNvY2tldC5vbignaWNlX3JlY2VpdmVkJywgYXN5bmMgKGRhdGE6IHtmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcsIGljZUNhbmRpZGF0ZToge2xhYmVsOiBudW1iZXIsIGNhbmRpZGF0ZTogc3RyaW5nfX0pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZpbmcgYW4gSWNlIENhbmRpZGF0ZSBmcm9tICR7ZGF0YS5mcm9tfWApO1xuICAgICAgLy8gRmluZCB0aGUgbG9jYWwgUlRDIGNvbm5lY3Rpb24gZm9yIHRoaXMgcGFydGljdWxhciBndWVzdFxuICAgICAgY29uc3QgcGVlciA9IHRoaXMucGVlckxpc3QuZmluZChwZWVyID0+IHBlZXIuZ3Vlc3RTb2NrZXRJZCA9PT0gZGF0YS5mcm9tKTtcbiAgICAgIGlmIChwZWVyKSB7XG4gICAgICAgIC8vIEFkZCB0aGUgY2FuZGlkYXRlXG4gICAgICAgIHBlZXIucGVlckNvbm5lY3Rpb24uYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoe1xuICAgICAgICAgIHNkcE1MaW5lSW5kZXg6IGRhdGEuaWNlQ2FuZGlkYXRlLmxhYmVsLFxuICAgICAgICAgIGNhbmRpZGF0ZTogZGF0YS5pY2VDYW5kaWRhdGUuY2FuZGlkYXRlXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gUlRDUGVlckNvbm5lY3Rpb24gZm9yIGEgbmV3IGd1ZXN0XG4gICAqXG4gICAqIEBwYXJhbSBndWVzdFNvY2tldElkIEd1ZXN0IHNvY2tldCBJRFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVSVENQZWVyQ29ubmVjdGlvbihndWVzdFNvY2tldElkOiBzdHJpbmcpIHtcbiAgICAvLyBDcmVhdGUgdGhlIFJUQ1BlZXJDb25uZWN0aW9uXG4gICAgY29uc3QgcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24odGhpcy5ydGNTZXJ2ZXJDb25maWcpO1xuICAgIC8vIFNldHVwIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhpcyBSVENQZWVyQ29ubmVjdGlvbiBpbnN0YW5jZVxuICAgIHBlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKGV2ZW50LmNhbmRpZGF0ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB7XG4gICAgICAgICAgbGFiZWw6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4LFxuICAgICAgICAgIGNhbmRpZGF0ZTogZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSxcbiAgICAgICAgfTtcbiAgICAgICAgLy8gU2lnbmFsIHRoZSBJY2UgQ2FuZGlkYXRlXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3NpZ25hbF9pY2UnLCB7ZnJvbTogdGhpcy5zb2NrZXRJZCwgdG86IGd1ZXN0U29ja2V0SWQsIGljZUNhbmRpZGF0ZTogY2FuZGlkYXRlfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1JUQ1BlZXJDb25uZWN0aW9uL29uY29ubmVjdGlvbnN0YXRlY2hhbmdlXG4gICAgcGVlckNvbm5lY3Rpb24ub25jb25uZWN0aW9uc3RhdGVjaGFuZ2UgPSBldmVudCA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgQ29ubmVjdGlvbiBzdGF0ZSB3aXRoICR7Z3Vlc3RTb2NrZXRJZH0gaGFzIGNoYW5nZWQgdG8gJHtwZWVyQ29ubmVjdGlvbi5jb25uZWN0aW9uU3RhdGV9YCk7XG4gICAgfVxuXG4gICAgLy8gUmVjZWl2aW5nIE1lZGlhIFRyYWNrIG92ZXIgdGhlIFJUQyBjb25uZWN0aW9uXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1JUQ1BlZXJDb25uZWN0aW9uL2FkZFRyYWNrXG4gICAgcGVlckNvbm5lY3Rpb24ub250cmFjayA9IGV2ZW50ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZpbmcgbWVkaWEgdHJhY2sgZnJvbSAke2d1ZXN0U29ja2V0SWR9YCwgZXZlbnQpO1xuICAgICAgLy8gQ2FsbCBjdXN0b20gb25UcmFjaygpIGhhbmRsZXJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vblRyYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMub25UcmFjayhndWVzdFNvY2tldElkLCBldmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVjZWl2aW5nIERhdGEgb3ZlciB0aGUgUlRDIGRhdGEgY2hhbm5lbFxuICAgIHBlZXJDb25uZWN0aW9uLm9uZGF0YWNoYW5uZWwgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZpbmcgZGF0YSBjaGFubmVsIGZyb20gJHtndWVzdFNvY2tldElkfWAsIGV2ZW50KTtcbiAgICAgIGlmIChldmVudC5jaGFubmVsKSB7XG4gICAgICAgIHRoaXMuc2V0dXBEYXRhQ2hhbm5lbExpc3RlbmVycyhldmVudC5jaGFubmVsLCBndWVzdFNvY2tldElkKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gQWRkIGxvY2FsIHN0cmVhbSB0byB0aGUgY29ubmVjdGlvbiAoaWYgYXZhaWxhYmxlKSBzbyBpdCBjYW4gYmUgc2hhcmVkXG4gICAgaWYgKHRoaXMubG9jYWxNZWRpYVN0cmVhbSkge1xuICAgICAgZm9yIChjb25zdCB0cmFjayBvZiB0aGlzLmxvY2FsTWVkaWFTdHJlYW0uZ2V0VHJhY2tzKCkpIHtcbiAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkVHJhY2sodHJhY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBjb25uZWN0aW9uIHRvIGxpc3Qgb2YgcGVlcnNcbiAgICB0aGlzLnBlZXJMaXN0LnB1c2goe2d1ZXN0U29ja2V0SWQsIHBlZXJDb25uZWN0aW9uLCBkYXRhQ2hhbm5lbDogbnVsbH0pO1xuXG4gICAgcmV0dXJuIHBlZXJDb25uZWN0aW9uO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXR1cERhdGFDaGFubmVsTGlzdGVuZXJzKGRhdGFDaGFubmVsOiBSVENEYXRhQ2hhbm5lbCwgZ3Vlc3RTb2NrZXRJZDogc3RyaW5nKSB7XG4gICAgLy8gU2V0dXAgTGlzdGVuZXJzXG4gICAgZGF0YUNoYW5uZWwub25vcGVuID0gKCkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYERhdGEgY2hhbm5lbCBvcGVuIFske2d1ZXN0U29ja2V0SWR9XWApO1xuICAgIH07XG4gICAgZGF0YUNoYW5uZWwub25jbG9zZSA9ICgpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBEYXRhIGNoYW5uZWwgY2xvc2VkIFske2d1ZXN0U29ja2V0SWR9XWApO1xuICAgIH07XG4gICAgZGF0YUNoYW5uZWwub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgUmVjZWl2aW5nIGRhdGEgbWVzc2FnZSBmcm9tICR7Z3Vlc3RTb2NrZXRJZH1gLCBldmVudCk7XG4gICAgICBpZiAodHlwZW9mIHRoaXMub25EYXRhTWVzc2FnZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLm9uRGF0YU1lc3NhZ2UoZ3Vlc3RTb2NrZXRJZCwgZXZlbnQuZGF0YSk7XG4gICAgICB9XG4gICAgfTtcbiAgICAvLyBTYXZlIGRhdGEgY2hhbm5lbCB0byBwZWVyXG4gICAgY29uc3QgcGVlciA9IHRoaXMucGVlckxpc3QuZmluZChwZWVyID0+IHBlZXIuZ3Vlc3RTb2NrZXRJZCA9PT0gZ3Vlc3RTb2NrZXRJZCk7XG4gICAgaWYgKHBlZXIpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgQW5zd2VyXG4gICAgICBwZWVyLmRhdGFDaGFubmVsID0gZGF0YUNoYW5uZWw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBSVENTZXNzaW9uRGVzY3JpcHRpb25Jbml0IChvZmZlcikgYW5kIGFzc2lnbiB0byBsb2NhbCBSVENQZWVyQ29ubmVjdGlvblxuICAgKlxuICAgKiBAcGFyYW0gcGVlckNvbm5lY3Rpb24gUlRDIENvbm5lY3Rpb25cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlT2ZmZXIocGVlckNvbm5lY3Rpb246IFJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgY29uc3Qgb2ZmZXIgPSBhd2FpdCBwZWVyQ29ubmVjdGlvbi5jcmVhdGVPZmZlcih7b2ZmZXJUb1JlY2VpdmVWaWRlbzogdHJ1ZSwgb2ZmZXJUb1JlY2VpdmVBdWRpbzogdHJ1ZX0pO1xuICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24ob2ZmZXIpO1xuICAgIHJldHVybiBvZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gUlRDU2Vzc2lvbkRlc2NyaXB0aW9uSW5pdCAoYW5zd2VyKSBhbmQgYXNzaWduIHRvIGxvY2FsIFJUQ1BlZXJDb25uZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSBwZWVyQ29ubmVjdGlvbiBSVEMgQ29ubmVjdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVBbnN3ZXIocGVlckNvbm5lY3Rpb246IFJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgY29uc3QgYW5zd2VyID0gYXdhaXQgcGVlckNvbm5lY3Rpb24uY3JlYXRlQW5zd2VyKCk7XG4gICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihhbnN3ZXIpO1xuICAgIHJldHVybiBhbnN3ZXI7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIGVycm9ycyBkdXJpbmcgdGhlIHNpZ25hbGxpbmcgcHJvY2Vzc1xuICAgKlxuICAgKiBAcGFyYW0gZXJyIEVycm9yXG4gICAqL1xuICBwcml2YXRlIGhhbmRsZUVycm9yKGVycjogYW55KSB7XG4gICAgLy8gVE9ETyAtIGNyZWF0ZSBlcnJvciBoYW5kbGluZyBwcm9jZXNzXG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfVxufSIsImltcG9ydCB7IFNpZ25hbGxpbmdTZXJ2aWNlIH0gZnJvbSAnLi9zaWduYWxsaW5nJztcblxuLyoqXG4gKiBHZXQgTWVkaWEgZm9yIHRoaXMgYnJvd3NlciBpLmUuIGFjY2VzcyBXZWJjYW0gYW5kIE1pY3JvcGhvbmVcbiAqXG4gKiAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9NZWRpYURldmljZXMvZ2V0VXNlck1lZGlhXG4gKiAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9NZWRpYVN0cmVhbUNvbnN0cmFpbnRzXG4gKiBAcGFyYW0gY29uc3RyYWludHMgTWVkaWFTdHJlYW1Db25zdHJhaW50c1xuICovXG5jb25zdCBnZXRVc2VyTWVkaWEgPSAoY29uc3RyYWludHM6IE1lZGlhU3RyZWFtQ29uc3RyYWludHMpID0+IHtcbiAgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ25hdmlnYXRvci5tZWRpYURldmljZXMgaXMgdW5hdmFpbGFibGUnKSk7XG4gIH1cbiAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSA8dmlkZW8+PC92aWRlbz4gZWxlbWVudCBmb3IgdGhlIGd1ZXN0XG4gKlxuICogQHBhcmFtIGd1ZXN0SWQgR3Vlc3Qgc29ja2V0IElEIGFzc2lnbmVkIGFzIGVsZW1lbnRzIGlkPVwiXCJcbiAqL1xuY29uc3QgaW5zZXJ0VmlkZW9FbGVtZW50ID0gKGd1ZXN0SWQ6IHN0cmluZykgPT4ge1xuICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gIHZpZGVvLmlkID0gYGd1ZXN0LSR7Z3Vlc3RJZH1gO1xuICB2aWRlby5hdXRvcGxheSA9IHRydWU7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb3MnKS5hcHBlbmRDaGlsZCh2aWRlbyk7XG4gIHJldHVybiB2aWRlbztcbn1cblxuLy8gQXNzaWduIGJyb3dzZXJzIG1lZGlhIHN0cmVhbSB0byA8dmlkZW8+PC92aWRlbz4gZWxlbWVudFxuY29uc3Qgc2V0TG9jYWxNZWRpYVN0cmVhbSA9IChzdHJlYW06IE1lZGlhU3RyZWFtKSA9PiB7XG4gIGNvbnN0IGxvY2FsVmlkZW9FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhbFZpZGVvJykgYXMgSFRNTFZpZGVvRWxlbWVudDtcbiAgbG9jYWxWaWRlb0VsLnNyY09iamVjdCA9IHN0cmVhbTtcbiAgcmV0dXJuIHN0cmVhbTtcbn1cblxuLy8gR2V0IGxvY2FsIG1lZGlhIHN0cmVhbSBhbmQgc2V0dXAgdGhlIHNpZ25hbGxpbmcgc2VydmljZSBpZiBzdWNjZXNzZnVsXG5nZXRVc2VyTWVkaWEoe2F1ZGlvOiBmYWxzZSwgdmlkZW86IHRydWV9KVxuICAudGhlbihzZXRMb2NhbE1lZGlhU3RyZWFtKVxuICAudGhlbihzdHJlYW0gPT4ge1xuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9SVENJY2VTZXJ2ZXIjRXhhbXBsZVxuICAgIGNvbnN0IGNvbmZpZzogUlRDQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgICdpY2VTZXJ2ZXJzJzogW1xuICAgICAgICB7XG4gICAgICAgICAgJ3VybHMnOiBbXG4gICAgICAgICAgICAvLyBGcmVlIHB1YmxpYyBzdHVuIHNlcnZlcnMgcHJvdmlkZWQgYnkgR29vZ2xlXG4gICAgICAgICAgICAnc3R1bjpzdHVuLmwuZ29vZ2xlLmNvbToxOTMwMicsXG4gICAgICAgICAgICAnc3R1bjpzdHVuMS5sLmdvb2dsZS5jb206MTkzMDInLFxuICAgICAgICAgICAgJ3N0dW46c3R1bjIubC5nb29nbGUuY29tOjE5MzAyJyxcbiAgICAgICAgICAgICdzdHVuOnN0dW4zLmwuZ29vZ2xlLmNvbToxOTMwMicsXG4gICAgICAgICAgICAnc3R1bjpzdHVuNC5sLmdvb2dsZS5jb206MTkzMDInLFxuICAgICAgICAgICAgLy8gVE9ETyAtIGFkZCB0dXJuIHNlcnZlcnNcbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gICAgLy8gQ3JlYXRlIHNpZ25hbGxpbmcgc2VydmljZVxuICAgIGNvbnN0IHNpZ25hbGxpbmcgPSBuZXcgU2lnbmFsbGluZ1NlcnZpY2UoY29uZmlnLCBzdHJlYW0pO1xuICAgIC8vIEF0dGFjaCBldmVudCBob29rc1xuICAgIHNpZ25hbGxpbmcub25QZWVyTWF5YmVRdWl0ID0gKHNvY2tldElkOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGd1ZXN0VmlkZW9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNndWVzdC0ke3NvY2tldElkfWApIGFzIEhUTUxWaWRlb0VsZW1lbnQ7XG4gICAgICBpZiAoZ3Vlc3RWaWRlb0VsKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2aWRlb3MnKS5yZW1vdmVDaGlsZChndWVzdFZpZGVvRWwpO1xuICAgICAgfVxuICAgIH1cbiAgICBzaWduYWxsaW5nLm9uVHJhY2sgPSAoc29ja2V0SWQ6IHN0cmluZywgZXZlbnQ6IFJUQ1RyYWNrRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGd1ZXN0VmlkZW9FbCA9IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZ3Vlc3QtJHtzb2NrZXRJZH1gKSB8fCBpbnNlcnRWaWRlb0VsZW1lbnQoc29ja2V0SWQpKSBhcyBIVE1MVmlkZW9FbGVtZW50O1xuICAgICAgaWYgKGV2ZW50LnN0cmVhbXMgJiYgZXZlbnQuc3RyZWFtc1swXSkge1xuICAgICAgICBndWVzdFZpZGVvRWwuc3JjT2JqZWN0ID0gZXZlbnQuc3RyZWFtc1swXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBpbmJvdW5kU3RyZWFtID0gbmV3IE1lZGlhU3RyZWFtKFtldmVudC50cmFja10pO1xuICAgICAgICBndWVzdFZpZGVvRWwuc3JjT2JqZWN0ID0gaW5ib3VuZFN0cmVhbTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gQ29ubmVjdCB0byB0aGUgc2lnbmFsbGluZyBzZXJ2ZXJcbiAgICBzaWduYWxsaW5nLmNyZWF0ZSgpO1xuICB9KVxuICAuY2F0Y2goKGVycjogYW55KSA9PiB7XG4gICAgY29uc29sZS5sb2coZXJyKTtcbiAgfSk7Il0sInNvdXJjZVJvb3QiOiIifQ==