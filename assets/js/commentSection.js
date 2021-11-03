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

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar videoContainer = document.getElementById(\"videoContainer\");\nvar form = document.getElementById(\"commentForm\");\nvar video = document.querySelector(\".video\");\nvar deleteBtns = document.querySelectorAll(\".commentDelete\");\n\nvar addComment = function addComment(text, data) {\n  var newCommentId = data.newCommentId,\n      owner = data.owner,\n      avatarUrl = data.avatarUrl;\n  var videoComments = document.querySelector(\".video__comments ul\");\n  var newComment = document.createElement(\"li\");\n  newComment.dataset.id = newCommentId;\n  newComment.className = \"video__comment\";\n  var span = document.createElement(\"span\");\n  span.innerText = \"\".concat(text);\n  var icon2 = document.createElement(\"i\");\n  icon2.className = \"fas fa-trash-alt commentDelete\";\n  var avatar = null;\n\n  if (avatarUrl) {\n    avatar = document.createElement(\"img\");\n    avatar.crossOrigin = \"\";\n    avatar.src = /^https?:\\/\\//.test(avatarUrl) || /^data:image/.test(avatarUrl) ? avatarUrl : \"/\".concat(avatarUrl);\n  } else {\n    avatar = document.createElement(\"div\");\n    var avatarIcon = document.createElement(\"1\");\n    avatarIcon.classList.add(\"fas\");\n    avatarIcon.classList.add(\"fa-user\");\n    avatarIcon.classList.add(\"avatarIcon\");\n    avatar.appendChild(avatarIcon);\n  }\n\n  avatar.className = \"comment_avatar\";\n  var ownerContainer = document.createElement(\"div\");\n  ownerContainer.className = \"ownerContainer\";\n  var ownerSpan = document.createElement(\"span\");\n  ownerSpan.className = \"owner__name\";\n  ownerSpan.innerText = \"\".concat(owner);\n  newComment.prepend(ownerContainer);\n  ownerContainer.appendChild(avatar);\n  ownerContainer.appendChild(ownerSpan);\n  newComment.appendChild(span);\n  newComment.appendChild(icon2);\n  videoComments.prepend(newComment);\n};\n\nvar deleteBtnsListener = function deleteBtnsListener() {\n  deleteBtns.forEach(function (deleteBtn) {\n    return deleteBtn.addEventListener(\"click\", deleteComment);\n  });\n};\n\nvar deleteComment = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {\n    var comment, videoId, commentId, response, url, redirected, status;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            comment = event.currentTarget.parentElement;\n            videoId = video.dataset.videoId;\n            commentId = comment.dataset.commentId;\n            _context.next = 5;\n            return fetch(\"/api/videos/\".concat(videoId, \"/comments/\").concat(commentId, \"/delete\"), {\n              method: \"DELETE\"\n            });\n\n          case 5:\n            response = _context.sent;\n            url = response.url, redirected = response.redirected, status = response.status;\n\n            if (!redirected) {\n              _context.next = 9;\n              break;\n            }\n\n            return _context.abrupt(\"return\", window.location.href = url);\n\n          case 9:\n            if (status === 200) {\n              comment.remove();\n            }\n\n          case 10:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function deleteComment(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nvar handleSubmit = /*#__PURE__*/function () {\n  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {\n    var textarea, text, videoId, response, data;\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            event.preventDefault();\n            textarea = form.querySelector(\"textarea\");\n            text = textarea.value;\n            videoId = video.dataset.videoId;\n\n            if (!(text === \"\")) {\n              _context2.next = 6;\n              break;\n            }\n\n            return _context2.abrupt(\"return\");\n\n          case 6:\n            _context2.next = 8;\n            return fetch(\"/api/videos/\".concat(videoId, \"/comment\"), {\n              method: \"POST\",\n              headers: {\n                \"Content-Type\": \"application/json\"\n              },\n              body: JSON.stringify({\n                text: text\n              })\n            });\n\n          case 8:\n            response = _context2.sent;\n\n            if (!(response.status === 201)) {\n              _context2.next = 15;\n              break;\n            }\n\n            _context2.next = 12;\n            return response.json();\n\n          case 12:\n            data = _context2.sent;\n            addComment(text, data);\n            textarea.value = \"\";\n\n          case 15:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2);\n  }));\n\n  return function handleSubmit(_x2) {\n    return _ref2.apply(this, arguments);\n  };\n}();\n\nif (form) {\n  form.addEventListener(\"submit\", handleSubmit);\n}\n\ndeleteBtnsListener();\n\n//# sourceURL=webpack://Youtube_Clone/./src/client/js/commentSection.js?");

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