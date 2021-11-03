/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/commentSection.js":
/*!*****************************************!*\
  !*** ./src/client/js/commentSection.js ***!
  \*****************************************/
/***/ (() => {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar videoContainer = document.getElementById(\"videoContainer\");\nvar form = document.getElementById(\"commentForm\");\n\nvar addComment = function addComment(text, data) {\n  var newCommentId = data.newCommentId,\n      owner = data.owner,\n      avatarUrl = data.avatarUrl;\n  var videoComments = document.querySelector(\".video__comments ul\");\n  var newComment = document.createElement(\"li\");\n  newComment.dataset.id = newCommentId;\n  newComment.className = \"video__comment\";\n  var icon = document.createElement(\"i\");\n  icon.className = \"fas fa-user\";\n  var span = document.createElement(\"span\");\n  span.innerText = \"\".concat(text);\n  var icon2 = document.createElement(\"i\");\n  icon2.className = \"fas fa-trash-alt\";\n  var avatar = null;\n\n  if (avatarUrl) {\n    avatar = document.createElement(\"img\");\n    avatar.crossOrigin = \"\";\n    avatar.src = /^https?:\\/\\//.test(avatarUrl) || /^data:image/.test(avatarUrl) ? avatarUrl : \"/\".concat(avatarUrl);\n  } else {\n    avatar = document.createElement(\"div\");\n    var avatarIcon = document.createElement(\"1\");\n    avatarIcon.classList.add(\"fas\");\n    avatarIcon.classList.add(\"fa-user\");\n    avatarIcon.classList.add(\"avatarIcon\");\n    avatar.appendChild(avatarIcon);\n  }\n\n  avatar.className = \"comment_avatar\";\n  newComment.appendChild(icon);\n  newComment.appendChild(avatar);\n  newComment.appendChild(span);\n  newComment.appendChild(icon2);\n  videoComments.prepend(newComment);\n};\n\nvar handleSubmit = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {\n    var textarea, text, videoId, response, data;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            event.preventDefault();\n            textarea = form.querySelector(\"textarea\");\n            text = textarea.value;\n            videoId = videoContainer.dataset.id;\n\n            if (!(text === \"\")) {\n              _context.next = 6;\n              break;\n            }\n\n            return _context.abrupt(\"return\");\n\n          case 6:\n            _context.next = 8;\n            return fetch(\"/api/videos/\".concat(videoId, \"/comment\"), {\n              method: \"POST\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify({\n                text: text\n              })\n            });\n\n          case 8:\n            response = _context.sent;\n\n            if (!(response.status === 201)) {\n              _context.next = 15;\n              break;\n            }\n\n            _context.next = 12;\n            return response.json();\n\n          case 12:\n            data = _context.sent;\n            addComment(text, data);\n            textarea.value = \"\";\n\n          case 15:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function handleSubmit(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nif (form) {\n  form.addEventListener(\"submit\", handleSubmit);\n}\n\n//# sourceURL=webpack://Youtube_Clone/./src/client/js/commentSection.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/commentSection.js"]();
/******/ 	
/******/ })()
;