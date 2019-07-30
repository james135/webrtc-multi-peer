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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/public/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/public/index.ts":
/*!*****************************!*\
  !*** ./src/public/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var media_1 = __webpack_require__(/*! ./media */ "./src/public/media/index.ts");
var signalling_1 = __webpack_require__(/*! ./signalling */ "./src/public/signalling/index.ts");
var setLocalMediaStream = function (stream) {
    var localVideoEl = document.getElementById('localVideo');
    localVideoEl.srcObject = stream;
    return stream;
};
// Get Media
media_1.getUserMedia({ audio: false, video: true })
    .then(setLocalMediaStream)
    .then(function (stream) {
    new signalling_1.SignallingService(stream, null).create();
})["catch"](function (err) {
    console.log(err);
});


/***/ }),

/***/ "./src/public/media/index.ts":
/*!***********************************!*\
  !*** ./src/public/media/index.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getUserMedia = function (constraints) {
    if (navigator.mediaDevices === undefined) {
        return Promise.reject(new Error('navigator.mediaDevices is unavailable'));
    }
    return navigator.mediaDevices.getUserMedia(constraints);
};


/***/ }),

/***/ "./src/public/signalling/index.ts":
/*!****************************************!*\
  !*** ./src/public/signalling/index.ts ***!
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
        this.peerList = [];
    }
    SignallingService.prototype.create = function () {
        this.socket = io();
        this.registerListeners(this.socket);
    };
    // Setup Socket.IO listeners to manage the RTC Signalling process
    SignallingService.prototype.registerListeners = function (socket) {
        var _this = this;
        // Connected to Socket.IO server
        socket.on('connection_success', function (socketId) {
            console.log("Socket ID: [" + socketId + "]");
            // Store this sockets ID
            _this.socketId = socketId;
            // Request to join the room based on url path
            _this.socket.emit('join_request', location.pathname);
        });
        // Socket has joined the room
        socket.on('fresh_face', function (data) { return __awaiter(_this, void 0, void 0, function () {
            var peerConnection, offer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("A new socket has connected to '" + data.room_name + "': [" + data.socket_id + "]");
                        // Create an HTML Video container for this guests stream
                        this.insertVideoElement(data.socket_id);
                        peerConnection = this.createRTCPeerConnection(data.socket_id);
                        return [4 /*yield*/, this.createOffer(peerConnection)];
                    case 1:
                        offer = _a.sent();
                        // Signal the offer
                        this.socket.emit('signal_offer', { from: this.socketId, to: data.socket_id, offer: offer });
                        return [2 /*return*/];
                }
            });
        }); });
        // Socket being sent a RTCSessionDescriptionInit
        socket.on('offer_received', function (data) { return __awaiter(_this, void 0, void 0, function () {
            var peerConnection, answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        return [2 /*return*/];
                }
            });
        }); });
        socket.on('answer_received', function (data) { return __awaiter(_this, void 0, void 0, function () {
            var peerConnection;
            return __generator(this, function (_a) {
                console.log("Receiving an RTC answer from " + data.from);
                peerConnection = this.peerList.find(function (peer) { return peer.guestSocketId === data.from; }).peerConnection;
                peerConnection.setRemoteDescription(data.answer);
                return [2 /*return*/];
            });
        }); });
        socket.on('ice_received', function (data) { return __awaiter(_this, void 0, void 0, function () {
            var peerConnection;
            return __generator(this, function (_a) {
                console.log("Receiving an Ice Candidate from " + data.from);
                peerConnection = this.peerList.find(function (peer) { return peer.guestSocketId === data.from; }).peerConnection;
                peerConnection.addIceCandidate(new RTCIceCandidate({
                    sdpMLineIndex: data.iceCandidate.label,
                    candidate: data.iceCandidate.candidate
                }));
                return [2 /*return*/];
            });
        }); });
    };
    SignallingService.prototype.insertVideoElement = function (guestId) {
        var video = document.createElement('video');
        video.id = "guest-" + guestId;
        video.autoplay = true;
        document.getElementById('videos').appendChild(video);
    };
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
        // Add local stream to the connection so it can be shared
        console.log(this.localMediaStream.getTracks());
        for (var _i = 0, _a = this.localMediaStream.getTracks(); _i < _a.length; _i++) {
            var track = _a[_i];
            peerConnection.addTrack(track);
        }
        // Add connection to list of peers
        this.peerList.push({ guestSocketId: guestSocketId, peerConnection: peerConnection });
        return peerConnection;
    };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3B1YmxpYy9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcHVibGljL21lZGlhL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9wdWJsaWMvc2lnbmFsbGluZy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbkVBLGdGQUF1QztBQUN2QywrRkFBaUQ7QUFFakQsSUFBTSxtQkFBbUIsR0FBRyxVQUFDLE1BQW1CO0lBQzlDLElBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFxQixDQUFDO0lBQy9FLFlBQVksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBQ2hDLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFFRCxZQUFZO0FBQ1osb0JBQVksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO0tBQ3RDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztLQUN6QixJQUFJLENBQUMsZ0JBQU07SUFDVixJQUFJLDhCQUFpQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUMvQyxDQUFDLENBQUMsQ0FDRCxPQUFLLEVBQUMsVUFBQyxHQUFRO0lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuQixDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDakJRLG9CQUFZLEdBQUcsVUFBQyxXQUFtQztJQUM5RCxJQUFJLFNBQVMsQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO1FBQ3hDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLENBQUM7S0FDM0U7SUFDRCxPQUFPLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFELENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRUQ7SUFNRSwyQkFDVSxnQkFBNkIsRUFDN0IsZUFBaUM7UUFEakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFhO1FBQzdCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtRQUpuQyxhQUFRLEdBQXNCLEVBQUUsQ0FBQztJQUt0QyxDQUFDO0lBRUosa0NBQU0sR0FBTjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsaUVBQWlFO0lBQ3pELDZDQUFpQixHQUF6QixVQUEwQixNQUFXO1FBQXJDLGlCQWtEQztRQWhEQyxnQ0FBZ0M7UUFDaEMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxVQUFDLFFBQWdCO1lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWUsUUFBUSxNQUFHLENBQUMsQ0FBQztZQUN4Qyx3QkFBd0I7WUFDeEIsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDekIsNkNBQTZDO1lBQzdDLEtBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFFSCw2QkFBNkI7UUFDN0IsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBTyxJQUE0Qzs7Ozs7d0JBQ3pFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQWtDLElBQUksQ0FBQyxTQUFTLFlBQU8sSUFBSSxDQUFDLFNBQVMsTUFBRyxDQUFDLENBQUM7d0JBQ3RGLHdEQUF3RDt3QkFDeEQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzt3QkFFbEMsY0FBYyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3RELHFCQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDOzt3QkFBOUMsS0FBSyxHQUFHLFNBQXNDO3dCQUNwRCxtQkFBbUI7d0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssU0FBQyxDQUFDLENBQUM7Ozs7YUFDcEYsQ0FBQyxDQUFDO1FBRUgsZ0RBQWdEO1FBQ2hELE1BQU0sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsVUFBTyxJQUFrRTs7Ozs7d0JBQ25HLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQStCLElBQUksQ0FBQyxJQUFNLENBQUMsQ0FBQzt3QkFDeEQsd0RBQXdEO3dCQUN4RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUU3QixjQUFjLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDL0QsY0FBYyxDQUFDLG9CQUFvQixDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQzVELHFCQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDOzt3QkFBaEQsTUFBTSxHQUFHLFNBQXVDO3dCQUN0RCxvQkFBb0I7d0JBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sVUFBQyxDQUFDLENBQUM7Ozs7YUFDakYsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFPLElBQW1FOzs7Z0JBQ3JHLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWdDLElBQUksQ0FBQyxJQUFNLENBQUMsQ0FBQztnQkFDbkQsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQUksSUFBSSxXQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQWhDLENBQWdDLENBQUMsQ0FBQyxjQUFjLENBQUM7Z0JBQ25HLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7OzthQUNsRCxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxVQUFPLElBQWtGOzs7Z0JBQ2pILE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQW1DLElBQUksQ0FBQyxJQUFNLENBQUMsQ0FBQztnQkFDdEQsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQUksSUFBSSxXQUFJLENBQUMsYUFBYSxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQWhDLENBQWdDLENBQUMsQ0FBQyxjQUFjLENBQUM7Z0JBQ25HLGNBQWMsQ0FBQyxlQUFlLENBQUMsSUFBSSxlQUFlLENBQUM7b0JBQ2pELGFBQWEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUs7b0JBQ3RDLFNBQVMsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVM7aUJBQ3ZDLENBQUMsQ0FBQyxDQUFDOzs7YUFDTCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sOENBQWtCLEdBQTFCLFVBQTJCLE9BQWU7UUFDeEMsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxLQUFLLENBQUMsRUFBRSxHQUFHLFdBQVMsT0FBUyxDQUFDO1FBQzlCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFTyxtREFBdUIsR0FBL0IsVUFBZ0MsYUFBcUI7UUFBckQsaUJBaUNDO1FBaENDLCtCQUErQjtRQUMvQixJQUFNLGNBQWMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNuRSw0REFBNEQ7UUFDNUQsY0FBYyxDQUFDLGNBQWMsR0FBRyxlQUFLO1lBQ25DLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDbkIsSUFBTSxTQUFTLEdBQUc7b0JBQ2hCLEtBQUssRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLGFBQWE7b0JBQ3BDLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVM7aUJBQ3JDLENBQUM7Z0JBQ0YsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQzthQUNuRztRQUNILENBQUM7UUFDRCw4RUFBOEU7UUFDOUUsY0FBYyxDQUFDLE9BQU8sR0FBRyxlQUFLO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQThCLGFBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRSxJQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVUsYUFBZSxDQUFxQixDQUFDO1lBQzNGLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNyQyxZQUFZLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0M7aUJBQU07Z0JBQ0wsSUFBSSxhQUFhLEdBQUcsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsWUFBWSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7YUFDeEM7UUFDSCxDQUFDO1FBQ0QseURBQXlEO1FBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDL0MsS0FBb0IsVUFBaUMsRUFBakMsU0FBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxFQUFqQyxjQUFpQyxFQUFqQyxJQUFpQyxFQUFFO1lBQWxELElBQU0sS0FBSztZQUNkLGNBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7UUFDRCxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQyxhQUFhLGlCQUFFLGNBQWMsa0JBQUMsQ0FBQyxDQUFDO1FBRXBELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFYSx1Q0FBVyxHQUF6QixVQUEwQixjQUFpQzs7Ozs7NEJBQzNDLHFCQUFNLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFDLENBQUM7O3dCQUFoRyxLQUFLLEdBQUcsU0FBd0Y7d0JBQ3RHLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDMUMsc0JBQU8sS0FBSyxFQUFDOzs7O0tBQ2Q7SUFFYSx3Q0FBWSxHQUExQixVQUEyQixjQUFpQzs7Ozs7NEJBQzNDLHFCQUFNLGNBQWMsQ0FBQyxZQUFZLEVBQUU7O3dCQUE1QyxNQUFNLEdBQUcsU0FBbUM7d0JBQ2xELGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDM0Msc0JBQU8sTUFBTSxFQUFDOzs7O0tBQ2Y7SUFDSCx3QkFBQztBQUFELENBQUM7QUExSFksOENBQWlCIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvcHVibGljL2luZGV4LnRzXCIpO1xuIiwiaW1wb3J0IHsgZ2V0VXNlck1lZGlhIH0gZnJvbSAnLi9tZWRpYSc7XG5pbXBvcnQgeyBTaWduYWxsaW5nU2VydmljZSB9IGZyb20gJy4vc2lnbmFsbGluZyc7XG5cbmNvbnN0IHNldExvY2FsTWVkaWFTdHJlYW0gPSAoc3RyZWFtOiBNZWRpYVN0cmVhbSkgPT4ge1xuICBjb25zdCBsb2NhbFZpZGVvRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9jYWxWaWRlbycpIGFzIEhUTUxWaWRlb0VsZW1lbnQ7XG4gIGxvY2FsVmlkZW9FbC5zcmNPYmplY3QgPSBzdHJlYW07XG4gIHJldHVybiBzdHJlYW07XG59XG5cbi8vIEdldCBNZWRpYVxuZ2V0VXNlck1lZGlhKHthdWRpbzogZmFsc2UsIHZpZGVvOiB0cnVlfSlcbiAgLnRoZW4oc2V0TG9jYWxNZWRpYVN0cmVhbSlcbiAgLnRoZW4oc3RyZWFtID0+IHtcbiAgICBuZXcgU2lnbmFsbGluZ1NlcnZpY2Uoc3RyZWFtLCBudWxsKS5jcmVhdGUoKTtcbiAgfSlcbiAgLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGVycik7XG4gIH0pOyIsImV4cG9ydCBjb25zdCBnZXRVc2VyTWVkaWEgPSAoY29uc3RyYWludHM6IE1lZGlhU3RyZWFtQ29uc3RyYWludHMpID0+IHtcbiAgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ25hdmlnYXRvci5tZWRpYURldmljZXMgaXMgdW5hdmFpbGFibGUnKSk7XG4gIH1cbiAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKGNvbnN0cmFpbnRzKTtcbn0iLCJkZWNsYXJlIGNvbnN0IGlvO1xuXG5pbnRlcmZhY2UgR3Vlc3RDb25uZWN0aW9uIHtcbiAgZ3Vlc3RTb2NrZXRJZDogc3RyaW5nLFxuICBwZWVyQ29ubmVjdGlvbjogUlRDUGVlckNvbm5lY3Rpb24sXG59XG5cbmV4cG9ydCBjbGFzcyBTaWduYWxsaW5nU2VydmljZSB7XG5cbiAgcHJpdmF0ZSBzb2NrZXQ6IGFueTtcbiAgcHJpdmF0ZSBzb2NrZXRJZDogc3RyaW5nO1xuICBwcml2YXRlIHBlZXJMaXN0OiBHdWVzdENvbm5lY3Rpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgbG9jYWxNZWRpYVN0cmVhbTogTWVkaWFTdHJlYW0sXG4gICAgcHJpdmF0ZSBydGNTZXJ2ZXJDb25maWc6IFJUQ0NvbmZpZ3VyYXRpb24sXG4gICkge31cblxuICBjcmVhdGUoKSB7XG4gICAgdGhpcy5zb2NrZXQgPSBpbygpO1xuICAgIHRoaXMucmVnaXN0ZXJMaXN0ZW5lcnModGhpcy5zb2NrZXQpO1xuICB9XG5cbiAgLy8gU2V0dXAgU29ja2V0LklPIGxpc3RlbmVycyB0byBtYW5hZ2UgdGhlIFJUQyBTaWduYWxsaW5nIHByb2Nlc3NcbiAgcHJpdmF0ZSByZWdpc3Rlckxpc3RlbmVycyhzb2NrZXQ6IGFueSkge1xuXG4gICAgLy8gQ29ubmVjdGVkIHRvIFNvY2tldC5JTyBzZXJ2ZXJcbiAgICBzb2NrZXQub24oJ2Nvbm5lY3Rpb25fc3VjY2VzcycsIChzb2NrZXRJZDogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgU29ja2V0IElEOiBbJHtzb2NrZXRJZH1dYCk7XG4gICAgICAvLyBTdG9yZSB0aGlzIHNvY2tldHMgSURcbiAgICAgIHRoaXMuc29ja2V0SWQgPSBzb2NrZXRJZDtcbiAgICAgIC8vIFJlcXVlc3QgdG8gam9pbiB0aGUgcm9vbSBiYXNlZCBvbiB1cmwgcGF0aFxuICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnam9pbl9yZXF1ZXN0JywgbG9jYXRpb24ucGF0aG5hbWUpO1xuICAgIH0pO1xuXG4gICAgLy8gU29ja2V0IGhhcyBqb2luZWQgdGhlIHJvb21cbiAgICBzb2NrZXQub24oJ2ZyZXNoX2ZhY2UnLCBhc3luYyAoZGF0YToge3NvY2tldF9pZDogc3RyaW5nLCByb29tX25hbWU6IHN0cmluZ30pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBBIG5ldyBzb2NrZXQgaGFzIGNvbm5lY3RlZCB0byAnJHtkYXRhLnJvb21fbmFtZX0nOiBbJHtkYXRhLnNvY2tldF9pZH1dYCk7XG4gICAgICAvLyBDcmVhdGUgYW4gSFRNTCBWaWRlbyBjb250YWluZXIgZm9yIHRoaXMgZ3Vlc3RzIHN0cmVhbVxuICAgICAgdGhpcy5pbnNlcnRWaWRlb0VsZW1lbnQoZGF0YS5zb2NrZXRfaWQpO1xuICAgICAgLy8gU2V0dXAgYSBuZXcgUlRDIENvbm5lY3Rpb24gd2l0aCB0aGlzIHNvY2tldFxuICAgICAgY29uc3QgcGVlckNvbm5lY3Rpb24gPSB0aGlzLmNyZWF0ZVJUQ1BlZXJDb25uZWN0aW9uKGRhdGEuc29ja2V0X2lkKTtcbiAgICAgIGNvbnN0IG9mZmVyID0gYXdhaXQgdGhpcy5jcmVhdGVPZmZlcihwZWVyQ29ubmVjdGlvbik7XG4gICAgICAvLyBTaWduYWwgdGhlIG9mZmVyXG4gICAgICB0aGlzLnNvY2tldC5lbWl0KCdzaWduYWxfb2ZmZXInLCB7ZnJvbTogdGhpcy5zb2NrZXRJZCwgdG86IGRhdGEuc29ja2V0X2lkLCBvZmZlcn0pO1xuICAgIH0pO1xuXG4gICAgLy8gU29ja2V0IGJlaW5nIHNlbnQgYSBSVENTZXNzaW9uRGVzY3JpcHRpb25Jbml0XG4gICAgc29ja2V0Lm9uKCdvZmZlcl9yZWNlaXZlZCcsIGFzeW5jIChkYXRhOiB7ZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nLCBvZmZlcjogUlRDU2Vzc2lvbkRlc2NyaXB0aW9uSW5pdH0pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZpbmcgYW4gUlRDIG9mZmVyIGZyb20gJHtkYXRhLmZyb219YCk7XG4gICAgICAvLyBDcmVhdGUgYW4gSFRNTCBWaWRlbyBjb250YWluZXIgZm9yIHRoaXMgZ3Vlc3RzIHN0cmVhbVxuICAgICAgdGhpcy5pbnNlcnRWaWRlb0VsZW1lbnQoZGF0YS5mcm9tKTtcbiAgICAgIC8vIFNldHVwIGEgbmV3IFJUQyBDb25uZWN0aW9uIHdpdGggdGhpcyBzb2NrZXRcbiAgICAgIGNvbnN0IHBlZXJDb25uZWN0aW9uID0gdGhpcy5jcmVhdGVSVENQZWVyQ29ubmVjdGlvbihkYXRhLmZyb20pO1xuICAgICAgcGVlckNvbm5lY3Rpb24uc2V0UmVtb3RlRGVzY3JpcHRpb24obmV3IFJUQ1Nlc3Npb25EZXNjcmlwdGlvbihkYXRhLm9mZmVyKSk7XG4gICAgICBjb25zdCBhbnN3ZXIgPSBhd2FpdCB0aGlzLmNyZWF0ZUFuc3dlcihwZWVyQ29ubmVjdGlvbik7XG4gICAgICAvLyBTaWduYWwgdGhlIGFuc3dlclxuICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnc2lnbmFsX2Fuc3dlcicsIHtmcm9tOiB0aGlzLnNvY2tldElkLCB0bzogZGF0YS5mcm9tLCBhbnN3ZXJ9KTtcbiAgICB9KTtcblxuICAgIHNvY2tldC5vbignYW5zd2VyX3JlY2VpdmVkJywgYXN5bmMgKGRhdGE6IHtmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcsIGFuc3dlcjogUlRDU2Vzc2lvbkRlc2NyaXB0aW9uSW5pdH0pID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZpbmcgYW4gUlRDIGFuc3dlciBmcm9tICR7ZGF0YS5mcm9tfWApO1xuICAgICAgY29uc3QgcGVlckNvbm5lY3Rpb24gPSB0aGlzLnBlZXJMaXN0LmZpbmQocGVlciA9PiBwZWVyLmd1ZXN0U29ja2V0SWQgPT09IGRhdGEuZnJvbSkucGVlckNvbm5lY3Rpb247XG4gICAgICBwZWVyQ29ubmVjdGlvbi5zZXRSZW1vdGVEZXNjcmlwdGlvbihkYXRhLmFuc3dlcik7XG4gICAgfSk7XG5cbiAgICBzb2NrZXQub24oJ2ljZV9yZWNlaXZlZCcsIGFzeW5jIChkYXRhOiB7ZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nLCBpY2VDYW5kaWRhdGU6IHtsYWJlbDogbnVtYmVyLCBjYW5kaWRhdGU6IHN0cmluZ319KSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgUmVjZWl2aW5nIGFuIEljZSBDYW5kaWRhdGUgZnJvbSAke2RhdGEuZnJvbX1gKTtcbiAgICAgIGNvbnN0IHBlZXJDb25uZWN0aW9uID0gdGhpcy5wZWVyTGlzdC5maW5kKHBlZXIgPT4gcGVlci5ndWVzdFNvY2tldElkID09PSBkYXRhLmZyb20pLnBlZXJDb25uZWN0aW9uO1xuICAgICAgcGVlckNvbm5lY3Rpb24uYWRkSWNlQ2FuZGlkYXRlKG5ldyBSVENJY2VDYW5kaWRhdGUoe1xuICAgICAgICBzZHBNTGluZUluZGV4OiBkYXRhLmljZUNhbmRpZGF0ZS5sYWJlbCxcbiAgICAgICAgY2FuZGlkYXRlOiBkYXRhLmljZUNhbmRpZGF0ZS5jYW5kaWRhdGVcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaW5zZXJ0VmlkZW9FbGVtZW50KGd1ZXN0SWQ6IHN0cmluZykge1xuICAgIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICB2aWRlby5pZCA9IGBndWVzdC0ke2d1ZXN0SWR9YDtcbiAgICB2aWRlby5hdXRvcGxheSA9IHRydWU7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZpZGVvcycpLmFwcGVuZENoaWxkKHZpZGVvKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUlRDUGVlckNvbm5lY3Rpb24oZ3Vlc3RTb2NrZXRJZDogc3RyaW5nKSB7XG4gICAgLy8gQ3JlYXRlIHRoZSBSVENQZWVyQ29ubmVjdGlvblxuICAgIGNvbnN0IHBlZXJDb25uZWN0aW9uID0gbmV3IFJUQ1BlZXJDb25uZWN0aW9uKHRoaXMucnRjU2VydmVyQ29uZmlnKTtcbiAgICAvLyBTZXR1cCBldmVudCBsaXN0ZW5lcnMgZm9yIHRoaXMgUlRDUGVlckNvbm5lY3Rpb24gaW5zdGFuY2VcbiAgICBwZWVyQ29ubmVjdGlvbi5vbmljZWNhbmRpZGF0ZSA9IGV2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudC5jYW5kaWRhdGUpIHtcbiAgICAgICAgY29uc3QgY2FuZGlkYXRlID0ge1xuICAgICAgICAgIGxhYmVsOiBldmVudC5jYW5kaWRhdGUuc2RwTUxpbmVJbmRleCxcbiAgICAgICAgICBjYW5kaWRhdGU6IGV2ZW50LmNhbmRpZGF0ZS5jYW5kaWRhdGUsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc29ja2V0LmVtaXQoJ3NpZ25hbF9pY2UnLCB7ZnJvbTogdGhpcy5zb2NrZXRJZCwgdG86IGd1ZXN0U29ja2V0SWQsIGljZUNhbmRpZGF0ZTogY2FuZGlkYXRlfSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9SVENQZWVyQ29ubmVjdGlvbi9hZGRUcmFja1xuICAgIHBlZXJDb25uZWN0aW9uLm9udHJhY2sgPSBldmVudCA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhgUmVjZWl2aW5nIG1lZGlhIHRyYWNrIGZyb20gJHtndWVzdFNvY2tldElkfWAsIGV2ZW50KTtcbiAgICAgIGNvbnN0IGd1ZXN0VmlkZW9FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNndWVzdC0ke2d1ZXN0U29ja2V0SWR9YCkgYXMgSFRNTFZpZGVvRWxlbWVudDtcbiAgICAgIGlmIChldmVudC5zdHJlYW1zICYmIGV2ZW50LnN0cmVhbXNbMF0pIHtcbiAgICAgICAgZ3Vlc3RWaWRlb0VsLnNyY09iamVjdCA9IGV2ZW50LnN0cmVhbXNbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaW5ib3VuZFN0cmVhbSA9IG5ldyBNZWRpYVN0cmVhbShbZXZlbnQudHJhY2tdKTtcbiAgICAgICAgZ3Vlc3RWaWRlb0VsLnNyY09iamVjdCA9IGluYm91bmRTdHJlYW07XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEFkZCBsb2NhbCBzdHJlYW0gdG8gdGhlIGNvbm5lY3Rpb24gc28gaXQgY2FuIGJlIHNoYXJlZFxuICAgIGNvbnNvbGUubG9nKHRoaXMubG9jYWxNZWRpYVN0cmVhbS5nZXRUcmFja3MoKSk7XG4gICAgZm9yIChjb25zdCB0cmFjayBvZiB0aGlzLmxvY2FsTWVkaWFTdHJlYW0uZ2V0VHJhY2tzKCkpIHtcbiAgICAgIHBlZXJDb25uZWN0aW9uLmFkZFRyYWNrKHRyYWNrKTtcbiAgICB9XG4gICAgLy8gQWRkIGNvbm5lY3Rpb24gdG8gbGlzdCBvZiBwZWVyc1xuICAgIHRoaXMucGVlckxpc3QucHVzaCh7Z3Vlc3RTb2NrZXRJZCwgcGVlckNvbm5lY3Rpb259KTtcblxuICAgIHJldHVybiBwZWVyQ29ubmVjdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlT2ZmZXIocGVlckNvbm5lY3Rpb246IFJUQ1BlZXJDb25uZWN0aW9uKSB7XG4gICAgY29uc3Qgb2ZmZXIgPSBhd2FpdCBwZWVyQ29ubmVjdGlvbi5jcmVhdGVPZmZlcih7b2ZmZXJUb1JlY2VpdmVWaWRlbzogdHJ1ZSwgb2ZmZXJUb1JlY2VpdmVBdWRpbzogdHJ1ZX0pO1xuICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24ob2ZmZXIpO1xuICAgIHJldHVybiBvZmZlcjtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY3JlYXRlQW5zd2VyKHBlZXJDb25uZWN0aW9uOiBSVENQZWVyQ29ubmVjdGlvbikge1xuICAgIGNvbnN0IGFuc3dlciA9IGF3YWl0IHBlZXJDb25uZWN0aW9uLmNyZWF0ZUFuc3dlcigpO1xuICAgIHBlZXJDb25uZWN0aW9uLnNldExvY2FsRGVzY3JpcHRpb24oYW5zd2VyKTtcbiAgICByZXR1cm4gYW5zd2VyO1xuICB9XG59Il0sInNvdXJjZVJvb3QiOiIifQ==