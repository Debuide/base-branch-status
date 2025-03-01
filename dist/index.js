/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 431:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 715:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 548:
/***/ ((module) => {

module.exports = eval("require")("axios");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__nccwpck_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__nccwpck_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__nccwpck_require__.r(__webpack_exports__);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(431);
/* harmony import */ var _actions_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nccwpck_require__.n(_actions_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _actions_github__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(715);
/* harmony import */ var _actions_github__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nccwpck_require__.n(_actions_github__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __nccwpck_require__(548);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__nccwpck_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);




async function run() {
  try {
    // Ensure this action only runs for pull_request events
    if (_actions_github__WEBPACK_IMPORTED_MODULE_1__.context.eventName !== 'pull_request') {
      _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed('This action only runs for pull_request events.');
      return;
    }

    // Get inputs
    const token = _actions_core__WEBPACK_IMPORTED_MODULE_0__.getInput('github-token', { required: true });
    const repo = process.env.GITHUB_REPOSITORY;
    const baseBranch = _actions_github__WEBPACK_IMPORTED_MODULE_1__.context.payload.pull_request.base.ref;

    if (!token || !repo) {
      _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed('Missing required environment variables: GITHUB_TOKEN or GITHUB_REPOSITORY');
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    };

    _actions_core__WEBPACK_IMPORTED_MODULE_0__.info(`Checking workflow runs for ${baseBranch} branch...`);

    // Fetch the latest completed workflow runs for the base branch
    const url = `https://api.github.com/repos/${repo}/actions/runs?branch=${baseBranch}&status=completed`;
    const response = await axios__WEBPACK_IMPORTED_MODULE_2___default().get(url, { headers });
    const runs = response.data.workflow_runs;

    if (!runs || runs.length === 0) {
      _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(`No workflow runs found for ${baseBranch} branch`);
      return;
    }

    // Get the most recent completed run
    const latestRun = runs[0];
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.info(`Latest workflow run details:`);
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.info(`  Name: ${latestRun.name}`);
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.info(`  Status: ${latestRun.status}`);
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.info(`  Conclusion: ${latestRun.conclusion}`);
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.info(`  Created at: ${latestRun.created_at}`);

    const isGreen = latestRun.conclusion === 'success';
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.info(`Base branch status: ${isGreen ? 'GREEN' : 'RED'}`);
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.setOutput('is-base-green', isGreen.toString());

    if (!isGreen) {
      _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(`⛔ Cannot proceed: ${baseBranch} branch is RED`);
    }
  } catch (error) {
    _actions_core__WEBPACK_IMPORTED_MODULE_0__.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();

})();

module.exports = __webpack_exports__;
/******/ })()
;