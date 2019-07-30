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
// Assign browsers media stream to <video></video> element
var setLocalMediaStream = function (stream) {
    var localVideoEl = document.getElementById('localVideo');
    localVideoEl.srcObject = stream;
    return stream;
};
// Get Media and setup the signalling service if successful
media_1.getUserMedia({ audio: false, video: true })
    .then(setLocalMediaStream)
    .then(function (stream) {
    // https://developer.mozilla.org/en-US/docs/Web/API/RTCIceServer#Example
    var config = {
        'iceServers': [
            {
                'urls': [
                    'stun:stun.l.google.com:19302',
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                    'stun:stun3.l.google.com:19302',
                    'stun:stun4.l.google.com:19302',
                ]
            },
        ],
    };
    new signalling_1.SignallingService(stream, config).create();
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
    function SignallingService(localMediaStream, rtcServerConfig) {
        this.localMediaStream = localMediaStream;
        this.rtcServerConfig = rtcServerConfig;
        this.peerList = []; // List of RTC connected peers
        this.roomName = location.pathname;
    }
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
                        // Create an HTML Video container for this guests stream
                        this.insertVideoElement(data.socket_id);
                        peerConnection = this.createRTCPeerConnection(data.socket_id);
                        return [4 /*yield*/, this.createOffer(peerConnection)];
                    case 1:
                        offer = _a.sent();
                        // Signal the offer
                        this.socket.emit('signal_offer', { from: this.socketId, to: data.socket_id, offer: offer });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        // A guest socket has left the room
        socket.on('bye_friend', function (data) {
            console.log("A socket has left '" + data.room_name + "': [" + data.socket_id + "]");
            // clean up resources
            // 1. Remove <video></video> element
            var guestVideoEl = document.querySelector("#guest-" + data.socket_id);
            if (guestVideoEl) {
                document.getElementById('videos').removeChild(guestVideoEl);
            }
            // 2. Close RTC connection
            var peerIndex = _this.peerList.findIndex(function (peer) { return peer.guestSocketId === data.socket_id; });
            var peer = _this.peerList[peerIndex];
            if (peer && peer.peerConnection) {
                peer.peerConnection.close();
            }
            // 3. Update peer list
            _this.peerList.splice(peerIndex, 1);
        });
        // Socket being sent a RTCSessionDescriptionInit as an offer
        socket.on('offer_received', function (data) { return __awaiter(_this, void 0, void 0, function () {
            var peerConnection, answer, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log("Receiving an RTC offer from " + data.from);
                        // Create an HTML Video container for this guests stream
                        this.insertVideoElement(data.from);
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
                        console.log(err_2);
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
     * Create a <video></video> element for the guest
     *
     * @param guestId Guest socket ID assigned as elements id=""
     */
    SignallingService.prototype.insertVideoElement = function (guestId) {
        var video = document.createElement('video');
        video.id = "guest-" + guestId;
        video.autoplay = true;
        document.getElementById('videos').appendChild(video);
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
            var guestVideoEl = document.querySelector("#guest-" + guestSocketId);
            if (event.streams && event.streams[0]) {
                guestVideoEl.srcObject = event.streams[0];
            }
            else {
                var inboundStream = new MediaStream([event.track]);
                guestVideoEl.srcObject = inboundStream;
            }
        };
        console.log(this.localMediaStream.getTracks());
        // Add local stream to the connection so it can be shared
        for (var _i = 0, _a = this.localMediaStream.getTracks(); _i < _a.length; _i++) {
            var track = _a[_i];
            peerConnection.addTrack(track);
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
    return SignallingService;
}());
exports.SignallingService = SignallingService;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NvY2tldC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc29ja2V0L21lZGlhL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9zb2NrZXQvc2lnbmFsbGluZy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBLGdGQUF1QztBQUN2QywrRkFBaUQ7QUFFakQsMERBQTBEO0FBQzFELElBQU0sbUJBQW1CLEdBQUcsVUFBQyxNQUFtQjtJQUM5QyxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBcUIsQ0FBQztJQUMvRSxZQUFZLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztJQUNoQyxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsMkRBQTJEO0FBQzNELG9CQUFZLENBQUMsRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztLQUN0QyxJQUFJLENBQUMsbUJBQW1CLENBQUM7S0FDekIsSUFBSSxDQUFDLGdCQUFNO0lBQ1Ysd0VBQXdF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QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUMvQyx5REFBeUQ7UUFDekQsS0FBb0IsVUFBaUMsRUFBakMsU0FBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxFQUFqQyxjQUFpQyxFQUFqQyxJQUFpQyxFQUFFO1lBQWxELElBQU0sS0FBSztZQUNkLGNBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7UUFDRCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxhQUFhLGlCQUFFLGNBQWMsa0JBQUMsQ0FBQyxDQUFDO1FBRXBELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ1csdUNBQVcsR0FBekIsVUFBMEIsY0FBaUM7Ozs7OzRCQUMzQyxxQkFBTSxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUMsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBQyxDQUFDOzt3QkFBaEcsS0FBSyxHQUFHLFNBQXdGO3dCQUN0RyxjQUFjLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzFDLHNCQUFPLEtBQUssRUFBQzs7OztLQUNkO0lBRUQ7Ozs7T0FJRztJQUNXLHdDQUFZLEdBQTFCLFVBQTJCLGNBQWlDOzs7Ozs0QkFDM0MscUJBQU0sY0FBYyxDQUFDLFlBQVksRUFBRTs7d0JBQTVDLE1BQU0sR0FBRyxTQUFtQzt3QkFDbEQsY0FBYyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO3dCQUMzQyxzQkFBTyxNQUFNLEVBQUM7Ozs7S0FDZjtJQUNILHdCQUFDO0FBQUQsQ0FBQztBQWpNWSw4Q0FBaUIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zb2NrZXQvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBnZXRVc2VyTWVkaWEgfSBmcm9tICcuL21lZGlhJztcbmltcG9ydCB7IFNpZ25hbGxpbmdTZXJ2aWNlIH0gZnJvbSAnLi9zaWduYWxsaW5nJztcblxuLy8gQXNzaWduIGJyb3dzZXJzIG1lZGlhIHN0cmVhbSB0byA8dmlkZW8+PC92aWRlbz4gZWxlbWVudFxuY29uc3Qgc2V0TG9jYWxNZWRpYVN0cmVhbSA9IChzdHJlYW06IE1lZGlhU3RyZWFtKSA9PiB7XG4gIGNvbnN0IGxvY2FsVmlkZW9FbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2NhbFZpZGVvJykgYXMgSFRNTFZpZGVvRWxlbWVudDtcbiAgbG9jYWxWaWRlb0VsLnNyY09iamVjdCA9IHN0cmVhbTtcbiAgcmV0dXJuIHN0cmVhbTtcbn1cblxuLy8gR2V0IE1lZGlhIGFuZCBzZXR1cCB0aGUgc2lnbmFsbGluZyBzZXJ2aWNlIGlmIHN1Y2Nlc3NmdWxcbmdldFVzZXJNZWRpYSh7YXVkaW86IGZhbHNlLCB2aWRlbzogdHJ1ZX0pXG4gIC50aGVuKHNldExvY2FsTWVkaWFTdHJlYW0pXG4gIC50aGVuKHN0cmVhbSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1JUQ0ljZVNlcnZlciNFeGFtcGxlXG4gICAgY29uc3QgY29uZmlnOiBSVENDb25maWd1cmF0aW9uID0ge1xuICAgICAgJ2ljZVNlcnZlcnMnOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAndXJscyc6IFtcbiAgICAgICAgICAgICdzdHVuOnN0dW4ubC5nb29nbGUuY29tOjE5MzAyJyxcbiAgICAgICAgICAgICdzdHVuOnN0dW4xLmwuZ29vZ2xlLmNvbToxOTMwMicsXG4gICAgICAgICAgICAnc3R1bjpzdHVuMi5sLmdvb2dsZS5jb206MTkzMDInLFxuICAgICAgICAgICAgJ3N0dW46c3R1bjMubC5nb29nbGUuY29tOjE5MzAyJyxcbiAgICAgICAgICAgICdzdHVuOnN0dW40LmwuZ29vZ2xlLmNvbToxOTMwMicsXG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICAgIG5ldyBTaWduYWxsaW5nU2VydmljZShzdHJlYW0sIGNvbmZpZykuY3JlYXRlKCk7XG4gIH0pXG4gIC5jYXRjaCgoZXJyOiBhbnkpID0+IHtcbiAgICBjb25zb2xlLmxvZyhlcnIpO1xuICB9KTsiLCIvKipcbiAqIEdldCBNZWRpYSBmb3IgdGhpcyBicm93c2VyIGkuZS4gYWNjZXNzIFdlYmNhbSBhbmQgTWljcm9waG9uZVxuICpcbiAqIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01lZGlhRGV2aWNlcy9nZXRVc2VyTWVkaWFcbiAqIC0gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01lZGlhU3RyZWFtQ29uc3RyYWludHNcbiAqIEBwYXJhbSBjb25zdHJhaW50cyBNZWRpYVN0cmVhbUNvbnN0cmFpbnRzXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRVc2VyTWVkaWEgPSAoY29uc3RyYWludHM6IE1lZGlhU3RyZWFtQ29uc3RyYWludHMpID0+IHtcbiAgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ25hdmlnYXRvci5tZWRpYURldmljZXMgaXMgdW5hdmFpbGFibGUnKSk7XG4gIH1cbiAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKTtcbn0iLCJkZWNsYXJlIGNvbnN0IGlvOyAvLyBHbG9iYWwgU29ja2V0LklPIG9iamVjdFxuXG5pbnRlcmZhY2UgR3Vlc3RDb25uZWN0aW9uIHtcbiAgZ3Vlc3RTb2NrZXRJZDogc3RyaW5nLCAvLyBJRCBvZiBwZWVycyBzb2NrZXQgY29ubmVjdGlvblxuICBwZWVyQ29ubmVjdGlvbjogUlRDUGVlckNvbm5lY3Rpb24sIC8vIExvY2FsIFJUQyBjb25uZWN0aW9uIGZvciB0aGlzIHBlZXJcbn1cblxuZXhwb3J0IGNsYXNzIFNpZ25hbGxpbmdTZXJ2aWNlIHtcblxuICBwcml2YXRlIHNvY2tldDogYW55OyAgLy8gU29ja2V0LklPXG4gIHByaXZhdGUgc29ja2V0SWQ6IHN0cmluZzsgLy8gSUQgb2YgdGhpcyBicm93c2VycyBzb2NrZXQgY29ubmVjdGlvblxuICBwcml2YXRlIHBlZXJMaXN0OiBHdWVzdENvbm5lY3Rpb25bXSA9IFtdOyAvLyBMaXN0IG9mIFJUQyBjb25uZWN0ZWQgcGVlcnNcbiAgcHJpdmF0ZSByb29tTmFtZSA9IGxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbG9jYWxNZWRpYVN0cmVhbTogTWVkaWFTdHJlYW0sXG4gICAgcHJpdmF0ZSBydGNTZXJ2ZXJDb25maWc6IFJUQ0NvbmZpZ3VyYXRpb24sXG4gICkge31cblxuICBjcmVhdGUoKSB7XG4gICAgdGhpcy5zb2NrZXQgPSBpbygpO1xuICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnModGhpcy5zb2NrZXQpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmxvYWQnLCAoKSA9PiB7XG4gICAgICAvLyBOb3RpZnkgb3RoZXIgc29ja2V0c1xuICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnZXhpdF9yb29tJywgdGhpcy5yb29tTmFtZSk7XG4gICAgICAvLyBDbGVhbiB1cCBjb25uZWN0aW9uc1xuICAgICAgZm9yIChjb25zdCBwZWVyIG9mIHRoaXMucGVlckxpc3QpIHtcbiAgICAgICAgcGVlci5wZWVyQ29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHVwIFNvY2tldC5JTyBsaXN0ZW5lcnMgdG8gbWFuYWdlIHRoZSBSVEMgU2lnbmFsbGluZyBwcm9jZXNzXG4gICAqXG4gICAqIEBwYXJhbSBzb2NrZXQgR2xvYmFsIFNvY2tldC5JTyBvYmplY3RcbiAgICovXG4gIHByaXZhdGUgcmVnaXN0ZXJMaXN0ZW5lcnMoc29ja2V0OiBhbnkpIHtcblxuICAgIC8vIENvbm5lY3RlZCB0byBTb2NrZXQuSU8gc2VydmVyXG4gICAgc29ja2V0Lm9uKCdjb25uZWN0aW9uX3N1Y2Nlc3MnLCAoc29ja2V0SWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFNvY2tldCBJRDogWyR7c29ja2V0SWR9XWApO1xuICAgICAgLy8gU3RvcmUgdGhpcyBzb2NrZXRzIElEXG4gICAgICB0aGlzLnNvY2tldElkID0gc29ja2V0SWQ7XG4gICAgICAvLyBSZXF1ZXN0IHRvIGpvaW4gdGhlIHJvb20gYmFzZWQgb24gdXJsIHBhdGhcbiAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ2pvaW5fcmVxdWVzdCcsIHRoaXMucm9vbU5hbWUpO1xuICAgIH0pO1xuXG4gICAgLy8gQSBndWVzdCBzb2NrZXQgaGFzIGpvaW5lZCB0aGUgcm9vbVxuICAgIHNvY2tldC5vbignZnJlc2hfZmFjZScsIGFzeW5jIChkYXRhOiB7c29ja2V0X2lkOiBzdHJpbmcsIHJvb21fbmFtZTogc3RyaW5nfSkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc29sZS5sb2coYEEgbmV3IHNvY2tldCBoYXMgY29ubmVjdGVkIHRvICcke2RhdGEucm9vbV9uYW1lfSc6IFske2RhdGEuc29ja2V0X2lkfV1gKTtcbiAgICAgICAgLy8gQ3JlYXRlIGFuIEhUTUwgVmlkZW8gY29udGFpbmVyIGZvciB0aGlzIGd1ZXN0cyBzdHJlYW1cbiAgICAgICAgdGhpcy5pbnNlcnRWaWRlb0VsZW1lbnQoZGF0YS5zb2NrZXRfaWQpO1xuICAgICAgICAvLyBTZXR1cCBhIG5ldyBSVEMgQ29ubmVjdGlvbiB3aXRoIHRoaXMgc29ja2V0XG4gICAgICAgIGNvbnN0IHBlZXJDb25uZWN0aW9uID0gdGhpcy5jcmVhdGVSVENQZWVyQ29ubmVjdGlvbihkYXRhLnNvY2tldF9pZCk7XG4gICAgICAgIGNvbnN0IG9mZmVyID0gYXdhaXQgdGhpcy5jcmVhdGVPZmZlcihwZWVyQ29ubmVjdGlvbik7XG4gICAgICAgIC8vIFNpZ25hbCB0aGUgb2ZmZXJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnc2lnbmFsX29mZmVyJywge2Zyb206IHRoaXMuc29ja2V0SWQsIHRvOiBkYXRhLnNvY2tldF9pZCwgb2ZmZXJ9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gQSBndWVzdCBzb2NrZXQgaGFzIGxlZnQgdGhlIHJvb21cbiAgICBzb2NrZXQub24oJ2J5ZV9mcmllbmQnLCAoZGF0YToge3NvY2tldF9pZDogc3RyaW5nLCByb29tX25hbWU6IHN0cmluZ30pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBBIHNvY2tldCBoYXMgbGVmdCAnJHtkYXRhLnJvb21fbmFtZX0nOiBbJHtkYXRhLnNvY2tldF9pZH1dYCk7XG4gICAgICAvLyBjbGVhbiB1cCByZXNvdXJjZXNcbiAgICAgIC8vIDEuIFJlbW92ZSA8dmlkZW8+PC92aWRlbz4gZWxlbWVudFxuICAgICAgY29uc3QgZ3Vlc3RWaWRlb0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2d1ZXN0LSR7ZGF0YS5zb2NrZXRfaWR9YCkgYXMgSFRNTFZpZGVvRWxlbWVudDtcbiAgICAgIGlmIChndWVzdFZpZGVvRWwpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvcycpLnJlbW92ZUNoaWxkKGd1ZXN0VmlkZW9FbCk7XG4gICAgICB9XG4gICAgICAvLyAyLiBDbG9zZSBSVEMgY29ubmVjdGlvblxuICAgICAgY29uc3QgcGVlckluZGV4ID0gdGhpcy5wZWVyTGlzdC5maW5kSW5kZXgocGVlciA9PiBwZWVyLmd1ZXN0U29ja2V0SWQgPT09IGRhdGEuc29ja2V0X2lkKTtcbiAgICAgIGNvbnN0IHBlZXIgPSB0aGlzLnBlZXJMaXN0W3BlZXJJbmRleF07XG4gICAgICBpZiAocGVlciAmJiBwZWVyLnBlZXJDb25uZWN0aW9uKSB7XG4gICAgICAgIHBlZXIucGVlckNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgIH1cbiAgICAgIC8vIDMuIFVwZGF0ZSBwZWVyIGxpc3RcbiAgICAgIHRoaXMucGVlckxpc3Quc3BsaWNlKHBlZXJJbmRleCwgMSk7XG4gICAgfSk7XG5cbiAgICAvLyBTb2NrZXQgYmVpbmcgc2VudCBhIFJUQ1Nlc3Npb25EZXNjcmlwdGlvbkluaXQgYXMgYW4gb2ZmZXJcbiAgICBzb2NrZXQub24oJ29mZmVyX3JlY2VpdmVkJywgYXN5bmMgKGRhdGE6IHtmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcsIG9mZmVyOiBSVENTZXNzaW9uRGVzY3JpcHRpb25Jbml0fSkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc29sZS5sb2coYFJlY2VpdmluZyBhbiBSVEMgb2ZmZXIgZnJvbSAke2RhdGEuZnJvbX1gKTtcbiAgICAgICAgLy8gQ3JlYXRlIGFuIEhUTUwgVmlkZW8gY29udGFpbmVyIGZvciB0aGlzIGd1ZXN0cyBzdHJlYW1cbiAgICAgICAgdGhpcy5pbnNlcnRWaWRlb0VsZW1lbnQoZGF0YS5mcm9tKTtcbiAgICAgICAgLy8gU2V0dXAgYSBuZXcgUlRDIENvbm5lY3Rpb24gd2l0aCB0aGlzIHNvY2tldFxuICAgICAgICBjb25zdCBwZWVyQ29ubmVjdGlvbiA9IHRoaXMuY3JlYXRlUlRDUGVlckNvbm5lY3Rpb24oZGF0YS5mcm9tKTtcbiAgICAgICAgcGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihkYXRhLm9mZmVyKSk7XG4gICAgICAgIGNvbnN0IGFuc3dlciA9IGF3YWl0IHRoaXMuY3JlYXRlQW5zd2VyKHBlZXJDb25uZWN0aW9uKTtcbiAgICAgICAgLy8gU2lnbmFsIHRoZSBhbnN3ZXJcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnc2lnbmFsX2Fuc3dlcicsIHtmcm9tOiB0aGlzLnNvY2tldElkLCB0bzogZGF0YS5mcm9tLCBhbnN3ZXJ9KTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gU29ja2V0IGJlaW5nIHNlbnQgYXMgYW4gYW5zd2VyXG4gICAgc29ja2V0Lm9uKCdhbnN3ZXJfcmVjZWl2ZWQnLCBhc3luYyAoZGF0YToge2Zyb206IHN0cmluZywgdG86IHN0cmluZywgYW5zd2VyOiBSVENTZXNzaW9uRGVzY3JpcHRpb25Jbml0fSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFJlY2VpdmluZyBhbiBSVEMgYW5zd2VyIGZyb20gJHtkYXRhLmZyb219YCk7XG4gICAgICAvLyBGaW5kIHRoZSBsb2NhbCBSVEMgY29ubmVjdGlvbiBmb3IgdGhpcyBwYXJ0aWN1bGFyIGd1ZXN0XG4gICAgICBjb25zdCBwZWVyID0gdGhpcy5wZWVyTGlzdC5maW5kKHBlZXIgPT4gcGVlci5ndWVzdFNvY2tldElkID09PSBkYXRhLmZyb20pO1xuICAgICAgaWYgKHBlZXIpIHtcbiAgICAgICAgLy8gQXNzaWduIHRoZSBBbnN3ZXJcbiAgICAgICAgcGVlci5wZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihkYXRhLmFuc3dlcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBTb2NrZXQgYmVpbmcgc2VudCBhbiBJY2UgQ2FuZGlkYXRlXG4gICAgc29ja2V0Lm9uKCdpY2VfcmVjZWl2ZWQnLCBhc3luYyAoZGF0YToge2Zyb206IHN0cmluZywgdG86IHN0cmluZywgaWNlQ2FuZGlkYXRlOiB7bGFiZWw6IG51bWJlciwgY2FuZGlkYXRlOiBzdHJpbmd9fSkgPT4ge1xuICAgICAgY29uc29sZS5sb2coYFJlY2VpdmluZyBhbiBJY2UgQ2FuZGlkYXRlIGZyb20gJHtkYXRhLmZyb219YCk7XG4gICAgICAvLyBGaW5kIHRoZSBsb2NhbCBSVEMgY29ubmVjdGlvbiBmb3IgdGhpcyBwYXJ0aWN1bGFyIGd1ZXN0XG4gICAgICBjb25zdCBwZWVyID0gdGhpcy5wZWVyTGlzdC5maW5kKHBlZXIgPT4gcGVlci5ndWVzdFNvY2tldElkID09PSBkYXRhLmZyb20pO1xuICAgICAgaWYgKHBlZXIpIHtcbiAgICAgICAgLy8gQWRkIHRoZSBjYW5kaWRhdGVcbiAgICAgICAgcGVlci5wZWVyQ29ubmVjdGlvbi5hZGRJY2VDYW5kaWRhdGUobmV3IFJUQ0ljZUNhbmRpZGF0ZSh7XG4gICAgICAgICAgc2RwTUxpbmVJbmRleDogZGF0YS5pY2VDYW5kaWRhdGUubGFiZWwsXG4gICAgICAgICAgY2FuZGlkYXRlOiBkYXRhLmljZUNhbmRpZGF0ZS5jYW5kaWRhdGVcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIDx2aWRlbz48L3ZpZGVvPiBlbGVtZW50IGZvciB0aGUgZ3Vlc3RcbiAgICpcbiAgICogQHBhcmFtIGd1ZXN0SWQgR3Vlc3Qgc29ja2V0IElEIGFzc2lnbmVkIGFzIGVsZW1lbnRzIGlkPVwiXCJcbiAgICovXG4gIHByaXZhdGUgaW5zZXJ0VmlkZW9FbGVtZW50KGd1ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICB2aWRlby5pZCA9IGBndWVzdC0ke2d1ZXN0SWR9YDtcbiAgICB2aWRlby5hdXRvcGxheSA9IHRydWU7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvcycpLmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gUlRDUGVlckNvbm5lY3Rpb24gZm9yIGEgbmV3IGd1ZXN0XG4gICAqXG4gICAqIEBwYXJhbSBndWVzdFNvY2tldElkIEd1ZXN0IHNvY2tldCBJRFxuICAgKi9cbiAgcHJpdmF0ZSBjcmVhdGVSVENQZWVyQ29ubmVjdGlvbihndWVzdFNvY2tldElkOiBzdHJpbmcpIHtcbiAgICAvLyBDcmVhdGUgdGhlIFJUQ1BlZXJDb25uZWN0aW9uXG4gICAgY29uc3QgcGVlckNvbm5lY3Rpb24gPSBuZXcgUlRDUGVlckNvbm5lY3Rpb24odGhpcy5ydGNTZXJ2ZXJDb25maWcpO1xuICAgIC8vIFNldHVwIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhpcyBSVENQZWVyQ29ubmVjdGlvbiBpbnN0YW5jZVxuICAgIHBlZXJDb25uZWN0aW9uLm9uaWNlY2FuZGlkYXRlID0gZXZlbnQgPT4ge1xuICAgICAgaWYgKGV2ZW50LmNhbmRpZGF0ZSkge1xuICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB7XG4gICAgICAgICAgbGFiZWw6IGV2ZW50LmNhbmRpZGF0ZS5zZHBNTGluZUluZGV4LFxuICAgICAgICAgIGNhbmRpZGF0ZTogZXZlbnQuY2FuZGlkYXRlLmNhbmRpZGF0ZSxcbiAgICAgICAgfTtcbiAgICAgICAgLy8gU2lnbmFsIHRoZSBJY2UgQ2FuZGlkYXRlXG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3NpZ25hbF9pY2UnLCB7ZnJvbTogdGhpcy5zb2NrZXRJZCwgdG86IGd1ZXN0U29ja2V0SWQsIGljZUNhbmRpZGF0ZTogY2FuZGlkYXRlfSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9SVENQZWVyQ29ubmVjdGlvbi9hZGRUcmFja1xuICAgIHBlZXJDb25uZWN0aW9uLm9udHJhY2sgPSBldmVudCA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgUmVjZWl2aW5nIG1lZGlhIHRyYWNrIGZyb20gJHtndWVzdFNvY2tldElkfWAsIGV2ZW50KTtcbiAgICAgIGNvbnN0IGd1ZXN0VmlkZW9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNndWVzdC0ke2d1ZXN0U29ja2V0SWR9YCkgYXMgSFRNTFZpZGVvRWxlbWVudDtcbiAgICAgIGlmIChldmVudC5zdHJlYW1zICYmIGV2ZW50LnN0cmVhbXNbMF0pIHtcbiAgICAgICAgZ3Vlc3RWaWRlb0VsLnNyY09iamVjdCA9IGV2ZW50LnN0cmVhbXNbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaW5ib3VuZFN0cmVhbSA9IG5ldyBNZWRpYVN0cmVhbShbZXZlbnQudHJhY2tdKTtcbiAgICAgICAgZ3Vlc3RWaWRlb0VsLnNyY09iamVjdCA9IGluYm91bmRTdHJlYW07XG4gICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKHRoaXMubG9jYWxNZWRpYVN0cmVhbS5nZXRUcmFja3MoKSk7XG4gICAgLy8gQWRkIGxvY2FsIHN0cmVhbSB0byB0aGUgY29ubmVjdGlvbiBzbyBpdCBjYW4gYmUgc2hhcmVkXG4gICAgZm9yIChjb25zdCB0cmFjayBvZiB0aGlzLmxvY2FsTWVkaWFTdHJlYW0uZ2V0VHJhY2tzKCkpIHtcbiAgICAgIHBlZXJDb25uZWN0aW9uLmFkZFRyYWNrKHRyYWNrKTtcbiAgICB9XG4gICAgLy8gQWRkIGNvbm5lY3Rpb24gdG8gbGlzdCBvZiBwZWVyc1xuICAgIHRoaXMucGVlckxpc3QucHVzaCh7Z3Vlc3RTb2NrZXRJZCwgcGVlckNvbm5lY3Rpb259KTtcblxuICAgIHJldHVybiBwZWVyQ29ubmVjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYW4gUlRDU2Vzc2lvbkRlc2NyaXB0aW9uSW5pdCAob2ZmZXIpIGFuZCBhc3NpZ24gdG8gbG9jYWwgUlRDUGVlckNvbm5lY3Rpb25cbiAgICpcbiAgICogQHBhcmFtIHBlZXJDb25uZWN0aW9uIFJUQyBDb25uZWN0aW9uXG4gICAqL1xuICBwcml2YXRlIGFzeW5jIGNyZWF0ZU9mZmVyKHBlZXJDb25uZWN0aW9uOiBSVENQZWVyQ29ubmVjdGlvbikge1xuICAgIGNvbnN0IG9mZmVyID0gYXdhaXQgcGVlckNvbm5lY3Rpb24uY3JlYXRlT2ZmZXIoe29mZmVyVG9SZWNlaXZlVmlkZW86IHRydWUsIG9mZmVyVG9SZWNlaXZlQXVkaW86IHRydWV9KTtcbiAgICBwZWVyQ29ubmVjdGlvbi5zZXRMb2NhbERlc2NyaXB0aW9uKG9mZmVyKTtcbiAgICByZXR1cm4gb2ZmZXI7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGFuIFJUQ1Nlc3Npb25EZXNjcmlwdGlvbkluaXQgKGFuc3dlcikgYW5kIGFzc2lnbiB0byBsb2NhbCBSVENQZWVyQ29ubmVjdGlvblxuICAgKlxuICAgKiBAcGFyYW0gcGVlckNvbm5lY3Rpb24gUlRDIENvbm5lY3Rpb25cbiAgICovXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlQW5zd2VyKHBlZXJDb25uZWN0aW9uOiBSVENQZWVyQ29ubmVjdGlvbikge1xuICAgIGNvbnN0IGFuc3dlciA9IGF3YWl0IHBlZXJDb25uZWN0aW9uLmNyZWF0ZUFuc3dlcigpO1xuICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oYW5zd2VyKTtcbiAgICByZXR1cm4gYW5zd2VyO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==