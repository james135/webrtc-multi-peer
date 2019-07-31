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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/home/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/home/index.ts":
/*!***************************!*\
  !*** ./src/home/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

var createLinkButton = document.getElementById('create-link');
var gotoLinkButton = document.getElementById('goto-link');
var hiddenArea = document.getElementById('hidden-area');
var copyLinkInput = document.getElementById('copy-link');
var currentLink = null;
// Utilities
var createRandomString = function () {
    var rnd = Math.random().toString(36); // e.g. 0.m7dh26hf3
    return rnd.substring(2, rnd.length);
};
var createRandomLink = function () {
    return location.origin + "/video/" + createRandomString();
};
if (createLinkButton && gotoLinkButton) {
    createLinkButton.onclick = function () {
        currentLink = createRandomLink();
        copyLinkInput.value = currentLink;
        hiddenArea.style.display = 'block';
        copyLinkInput.select();
        document.execCommand('copy');
    };
    gotoLinkButton.onclick = function () {
        if (currentLink) {
            window.location.href = currentLink;
        }
    };
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2hvbWUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25FQSxJQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDaEUsSUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM1RCxJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzFELElBQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFxQixDQUFDO0FBRS9FLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQztBQUV2QixZQUFZO0FBRVosSUFBTSxrQkFBa0IsR0FBRztJQUN6QixJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsbUJBQW1CO0lBQzNELE9BQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFFRCxJQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLE9BQVUsUUFBUSxDQUFDLE1BQU0sZUFBVSxrQkFBa0IsRUFBSSxDQUFDO0FBQzVELENBQUMsQ0FBQztBQUVGLElBQUksZ0JBQWdCLElBQUksY0FBYyxFQUFFO0lBQ3RDLGdCQUFnQixDQUFDLE9BQU8sR0FBRztRQUN6QixXQUFXLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxhQUFhLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQztRQUNsQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDbkMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELGNBQWMsQ0FBQyxPQUFPLEdBQUc7UUFDdkIsSUFBSSxXQUFXLEVBQUU7WUFDZixNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7U0FDcEM7SUFDSCxDQUFDO0NBQ0YiLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9ob21lL2luZGV4LnRzXCIpO1xuIiwiY29uc3QgY3JlYXRlTGlua0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdGUtbGluaycpO1xuY29uc3QgZ290b0xpbmtCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ290by1saW5rJyk7XG5jb25zdCBoaWRkZW5BcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hpZGRlbi1hcmVhJyk7XG5jb25zdCBjb3B5TGlua0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvcHktbGluaycpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbmxldCBjdXJyZW50TGluayA9IG51bGw7XG5cbi8vIFV0aWxpdGllc1xuXG5jb25zdCBjcmVhdGVSYW5kb21TdHJpbmcgPSAoKSA9PiB7XG4gIGNvbnN0IHJuZCA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpOyAvLyBlLmcuIDAubTdkaDI2aGYzXG4gIHJldHVybiBybmQuc3Vic3RyaW5nKDIsIHJuZC5sZW5ndGgpO1xufVxuXG5jb25zdCBjcmVhdGVSYW5kb21MaW5rID0gKCkgPT4ge1xuICByZXR1cm4gYCR7bG9jYXRpb24ub3JpZ2lufS92aWRlby8ke2NyZWF0ZVJhbmRvbVN0cmluZygpfWA7XG59O1xuXG5pZiAoY3JlYXRlTGlua0J1dHRvbiAmJiBnb3RvTGlua0J1dHRvbikge1xuICBjcmVhdGVMaW5rQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgY3VycmVudExpbmsgPSBjcmVhdGVSYW5kb21MaW5rKCk7XG4gICAgY29weUxpbmtJbnB1dC52YWx1ZSA9IGN1cnJlbnRMaW5rO1xuICAgIGhpZGRlbkFyZWEuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgY29weUxpbmtJbnB1dC5zZWxlY3QoKTtcbiAgICBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpO1xuICB9XG4gIGdvdG9MaW5rQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgaWYgKGN1cnJlbnRMaW5rKSB7XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGN1cnJlbnRMaW5rO1xuICAgIH1cbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=