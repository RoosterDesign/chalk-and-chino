"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./app/components/products-nav/products-nav.tsx":
/*!******************************************************!*\
  !*** ./app/components/products-nav/products-nav.tsx ***!
  \******************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _app_components_nav_nav__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/app/components/nav/nav */ \"(app-pages-browser)/./app/components/nav/nav.tsx\");\n/* harmony import */ var _app_components_container_container__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/app/components/container/container */ \"(app-pages-browser)/./app/components/container/container.tsx\");\n/* harmony import */ var _products_nav_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./products-nav.module.scss */ \"(app-pages-browser)/./app/components/products-nav/products-nav.module.scss\");\n/* harmony import */ var _products_nav_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_products_nav_module_scss__WEBPACK_IMPORTED_MODULE_4__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nconst ProductsNav = (param)=>{\n    let { productNavItems } = param;\n    _s();\n    const currentPath = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.usePathname)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"\".concat((_products_nav_module_scss__WEBPACK_IMPORTED_MODULE_4___default().productNav)),\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_components_container_container__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n            className: (_products_nav_module_scss__WEBPACK_IMPORTED_MODULE_4___default().container),\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_app_components_nav_nav__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                navItems: productNavItems\n            }, void 0, false, {\n                fileName: \"G:\\\\Development\\\\Websites\\\\chalk-and-chino\\\\app\\\\components\\\\products-nav\\\\products-nav.tsx\",\n                lineNumber: 20,\n                columnNumber: 17\n            }, undefined)\n        }, void 0, false, {\n            fileName: \"G:\\\\Development\\\\Websites\\\\chalk-and-chino\\\\app\\\\components\\\\products-nav\\\\products-nav.tsx\",\n            lineNumber: 19,\n            columnNumber: 13\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"G:\\\\Development\\\\Websites\\\\chalk-and-chino\\\\app\\\\components\\\\products-nav\\\\products-nav.tsx\",\n        lineNumber: 18,\n        columnNumber: 9\n    }, undefined);\n};\n_s(ProductsNav, \"Kq/pFyCJeBVplFX/N2LPdnlQv24=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_1__.usePathname\n    ];\n});\n_c = ProductsNav;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductsNav);\nvar _c;\n$RefreshReg$(_c, \"ProductsNav\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9jb21wb25lbnRzL3Byb2R1Y3RzLW5hdi9wcm9kdWN0cy1uYXYudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUU2QztBQUNGO0FBQ2tCO0FBRWI7QUFNaEQsTUFBTUksY0FBK0I7UUFBQyxFQUFFQyxlQUFlLEVBQUU7O0lBRXJELE1BQU1DLGNBQWNOLDREQUFXQTtJQUUvQixxQkFDSSw4REFBQ087UUFBSUMsV0FBVyxHQUFxQixPQUFsQkwsNkVBQWlCO2tCQUNoQyw0RUFBQ0QsMkVBQVNBO1lBQUNNLFdBQVdMLDRFQUFnQjtzQkFDbEMsNEVBQUNGLCtEQUFHQTtnQkFBQ1UsVUFBVU47Ozs7Ozs7Ozs7Ozs7Ozs7QUFJL0I7R0FYTUQ7O1FBRWtCSix3REFBV0E7OztLQUY3Qkk7QUFhTixpRUFBZUEsV0FBV0EsRUFBQyIsInNvdXJjZXMiOlsiRzpcXERldmVsb3BtZW50XFxXZWJzaXRlc1xcY2hhbGstYW5kLWNoaW5vXFxhcHBcXGNvbXBvbmVudHNcXHByb2R1Y3RzLW5hdlxccHJvZHVjdHMtbmF2LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCc7XHJcblxyXG5pbXBvcnQgeyB1c2VQYXRobmFtZSB9IGZyb20gJ25leHQvbmF2aWdhdGlvbidcclxuaW1wb3J0IE5hdiBmcm9tICdAL2FwcC9jb21wb25lbnRzL25hdi9uYXYnO1xyXG5pbXBvcnQgQ29udGFpbmVyIGZyb20gJ0AvYXBwL2NvbXBvbmVudHMvY29udGFpbmVyL2NvbnRhaW5lcic7XHJcbmltcG9ydCB7IE5hdkl0ZW0gfSBmcm9tICdAL2FwcC90eXBlcy90eXBlcydcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuL3Byb2R1Y3RzLW5hdi5tb2R1bGUuc2Nzcyc7XHJcblxyXG50eXBlIFByb3BzID0ge1xyXG4gICAgcHJvZHVjdE5hdkl0ZW1zOiBOYXZJdGVtW107XHJcbn1cclxuXHJcbmNvbnN0IFByb2R1Y3RzTmF2OiBSZWFjdC5GQzxQcm9wcz4gPSAoeyBwcm9kdWN0TmF2SXRlbXMgfSkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gdXNlUGF0aG5hbWUoKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtzdHlsZXMucHJvZHVjdE5hdn1gfT5cclxuICAgICAgICAgICAgPENvbnRhaW5lciBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxyXG4gICAgICAgICAgICAgICAgPE5hdiBuYXZJdGVtcz17cHJvZHVjdE5hdkl0ZW1zfSAvPlxyXG4gICAgICAgICAgICA8L0NvbnRhaW5lcj5cclxuICAgICAgICA8L2RpdiA+XHJcbiAgICApXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzTmF2O1xyXG4iXSwibmFtZXMiOlsidXNlUGF0aG5hbWUiLCJOYXYiLCJDb250YWluZXIiLCJzdHlsZXMiLCJQcm9kdWN0c05hdiIsInByb2R1Y3ROYXZJdGVtcyIsImN1cnJlbnRQYXRoIiwiZGl2IiwiY2xhc3NOYW1lIiwicHJvZHVjdE5hdiIsImNvbnRhaW5lciIsIm5hdkl0ZW1zIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/components/products-nav/products-nav.tsx\n"));

/***/ })

});