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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/socket/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/socket/index.ts":
/*!*****************************!*\
  !*** ./src/socket/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var media_1 = __webpack_require__(/*! ./media */ "./src/socket/media/index.ts");
var signalling_1 = __webpack_require__(/*! ./signalling */ "./src/socket/signalling/index.ts");
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
media_1.getUserMedia({ audio: false, video: true })
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


/***/ }),

/***/ "./src/socket/media/index.ts":
/*!***********************************!*\
  !*** ./src/socket/media/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * Get Media for this browser i.e. access Webcam and Microphone
 *
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
 * - https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamConstraints
 * @param constraints MediaStreamConstraints
 */
exports.getUserMedia = function (constraints) {
    if (navigator.mediaDevices === undefined) {
        return Promise.reject(new Error('navigator.mediaDevices is unavailable'));
    }
    return navigator.mediaDevices.getUserMedia(constraints);
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
        this.roomName = location.pathname;
        // RTC Connection Hooks (allow the signalling service to communicate with the implementer)
        // Fired when we receive a RTCTrackEvent from a peer
        this.onTrack = null;
        // Fired when a socket quits (note: `maybe` as RTC connection may not be established by this point)
        this.onPeerMaybeQuit = null;
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
            var peerConnection, offer, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("A new socket has connected to '" + data.room_name + "': [" + data.socket_id + "]");
                        peerConnection = this.createRTCPeerConnection(data.socket_id);
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
        // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addTrack
        peerConnection.ontrack = function (event) {
            console.log("Receiving media track from " + guestSocketId, event);
            // Call custom onTrack() handler
            if (typeof _this.onTrack === 'function') {
                _this.onTrack(guestSocketId, event);
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
        this.peerList.push({ guestSocketId: guestSocketId, peerConnection: peerConnection });
        return peerConnection;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NvY2tldC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc29ja2V0L21lZGlhL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zb2NrZXQvc2lnbmFsbGluZy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsZ0ZBQXVDO0FBQ3ZDLCtGQUFpRDtBQUVqRDs7OztHQUlHO0FBQ0gsSUFBTSxrQkFBa0IsR0FBRyxVQUFDLE9BQWU7SUFDekMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QyxLQUFLLENBQUMsRUFBRSxHQUFHLFdBQVMsT0FBUyxDQUFDO0lBQzlCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lB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QzNDLHFCQUFNLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFDLENBQUM7O3dCQUFoRyxLQUFLLEdBQUcsU0FBd0Y7d0JBQ3RHLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDMUMsc0JBQU8sS0FBSyxFQUFDOzs7O0tBQ2Q7SUFFRDs7OztPQUlHO0lBQ1csd0NBQVksR0FBMUIsVUFBMkIsY0FBaUM7Ozs7OzRCQUMzQyxxQkFBTSxjQUFjLENBQUMsWUFBWSxFQUFFOzt3QkFBNUMsTUFBTSxHQUFHLFNBQW1DO3dCQUNsRCxjQUFjLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQzNDLHNCQUFPLE1BQU0sRUFBQzs7OztLQUNmO0lBRUQ7Ozs7T0FJRztJQUNLLHVDQUFXLEdBQW5CLFVBQW9CLEdBQVE7UUFDMUIsdUNBQXVDO1FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQztBQXZNWSw4Q0FBaUIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3NvY2tldC9pbmRleC50c1wiKTtcbiIsImltcG9ydCB7IGdldFVzZXJNZWRpYSB9IGZyb20gJy4vbWVkaWEnO1xuaW1wb3J0IHsgU2lnbmFsbGluZ1NlcnZpY2UgfSBmcm9tICcuL3NpZ25hbGxpbmcnO1xuXG4vKipcbiAqIENyZWF0ZSBhIDx2aWRlbz48L3ZpZGVvPiBlbGVtZW50IGZvciB0aGUgZ3Vlc3RcbiAqXG4gKiBAcGFyYW0gZ3Vlc3RJZCBHdWVzdCBzb2NrZXQgSUQgYXNzaWduZWQgYXMgZWxlbWVudHMgaWQ9XCJcIlxuICovXG5jb25zdCBpbnNlcnRWaWRlb0VsZW1lbnQgPSAoZ3Vlc3RJZDogc3RyaW5nKSA9PiB7XG4gIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgdmlkZW8uaWQgPSBgZ3Vlc3QtJHtndWVzdElkfWA7XG4gIHZpZGVvLmF1dG9wbGF5ID0gdHJ1ZTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvcycpLmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgcmV0dXJuIHZpZGVvO1xufVxuXG4vLyBBc3NpZ24gYnJvd3NlcnMgbWVkaWEgc3RyZWFtIHRvIDx2aWRlbz48L3ZpZGVvPiBlbGVtZW50XG5jb25zdCBzZXRMb2NhbE1lZGlhU3RyZWFtID0gKHN0cmVhbTogTWVkaWFTdHJlYW0pID0+IHtcbiAgY29uc3QgbG9jYWxWaWRlb0VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvY2FsVmlkZW8nKSBhcyBIVE1MVmlkZW9FbGVtZW50O1xuICBsb2NhbFZpZGVvRWwuc3JjT2JqZWN0ID0gc3RyZWFtO1xuICByZXR1cm4gc3RyZWFtO1xufVxuXG4vLyBHZXQgbG9jYWwgbWVkaWEgc3RyZWFtIGFuZCBzZXR1cCB0aGUgc2lnbmFsbGluZyBzZXJ2aWNlIGlmIHN1Y2Nlc3NmdWxcbmdldFVzZXJNZWRpYSh7YXVkaW86IGZhbHNlLCB2aWRlbzogdHJ1ZX0pXG4gIC50aGVuKHNldExvY2FsTWVkaWFTdHJlYW0pXG4gIC50aGVuKHN0cmVhbSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1JUQ0ljZVNlcnZlciNFeGFtcGxlXG4gICAgY29uc3QgY29uZmlnOiBSVENDb25maWd1cmF0aW9uID0ge1xuICAgICAgJ2ljZVNlcnZlcnMnOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAndXJscyc6IFtcbiAgICAgICAgICAgIC8vIEZyZWUgcHVibGljIHN0dW4gc2VydmVycyBwcm92aWRlZCBieSBHb29nbGVcbiAgICAgICAgICAgICdzdHVuOnN0dW4ubC5nb29nbGUuY29tOjE5MzAyJyxcbiAgICAgICAgICAgICdzdHVuOnN0dW4xLmwuZ29vZ2xlLmNvbToxOTMwMicsXG4gICAgICAgICAgICAnc3R1bjpzdHVuMi5sLmdvb2dsZS5jb206MTkzMDInLFxuICAgICAgICAgICAgJ3N0dW46c3R1bjMubC5nb29nbGUuY29tOjE5MzAyJyxcbiAgICAgICAgICAgICdzdHVuOnN0dW40LmwuZ29vZ2xlLmNvbToxOTMwMicsXG4gICAgICAgICAgICAvLyBUT0RPIC0gYWRkIHR1cm4gc2VydmVyc1xuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgICAvLyBDcmVhdGUgc2lnbmFsbGluZyBzZXJ2aWNlXG4gICAgY29uc3Qgc2lnbmFsbGluZyA9IG5ldyBTaWduYWxsaW5nU2VydmljZShjb25maWcsIHN0cmVhbSk7XG4gICAgLy8gQXR0YWNoIGV2ZW50IGhvb2tzXG4gICAgc2lnbmFsbGluZy5vblBlZXJNYXliZVF1aXQgPSAoc29ja2V0SWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgZ3Vlc3RWaWRlb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2d1ZXN0LSR7c29ja2V0SWR9YCkgYXMgSFRNTFZpZGVvRWxlbWVudDtcbiAgICAgIGlmIChndWVzdFZpZGVvRWwpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvcycpLnJlbW92ZUNoaWxkKGd1ZXN0VmlkZW9FbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNpZ25hbGxpbmcub25UcmFjayA9IChzb2NrZXRJZDogc3RyaW5nLCBldmVudDogUlRDVHJhY2tFdmVudCkgPT4ge1xuICAgICAgY29uc3QgZ3Vlc3RWaWRlb0VsID0gKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNndWVzdC0ke3NvY2tldElkfWApIHx8IGluc2VydFZpZGVvRWxlbWVudChzb2NrZXRJZCkpIGFzIEhUTUxWaWRlb0VsZW1lbnQ7XG4gICAgICBpZiAoZXZlbnQuc3RyZWFtcyAmJiBldmVudC5zdHJlYW1zWzBdKSB7XG4gICAgICAgIGd1ZXN0VmlkZW9FbC5zcmNPYmplY3QgPSBldmVudC5zdHJlYW1zWzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGluYm91bmRTdHJlYW0gPSBuZXcgTWVkaWFTdHJlYW0oW2V2ZW50LnRyYWNrXSk7XG4gICAgICAgIGd1ZXN0VmlkZW9FbC5zcmNPYmplY3QgPSBpbmJvdW5kU3RyZWFtO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBDb25uZWN0IHRvIHRoZSBzaWduYWxsaW5nIHNlcnZlclxuICAgIHNpZ25hbGxpbmcuY3JlYXRlKCk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KTsiLCIvKipcbiAqIEdldCBNZWRpYSBmb3IgdGhpcyBicm93c2VyIGkuZS4gYWNjZXNzIFdlYmNhbSBhbmQgTWljcm9waG9uZVxuICpcbiAqIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01lZGlhRGV2aWNlcy9nZXRVc2VyTWVkaWFcbiAqIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01lZGlhU3RyZWFtQ29uc3RyYWludHNcbiAqIEBwYXJhbSBjb25zdHJhaW50cyBNZWRpYVN0cmVhbUNvbnN0cmFpbnRzXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRVc2VyTWVkaWEgPSAoY29uc3RyYWludHM6IE1lZGlhU3RyZWFtQ29uc3RyYWludHMpID0+IHtcbiAgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ25hdmlnYXRvci5tZWRpYURldmljZXMgaXMgdW5hdmFpbGFibGUnKSk7XG4gIH1cbiAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKTtcbn0iLCJkZWNsYXJlIGNvbnN0IGlvOyAvLyBHbG9iYWwgU29ja2V0LklPIG9iamVjdFxuXG5pbnRlcmZhY2UgR3Vlc3RDb25uZWN0aW9uIHtcbiAgZ3Vlc3RTb2NrZXRJZDogc3RyaW5nLCAvLyBJRCBvZiBwZWVycyBzb2NrZXQgY29ubmVjdGlvblxuICBwZWVyQ29ubmVjdGlvbjogUlRDUGVlckNvbm5lY3Rpb24sIC8vIExvY2FsIFJUQyBjb25uZWN0aW9uIGZvciB0aGlzIHBlZXJcbn1cblxuZXhwb3J0IGNsYXNzIFNpZ25hbGxpbmdTZXJ2aWNlIHtcblxuICBwcml2YXRlIHNvY2tldDogYW55OyAgLy8gU29ja2V0LklPXG4gIHByaXZhdGUgc29ja2V0SWQ6IHN0cmluZzsgLy8gSUQgb2YgdGhpcyBicm93c2VycyBzb2NrZXQgY29ubmVjdGlvblxuICBwcml2YXRlIHBlZXJMaXN0OiBHdWVzdENvbm5lY3Rpb25bXSA9IFtdOyAvLyBMaXN0IG9mIFJUQyBjb25uZWN0ZWQgcGVlcnNcbiAgcHJpdmF0ZSByb29tTmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gIC8vIFJUQyBDb25uZWN0aW9uIEhvb2tzIChhbGxvdyB0aGUgc2lnbmFsbGluZyBzZXJ2aWNlIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIGltcGxlbWVudGVyKVxuXG4gIC8vIEZpcmVkIHdoZW4gd2UgcmVjZWl2ZSBhIFJUQ1RyYWNrRXZlbnQgZnJvbSBhIHBlZXJcbiAgcHVibGljIG9uVHJhY2s6IChwZWVySWQ6IHN0cmluZywgdHJhY2s6IFJUQ1RyYWNrRXZlbnQpID0+IHZvaWQgPSBudWxsO1xuICAvLyBGaXJlZCB3aGVuIGEgc29ja2V0IHF1aXRzIChub3RlOiBgbWF5YmVgIGFzIFJUQyBjb25uZWN0aW9uIG1heSBub3QgYmUgZXN0YWJsaXNoZWQgYnkgdGhpcyBwb2ludClcbiAgcHVibGljIG9uUGVlck1heWJlUXVpdDogKHBlZXJJZDogc3RyaW5nKSA9PiB2b2lkID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJ0Y1NlcnZlckNvbmZpZzogUlRDQ29uZmlndXJhdGlvbixcbiAgICBwcml2YXRlIGxvY2FsTWVkaWFTdHJlYW06IE1lZGlhU3RyZWFtLFxuICApIHt9XG5cbiAgLyoqXG4gICAqIEVzdGFibGlzaCBTb2NrZXQuSU8gY29ubmVjdGlvblxuICAgKlxuICAgKiAtIFJlZ2lzdGVyIFNvY2tldC5JTyAoc2lnbmFsbGluZykgbGlzdGVuZXJzXG4gICAqIC0gUmVnaXN0ZXIgd2luZG93LnVubG9hZCBldmVudCB0byBjbGVhbiB1cCBjb25uZWN0aW9ucyBhbmQgc2lnbmFsIHRvIHBlZXJzXG4gICAqL1xuICBjcmVhdGUoKSB7XG4gICAgdGhpcy5zb2NrZXQgPSBpbygpO1xuICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnModGhpcy5zb2NrZXQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmxvYWQnLCAoKSA9PiB7XG4gICAgICAvLyBOb3RpZnkgb3RoZXIgc29ja2V0c1xuICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnZXhpdF9yb29tJywgdGhpcy5yb29tTmFtZSk7XG4gICAgICAvLyBDbGVhbiB1cCBjb25uZWN0aW9uc1xuICAgICAgZm9yIChjb25zdCBwZWVyIG9mIHRoaXMucGVlckxpc3QpIHtcbiAgICAgICAgcGVlci5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHVwIFNvY2tldC5JTyBsaXN0ZW5lcnMgdG8gbWFuYWdlIHRoZSBSVEMgU2lnbmFsbGluZyBwcm9jZXNzXG4gICAqXG4gICAqIEBwYXJhbSBzb2NrZXQgR2xvYmFsIFNvY2tldC5JTyBvYmplY3RcbiAgICovXG4gIHByaXZhdGUgcmVnaXN0ZXJMaXN0ZW5lcnMoc29ja2V0OiBhbnkpIHtcblxuICAgIC8vIENvbm5lY3RlZCB0byBTb2NrZXQuSU8gc2VydmVyXG4gICAgc29ja2V0Lm9uKCdjb25uZWN0aW9uX3N1Y2Nlc3MnLCAoc29ja2V0SWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFNvY2tldCBJRDogWyR7c29ja2V0SWR9XWApO1xuICAgICAgLy8gU3RvcmUgdGhpcyBzb2NrZXRzIElEXG4gICAgICB0aGlzLnNvY2tldElkID0gc29ja2V0SWQ7XG4gICAgICAvLyBSZXF1ZXN0IHRvIGpvaW4gdGhlIHJvb20gYmFzZWQgb24gdXJsIHBhdGhcbiAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2pvaW5fcmVxdWVzdCcsIHRoaXMucm9vbU5hbWUpO1xuICAgIH0pO1xuXG4gICAgLy8gQSBndWVzdCBzb2NrZXQgaGFzIGpvaW5lZCB0aGUgcm9vbVxuICAgIHNvY2tldC5vbignZnJlc2hfZmFjZScsIGFzeW5jIChkYXRhOiB7c29ja2V0X2lkOiBzdHJpbmcsIHJvb21fbmFtZTogc3RyaW5nfSkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc29sZS5sb2coYEEgbmV3IHNvY2tldCBoYXMgY29ubmVjdGVkIHRvICcke2RhdGEucm9vbV9uYW1lfSc6IFske2RhdGEuc29ja2V0X2lkfV1gKTtcbiAgICAgICAgLy8gU2V0dXAgYSBuZXcgUlRDIENvbm5lY3Rpb24gd2l0aCB0aGlzIHNvY2tldFxuICAgICAgICBjb25zdCBwZWVyQ29ubmVjdGlvbiA9IHRoaXMuY3JlYXRlUlRDUGVlckNvbm5lY3Rpb24oZGF0YS5zb2NrZXRfaWQpO1xuICAgICAgICBjb25zdCBvZmZlciA9IGF3YWl0IHRoaXMuY3JlYXRlT2ZmZXIocGVlckNvbm5lY3Rpb24pO1xuICAgICAgICAvLyBTaWduYWwgdGhlIG9mZmVyXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3NpZ25hbF9vZmZlcicsIHtmcm9tOiB0aGlzLnNvY2tldElkLCB0bzogZGF0YS5zb2NrZXRfaWQsIG9mZmVyfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQSBndWVzdCBzb2NrZXQgaGFzIGxlZnQgdGhlIHJvb21cbiAgICBzb2NrZXQub24oJ2J5ZV9mcmllbmQnLCAoZGF0YToge3NvY2tldF9pZDogc3RyaW5nLCByb29tX25hbWU6IHN0cmluZ30pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBBIHNvY2tldCBoYXMgbGVmdCAnJHtkYXRhLnJvb21fbmFtZX0nOiBbJHtkYXRhLnNvY2tldF9pZH1dYCk7XG4gICAgICAvLyBDbGVhbiB1cCByZXNvdXJjZXNcbiAgICAgIC8vIDEuIENhbGwgY3VzdG9tIG9uUGVlck1heWJlUXVpdCgpIGhhbmRsZXJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vblBlZXJNYXliZVF1aXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5vblBlZXJNYXliZVF1aXQoZGF0YS5zb2NrZXRfaWQpO1xuICAgICAgfVxuICAgICAgLy8gMi4gQ2xvc2UgUlRDIGNvbm5lY3Rpb25cbiAgICAgIGNvbnN0IHBlZXJJbmRleCA9IHRoaXMucGVlckxpc3QuZmluZEluZGV4KHBlZXIgPT4gcGVlci5ndWVzdFNvY2tldElkID09PSBkYXRhLnNvY2tldF9pZCk7XG4gICAgICBjb25zdCBwZWVyID0gdGhpcy5wZWVyTGlzdFtwZWVySW5kZXhdO1xuICAgICAgaWYgKHBlZXIgJiYgcGVlci5wZWVyQ29ubmVjdGlvbikge1xuICAgICAgICBwZWVyLnBlZXJDb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgIC8vIDMuIFVwZGF0ZSBwZWVyIGxpc3QgaWYgcGVlciBpcyBmb3VuZFxuICAgICAgICB0aGlzLnBlZXJMaXN0LnNwbGljZShwZWVySW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU29ja2V0IGJlaW5nIHNlbnQgYSBSVENTZXNzaW9uRGVzY3JpcHRpb25Jbml0IGFzIGFuIG9mZmVyXG4gICAgc29ja2V0Lm9uKCdvZmZlcl9yZWNlaXZlZCcsIGFzeW5jIChkYXRhOiB7ZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nLCBvZmZlcjogUlRDU2Vzc2lvbkRlc2NyaXB0aW9uSW5pdH0pID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZpbmcgYW4gUlRDIG9mZmVyIGZyb20gJHtkYXRhLmZyb219YCk7XG4gICAgICAgIC8vIFNldHVwIGEgbmV3IFJUQyBDb25uZWN0aW9uIHdpdGggdGhpcyBzb2NrZXRcbiAgICAgICAgY29uc3QgcGVlckNvbm5lY3Rpb24gPSB0aGlzLmNyZWF0ZVJUQ1BlZXJDb25uZWN0aW9uKGRhdGEuZnJvbSk7XG4gICAgICAgIHBlZXJDb25uZWN0aW9uLnNldFJlbW90ZURlc2NyaXB0aW9uKG5ldyBSVENTZXNzaW9uRGVzY3JpcHRpb24oZGF0YS5vZmZlcikpO1xuICAgICAgICBjb25zdCBhbnN3ZXIgPSBhd2FpdCB0aGlzLmNyZWF0ZUFuc3dlcihwZWVyQ29ubmVjdGlvbik7XG4gICAgICAgIC8vIFNpZ25hbCB0aGUgYW5zd2VyXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3NpZ25hbF9hbnN3ZXInLCB7ZnJvbTogdGhpcy5zb2NrZXRJZCwgdG86IGRhdGEuZnJvbSwgYW5zd2VyfSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU29ja2V0IGJlaW5nIHNlbnQgYXMgYW4gYW5zd2VyXG4gICAgc29ja2V0Lm9uKCdhbnN3ZXJfcmVjZWl2ZWQnLCBhc3luYyAoZGF0YToge2Zyb206IHN0cmluZywgdG86IHN0cmluZywgYW5zd2VyOiBSVENTZXNzaW9uRGVzY3JpcHRpb25Jbml0fSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFJlY2VpdmluZyBhbiBSVEMgYW5zd2VyIGZyb20gJHtkYXRhLmZyb219YCk7XG4gICAgICAvLyBGaW5kIHRoZSBsb2NhbCBSVEMgY29ubmVjdGlvbiBmb3IgdGhpcyBwYXJ0aWN1bGFyIGd1ZXN0XG4gICAgICBjb25zdCBwZWVyID0gdGhpcy5wZWVyTGlzdC5maW5kKHBlZXIgPT4gcGVlci5ndWVzdFNvY2tldElkID09PSBkYXRhLmZyb20pO1xuICAgICAgaWYgKHBlZXIpIHtcbiAgICAgICAgLy8gQXNzaWduIHRoZSBBbnN3ZXJcbiAgICAgICAgcGVlci5wZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihkYXRhLmFuc3dlcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTb2NrZXQgYmVpbmcgc2VudCBhbiBJY2UgQ2FuZGlkYXRlXG4gICAgc29ja2V0Lm9uKCdpY2VfcmVjZWl2ZWQnLCBhc3luYyAoZGF0YToge2Zyb206IHN0cmluZywgdG86IHN0cmluZywgaWNlQ2FuZGlkYXRlOiB7bGFiZWw6IG51bWJlciwgY2FuZGlkYXRlOiBzdHJpbmd9fSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFJlY2VpdmluZyBhbiBJY2UgQ2FuZGlkYXRlIGZyb20gJHtkYXRhLmZyb219YCk7XG4gICAgICAvLyBGaW5kIHRoZSBsb2NhbCBSVEMgY29ubmVjdGlvbiBmb3IgdGhpcyBwYXJ0aWN1bGFyIGd1ZXN0XG4gICAgICBjb25zdCBwZWVyID0gdGhpcy5wZWVyTGlzdC5maW5kKHBlZXIgPT4gcGVlci5ndWVzdFNvY2tldElkID09PSBkYXRhLmZyb20pO1xuICAgICAgaWYgKHBlZXIpIHtcbiAgICAgICAgLy8gQWRkIHRoZSBjYW5kaWRhdGVcbiAgICAgICAgcGVlci5wZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZSh7XG4gICAgICAgICAgc2RwTUxpbmVJbmRleDogZGF0YS5pY2VDYW5kaWRhdGUubGFiZWwsXG4gICAgICAgICAgY2FuZGlkYXRlOiBkYXRhLmljZUNhbmRpZGF0ZS5jYW5kaWRhdGVcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBSVENQZWVyQ29ubmVjdGlvbiBmb3IgYSBuZXcgZ3Vlc3RcbiAgICpcbiAgICogQHBhcmFtIGd1ZXN0U29ja2V0SWQgR3Vlc3Qgc29ja2V0IElEXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZVJUQ1BlZXJDb25uZWN0aW9uKGd1ZXN0U29ja2V0SWQ6IHN0cmluZykge1xuICAgIC8vIENyZWF0ZSB0aGUgUlRDUGVlckNvbm5lY3Rpb25cbiAgICBjb25zdCBwZWVyQ29ubmVjdGlvbiA9IG5ldyBSVENQZWVyQ29ubmVjdGlvbih0aGlzLnJ0Y1NlcnZlckNvbmZpZyk7XG4gICAgLy8gU2V0dXAgZXZlbnQgbGlzdGVuZXJzIGZvciB0aGlzIFJUQ1BlZXJDb25uZWN0aW9uIGluc3RhbmNlXG4gICAgcGVlckNvbm5lY3Rpb24ub25pY2VjYW5kaWRhdGUgPSBldmVudCA9PiB7XG4gICAgICBpZiAoZXZlbnQuY2FuZGlkYXRlKSB7XG4gICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHtcbiAgICAgICAgICBsYWJlbDogZXZlbnQuY2FuZGlkYXRlLnNkcE1MaW5lSW5kZXgsXG4gICAgICAgICAgY2FuZGlkYXRlOiBldmVudC5jYW5kaWRhdGUuY2FuZGlkYXRlLFxuICAgICAgICB9O1xuICAgICAgICAvLyBTaWduYWwgdGhlIEljZSBDYW5kaWRhdGVcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnc2lnbmFsX2ljZScsIHtmcm9tOiB0aGlzLnNvY2tldElkLCB0bzogZ3Vlc3RTb2NrZXRJZCwgaWNlQ2FuZGlkYXRlOiBjYW5kaWRhdGV9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1JUQ1BlZXJDb25uZWN0aW9uL2FkZFRyYWNrXG4gICAgcGVlckNvbm5lY3Rpb24ub250cmFjayA9IGV2ZW50ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZpbmcgbWVkaWEgdHJhY2sgZnJvbSAke2d1ZXN0U29ja2V0SWR9YCwgZXZlbnQpO1xuICAgICAgLy8gQ2FsbCBjdXN0b20gb25UcmFjaygpIGhhbmRsZXJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5vblRyYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMub25UcmFjayhndWVzdFNvY2tldElkLCBldmVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGxvY2FsIHN0cmVhbSB0byB0aGUgY29ubmVjdGlvbiAoaWYgYXZhaWxhYmxlKSBzbyBpdCBjYW4gYmUgc2hhcmVkXG4gICAgaWYgKHRoaXMubG9jYWxNZWRpYVN0cmVhbSkge1xuICAgICAgZm9yIChjb25zdCB0cmFjayBvZiB0aGlzLmxvY2FsTWVkaWFTdHJlYW0uZ2V0VHJhY2tzKCkpIHtcbiAgICAgICAgcGVlckNvbm5lY3Rpb24uYWRkVHJhY2sodHJhY2spO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBjb25uZWN0aW9uIHRvIGxpc3Qgb2YgcGVlcnNcbiAgICB0aGlzLnBlZXJMaXN0LnB1c2goe2d1ZXN0U29ja2V0SWQsIHBlZXJDb25uZWN0aW9ufSk7XG5cbiAgICByZXR1cm4gcGVlckNvbm5lY3Rpb247XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIFJUQ1Nlc3Npb25EZXNjcmlwdGlvbkluaXQgKG9mZmVyKSBhbmQgYXNzaWduIHRvIGxvY2FsIFJUQ1BlZXJDb25uZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSBwZWVyQ29ubmVjdGlvbiBSVEMgQ29ubmVjdGlvblxuICAgKi9cbiAgcHJpdmF0ZSBhc3luYyBjcmVhdGVPZmZlcihwZWVyQ29ubmVjdGlvbjogUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICBjb25zdCBvZmZlciA9IGF3YWl0IHBlZXJDb25uZWN0aW9uLmNyZWF0ZU9mZmVyKHtvZmZlclRvUmVjZWl2ZVZpZGVvOiB0cnVlLCBvZmZlclRvUmVjZWl2ZUF1ZGlvOiB0cnVlfSk7XG4gICAgcGVlckNvbm5lY3Rpb24uc2V0TG9jYWxEZXNjcmlwdGlvbihvZmZlcik7XG4gICAgcmV0dXJuIG9mZmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBSVENTZXNzaW9uRGVzY3JpcHRpb25Jbml0IChhbnN3ZXIpIGFuZCBhc3NpZ24gdG8gbG9jYWwgUlRDUGVlckNvbm5lY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHBlZXJDb25uZWN0aW9uIFJUQyBDb25uZWN0aW9uXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGNyZWF0ZUFuc3dlcihwZWVyQ29ubmVjdGlvbjogUlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICBjb25zdCBhbnN3ZXIgPSBhd2FpdCBwZWVyQ29ubmVjdGlvbi5jcmVhdGVBbnN3ZXIoKTtcbiAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKGFuc3dlcik7XG4gICAgcmV0dXJuIGFuc3dlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgZXJyb3JzIGR1cmluZyB0aGUgc2lnbmFsbGluZyBwcm9jZXNzXG4gICAqXG4gICAqIEBwYXJhbSBlcnIgRXJyb3JcbiAgICovXG4gIHByaXZhdGUgaGFuZGxlRXJyb3IoZXJyOiBhbnkpIHtcbiAgICAvLyBUT0RPIC0gY3JlYXRlIGVycm9yIGhhbmRsaW5nIHByb2Nlc3NcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==