(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/Dialogue.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Dialogue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function Dialogue(param) {
    let { text, speed = 50, duration, className, style } = param;
    _s();
    const [displayed, setDisplayed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dialogue.useEffect": ()=>{
            let i = 0;
            const interval = setInterval({
                "Dialogue.useEffect.interval": ()=>{
                    setDisplayed(text.slice(0, i + 1));
                    i++;
                    if (i >= text.length) clearInterval(interval);
                }
            }["Dialogue.useEffect.interval"], speed);
            return ({
                "Dialogue.useEffect": ()=>clearInterval(interval)
            })["Dialogue.useEffect"];
        }
    }["Dialogue.useEffect"], [
        text,
        speed
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Dialogue.useEffect": ()=>{
            if (!duration) return;
            const timeout = setTimeout({
                "Dialogue.useEffect.timeout": ()=>setVisible(false)
            }["Dialogue.useEffect.timeout"], duration);
            return ({
                "Dialogue.useEffect": ()=>clearTimeout(timeout)
            })["Dialogue.useEffect"];
        }
    }["Dialogue.useEffect"], [
        duration
    ]);
    if (!visible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute bg-white/20 rounded-xl px-4 py-2 shadow-lg text-white text-lg max-w-xs z-20 ".concat(className),
        style: style,
        children: [
            displayed,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "animate-pulse",
                children: displayed.length < text.length ? "|" : ""
            }, void 0, false, {
                fileName: "[project]/src/components/Dialogue.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setVisible(false),
                className: "absolute top-1 right-2 text-gray-300 hover:text-gray-100 text-sm cursor-pointer",
                children: "x"
            }, void 0, false, {
                fileName: "[project]/src/components/Dialogue.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Dialogue.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(Dialogue, "vrHTk1tu9qDZ/cnHmTZWP0tbpGk=");
_c = Dialogue;
var _c;
__turbopack_context__.k.register(_c, "Dialogue");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/HomeNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dialogue$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Dialogue.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function HomeNav() {
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hovered, setHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed top-4 left-4 z-200",
        onMouseEnter: ()=>{
            setIsOpen(true);
            setHovered(true);
        },
        onMouseLeave: ()=>{
            setIsOpen(false);
            setHovered(false);
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "bg-[rgb(235,199,148)] text-[rgb(47,54,103)] p-3 rounded-full shadow-lg hover:bg-[rgb(89,102,154)] transition cursor-pointer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: "transition",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaHome"], {
                        size: 24
                    }, void 0, false, {
                        fileName: "[project]/src/components/HomeNav.tsx",
                        lineNumber: 25,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/HomeNav.tsx",
                    lineNumber: 24,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/HomeNav.tsx",
                lineNumber: 23,
                columnNumber: 13
            }, this),
            isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-2 bg-[rgb(34,35,76)] text-[rgb(232,215,194)] rounded-xl shadow-lg w-48 p-4 flex flex-col gap-3 cursor-pointer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(47,54,103)] transition",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaHome"], {}, void 0, false, {
                                fileName: "[project]/src/components/HomeNav.tsx",
                                lineNumber: 32,
                                columnNumber: 21
                            }, this),
                            " Home"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HomeNav.tsx",
                        lineNumber: 31,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/shop",
                        className: "flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(47,54,103)] transition",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaStore"], {}, void 0, false, {
                                fileName: "[project]/src/components/HomeNav.tsx",
                                lineNumber: 35,
                                columnNumber: 21
                            }, this),
                            " Shop"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HomeNav.tsx",
                        lineNumber: 34,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/cart",
                        className: "flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(47,54,103)] transition",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaShoppingCart"], {}, void 0, false, {
                                fileName: "[project]/src/components/HomeNav.tsx",
                                lineNumber: 38,
                                columnNumber: 21
                            }, this),
                            " Cart"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HomeNav.tsx",
                        lineNumber: 37,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/profile",
                        className: "flex items-center gap-2 p-2 rounded-xl hover:bg-[rgb(47,54,103)] transition",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FaUser"], {}, void 0, false, {
                                fileName: "[project]/src/components/HomeNav.tsx",
                                lineNumber: 41,
                                columnNumber: 21
                            }, this),
                            " Profile"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/HomeNav.tsx",
                        lineNumber: 40,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/HomeNav.tsx",
                lineNumber: 30,
                columnNumber: 17
            }, this),
            hovered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Dialogue$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                text: "Here's a simpler way to navigate my shop!",
                speed: 40,
                className: "w-60",
                style: {
                    left: "122%",
                    top: "60%"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/HomeNav.tsx",
                lineNumber: 47,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/HomeNav.tsx",
        lineNumber: 12,
        columnNumber: 9
    }, this);
}
_s(HomeNav, "xenqxENyrOEjo9A8yh7I3flOaXU=");
_c = HomeNav;
var _c;
__turbopack_context__.k.register(_c, "HomeNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ShopItem.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShopItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function ShopItem(param) {
    let { label, imgSrc, width, positionX, positionY, className, offsetX = 0, offsetY = 0, depthX = 1, depthY = 1, onClick } = param;
    const parallaxX = offsetX * depthX;
    const parallaxY = offsetY * depthY;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute z-30 cursor-pointer transition-transform hover:scale-105 -translate-x-1/2 -translate-y-1/2 ".concat(className),
        style: {
            left: "calc(".concat(positionX, "% + ").concat(parallaxX, "px)"),
            top: "calc(".concat(positionY, "% + ").concat(parallaxY, "px)")
        },
        onClick: onClick,
        children: imgSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: imgSrc,
            alt: label,
            className: "object-contain",
            style: {
                maxWidth: "".concat(width, "%")
            }
        }, void 0, false, {
            fileName: "[project]/src/components/ShopItem.tsx",
            lineNumber: 41,
            columnNumber: 13
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-green-200 flex items-center justify-center",
            style: {
                width: "".concat(width, "%"),
                height: "".concat(width, "%")
            },
            children: label
        }, void 0, false, {
            fileName: "[project]/src/components/ShopItem.tsx",
            lineNumber: 48,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ShopItem.tsx",
        lineNumber: 32,
        columnNumber: 9
    }, this);
}
_c = ShopItem;
var _c;
__turbopack_context__.k.register(_c, "ShopItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/work/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Work
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HomeNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/HomeNav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ShopItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ShopItem.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const artCollections = [
    {
        id: 1,
        title: "Commissions",
        count: 6,
        artworks: [
            {
                id: 1,
                image: "/images/works/commissions/Mango.png",
                title: "Mango - Pet Commission",
                year: "2025"
            },
            {
                id: 2,
                image: "/images/works/commissions/Atem.png",
                title: "Atem - Pet Commission",
                year: "2025"
            },
            {
                id: 3,
                image: "/images/works/commissions/Pierogi.png",
                title: "Pierogi - Pet Commission",
                year: "2025"
            },
            {
                id: 4,
                image: "/images/works/commissions/Ducks.png",
                title: "Ducks - Pet Commission",
                year: "2025"
            },
            {
                id: 5,
                image: "/images/works/commissions/Luna.png",
                title: "Luna - Fanart",
                year: "2025"
            },
            {
                id: 6,
                image: "/images/works/commissions/Krusty.png",
                title: "Krusty - Pet Commission",
                year: "2025"
            }
        ]
    },
    {
        id: 2,
        title: "Fanarts",
        count: 10,
        artworks: [
            {
                id: 1,
                image: "/images/works/fanarts/Hornet.png",
                title: "Hornet Personified",
                year: "2025"
            },
            {
                id: 2,
                image: "/images/works/fanarts/Derpy.png",
                title: "Derpy from Kpop Demon Hunters",
                year: "2025"
            },
            {
                id: 3,
                image: "/images/works/fanarts/appa-pfp.png",
                title: "Appa Drawing",
                year: "2023"
            },
            {
                id: 4,
                image: "/images/works/fanarts/val.png",
                title: "Kazuha x Valorant",
                year: "2023"
            },
            {
                id: 5,
                image: "/images/works/fanarts/jett.png",
                title: "Jett x Lofi Girl",
                year: "2023"
            },
            {
                id: 6,
                image: "/images/works/fanarts/kazuha.png",
                title: "Kazuha Drawing",
                year: "2022"
            },
            {
                id: 7,
                image: "/images/works/fanarts/wefatcats.png",
                title: "We Fat Cats",
                year: "2022"
            },
            {
                id: 8,
                image: "/images/works/fanarts/megumi.png",
                title: "Megumi from JJK",
                year: "2022"
            },
            {
                id: 9,
                image: "/images/works/fanarts/genshin.png",
                title: "Genshin Fanart",
                year: "2022"
            },
            {
                id: 10,
                image: "/images/works/fanarts/spiritedaway.png",
                title: "Spirited Away Fanart",
                year: "2022"
            }
        ]
    },
    {
        id: 3,
        title: "Character Designs",
        count: 6,
        artworks: [
            {
                id: 1,
                image: "/images/works/characters/Eli.png",
                title: "Eli Heung",
                year: "2023"
            },
            {
                id: 2,
                image: "/images/works/characters/Ashe.png",
                title: "Ashe Kamal",
                year: "2023"
            },
            {
                id: 3,
                image: "/images/works/characters/Tian.png",
                title: "Tian Zheng",
                year: "2023"
            },
            {
                id: 4,
                image: "/images/works/characters/ren.png",
                title: "Ren - Kitsune Mask",
                year: "2022"
            },
            {
                id: 5,
                image: "/images/works/characters/hana.png",
                title: "Hana",
                year: "2022"
            },
            {
                id: 6,
                image: "/images/works/characters/Miya.png",
                title: "Miya - School Girl",
                year: "2022"
            }
        ]
    },
    {
        id: 4,
        title: "Design Work",
        count: 6,
        artworks: [
            {
                id: 1,
                image: "/images/works/designs/rca.png",
                title: "Redmond Code Association Hoodie Design",
                year: "2024"
            },
            {
                id: 2,
                image: "/images/works/designs/banner.png",
                title: "Redmond Code Association Sustainability Drive Banner",
                year: "2024"
            },
            {
                id: 3,
                image: "/images/works/designs/robot.gif",
                title: "RCA Robot Animation",
                year: "2023"
            },
            {
                id: 4,
                image: "/images/works/designs/rocket.gif",
                title: "RCA Rocket Animation",
                year: "2023"
            },
            {
                id: 5,
                image: "/images/works/designs/people.png",
                title: "Future Scholar Foundation Team",
                year: "2023"
            },
            {
                id: 6,
                image: "/images/works/designs/me.gif",
                title: "GIF of myself",
                year: "2023"
            }
        ]
    },
    {
        id: 5,
        title: "Traditional Works",
        count: 15,
        artworks: [
            {
                id: 1,
                image: "/images/works/traditional/art1.jpg",
                title: "Comfort Food - Colored Pencil",
                year: "2025"
            },
            {
                id: 2,
                image: "/images/works/traditional/art3.jpg",
                title: "Mom and Me - Crayon",
                year: "2025"
            },
            {
                id: 3,
                image: "/images/works/traditional/art2.jpg",
                title: "Memory Project",
                year: "2025"
            },
            {
                id: 4,
                image: "/images/works/traditional/art4.jpg",
                title: "Love",
                year: "2025"
            },
            {
                id: 5,
                image: "/images/works/traditional/art5.jpg",
                title: "Fairytale Romance",
                year: "2025"
            },
            {
                id: 6,
                image: "/images/works/traditional/painting1.jpg",
                title: "Window to the Soul",
                year: "2024"
            },
            {
                id: 7,
                image: "/images/works/traditional/painting2.jpg",
                title: "Digital Mind",
                year: "2024"
            },
            {
                id: 8,
                image: "/images/works/traditional/painting3.jpg",
                title: "Imagination",
                year: "2024"
            },
            {
                id: 9,
                image: "/images/works/traditional/painting4.jpg",
                title: "Global Warming",
                year: "2024"
            },
            {
                id: 10,
                image: "/images/works/traditional/painting5.jpg",
                title: "Statue Study - Oil Painting",
                year: "2024"
            },
            {
                id: 11,
                image: "/images/works/traditional/painting6.jpg",
                title: "Statue Study - Oil Painting",
                year: "2023"
            },
            {
                id: 12,
                image: "/images/works/traditional/painting7.jpg",
                title: "Vase + Fruit - Oil Painting",
                year: "2023"
            },
            {
                id: 13,
                image: "/images/works/traditional/sketch1.jpg",
                title: "Statue Study - Graphite",
                year: "2023"
            },
            {
                id: 14,
                image: "/images/works/traditional/sketch2.jpg",
                title: "Statue Study - Graphite",
                year: "2022"
            },
            {
                id: 15,
                image: "/images/works/traditional/sketch3.jpg",
                title: "Statue Study - Graphite",
                year: "2022"
            }
        ]
    }
];
function Work() {
    _s();
    const [selectedCollection, setSelectedCollection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedArtwork, setSelectedArtwork] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const openCollection = (collection)=>setSelectedCollection(collection);
    const closeCollection = ()=>setSelectedCollection(null);
    const openArtwork = (art, collection)=>setSelectedArtwork({
            art,
            collection
        });
    const closeArtwork = ()=>setSelectedArtwork(null);
    const nextArtwork = ()=>{
        if (!selectedArtwork) return;
        const currentIndex = selectedArtwork.collection.artworks.findIndex((a)=>a.id === selectedArtwork.art.id);
        const nextIndex = (currentIndex + 1) % selectedArtwork.collection.artworks.length;
        setSelectedArtwork({
            art: selectedArtwork.collection.artworks[nextIndex],
            collection: selectedArtwork.collection
        });
    };
    const prevArtwork = ()=>{
        if (!selectedArtwork) return;
        const currentIndex = selectedArtwork.collection.artworks.findIndex((a)=>a.id === selectedArtwork.art.id);
        const prevIndex = (currentIndex - 1 + selectedArtwork.collection.artworks.length) % selectedArtwork.collection.artworks.length;
        setSelectedArtwork({
            art: selectedArtwork.collection.artworks[prevIndex],
            collection: selectedArtwork.collection
        });
    };
    const [offset, setOffset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Work.useEffect": ()=>{
            const handleMouseMove = {
                "Work.useEffect.handleMouseMove": (e)=>{
                    const { innerWidth, innerHeight } = window;
                    const x = (e.clientX - innerWidth / 2) / innerWidth * -30;
                    const y = (e.clientY - innerHeight / 2) / innerHeight * -30;
                    setOffset({
                        x,
                        y
                    });
                }
            }["Work.useEffect.handleMouseMove"];
            window.addEventListener("mousemove", handleMouseMove);
            return ({
                "Work.useEffect": ()=>window.removeEventListener("mousemove", handleMouseMove)
            })["Work.useEffect"];
        }
    }["Work.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-[url('/images/bg.png')] bg-cover bg-center relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden md:flex pointer-events-none fixed inset-0 border-[30px] border-[#3E1F69] z-[10]"
            }, void 0, false, {
                fileName: "[project]/src/app/work/page.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$HomeNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/work/page.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto px-[15vw] py-[10vh]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-12",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-5xl font-bold text-gray-white/90 mb-4 mt-5",
                                        children: "Art Gallery"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/work/page.tsx",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xl text-gray-100/80 max-w-3xl mx-auto",
                                        children: "A gallery of my different creations. Choose which collections you wish to browse!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/work/page.tsx",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/work/page.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            !selectedCollection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4",
                                children: artCollections.map((collection)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        onClick: ()=>openCollection(collection),
                                        className: "cursor-pointer relative group",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative h-[25vh]",
                                            children: [
                                                collection.artworks.slice(0, 3).map((art, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: art.image,
                                                        alt: "".concat(collection.title, " ").concat(i + 1),
                                                        loading: "lazy",
                                                        className: "\n                          absolute inset-0 w-full h-full object-cover\n                          border-[2px] border-[#996944]/70\n                          rounded-sm shadow-md\n                          transition-transform duration-500\n                          ".concat(i === 0 ? "z-30" : i === 1 ? "z-20" : "z-10", "\n                          ").concat(i === 1 ? "translate-x-2 translate-y-2 rotate-1" : "", "\n                          ").concat(i === 2 ? "translate-x-4 translate-y-4 -rotate-1" : "", "\n                          group-hover:scale-105\n                        ")
                                                    }, i, false, {
                                                        fileName: "[project]/src/app/work/page.tsx",
                                                        lineNumber: 160,
                                                        columnNumber: 23
                                                    }, this)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute bottom-2 left-2 z-40 bg-white/80 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity text-sm text-gray-800",
                                                    children: [
                                                        collection.title,
                                                        " (",
                                                        collection.count,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/work/page.tsx",
                                                    lineNumber: 177,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/work/page.tsx",
                                            lineNumber: 158,
                                            columnNumber: 19
                                        }, this)
                                    }, collection.id, false, {
                                        fileName: "[project]/src/app/work/page.tsx",
                                        lineNumber: 153,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/work/page.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this),
                            selectedCollection && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-fadeIn",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: closeCollection,
                                        className: "mb-8 px-4 py-2 bg-[#CB9861] hover:bg-[#EBC794] text-gray-800 rounded-xl cursor-pointer shadow-sm transition-all flex items-center gap-2",
                                        children: "← Back to Shop"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/work/page.tsx",
                                        lineNumber: 189,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-4xl font-bold text-gray-200 mb-6",
                                        children: selectedCollection.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/work/page.tsx",
                                        lineNumber: 196,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center",
                                        children: selectedCollection.artworks.map((art)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>openArtwork(art, selectedCollection),
                                                className: "group cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "bg-[#EBC794] p-2 border-3 border-[#996944] rounded-md shadow-md",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "bg-[#CB9861] border-2 border-[#996944]/70 p-3 shadow-inner",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "relative h-64 overflow-hidden",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: art.image,
                                                                    alt: art.title,
                                                                    className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/work/page.tsx",
                                                                    lineNumber: 208,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/work/page.tsx",
                                                                lineNumber: 207,
                                                                columnNumber: 25
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/work/page.tsx",
                                                            lineNumber: 206,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/work/page.tsx",
                                                        lineNumber: 205,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-3 text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-md font-medium text-gray-100",
                                                                children: art.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/work/page.tsx",
                                                                lineNumber: 218,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-gray-200",
                                                                children: art.year
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/work/page.tsx",
                                                                lineNumber: 221,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/work/page.tsx",
                                                        lineNumber: 217,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, art.id, true, {
                                                fileName: "[project]/src/app/work/page.tsx",
                                                lineNumber: 200,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/work/page.tsx",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/work/page.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/work/page.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    selectedArtwork && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4",
                        onClick: closeArtwork,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative max-w-5xl w-full h-full flex items-center justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: closeArtwork,
                                    className: "absolute top-4 right-4 w-12 h-12 bg-white/20 hover:bg-white/50 rounded-full flex items-center justify-center text-3xl text-white cursor-pointer",
                                    children: "×"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/work/page.tsx",
                                    lineNumber: 240,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        prevArtwork();
                                    },
                                    className: "absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/50 rounded-full flex items-center justify-center text-3xl text-white cursor-pointer",
                                    children: "‹"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/work/page.tsx",
                                    lineNumber: 248,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center justify-center max-h-[90vh]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: selectedArtwork.art.image,
                                            alt: selectedArtwork.art.title,
                                            className: "max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl",
                                            onClick: (e)=>e.stopPropagation(),
                                            loading: "lazy"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/work/page.tsx",
                                            lineNumber: 257,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-6 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-2xl font-bold text-white mb-2",
                                                    children: selectedArtwork.art.title
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/work/page.tsx",
                                                    lineNumber: 265,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-white/80",
                                                    children: selectedArtwork.art.year
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/work/page.tsx",
                                                    lineNumber: 266,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/work/page.tsx",
                                            lineNumber: 264,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/work/page.tsx",
                                    lineNumber: 256,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: (e)=>{
                                        e.stopPropagation();
                                        nextArtwork();
                                    },
                                    className: "absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/50 rounded-full flex items-center justify-center text-3xl text-white cursor-pointer",
                                    children: "›"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/work/page.tsx",
                                    lineNumber: 271,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/work/page.tsx",
                            lineNumber: 238,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/work/page.tsx",
                        lineNumber: 234,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ShopItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        label: "Lights",
                        imgSrc: "/images/light1.png",
                        width: 50,
                        positionX: 30,
                        positionY: 8,
                        offsetX: 0,
                        offsetY: 0,
                        depthX: 1.0,
                        depthY: 1.0
                    }, void 0, false, {
                        fileName: "[project]/src/app/work/page.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ShopItem$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        label: "Light",
                        imgSrc: "/images/light2.png",
                        width: 50,
                        positionX: 85,
                        positionY: 5,
                        offsetX: 0,
                        offsetY: 0,
                        depthX: 1.0,
                        depthY: 1.0
                    }, void 0, false, {
                        fileName: "[project]/src/app/work/page.tsx",
                        lineNumber: 282,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/work/page.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/work/page.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
_s(Work, "ChHt16F2S2xSNsCzMFguafIPOFo=");
_c = Work;
var _c;
__turbopack_context__.k.register(_c, "Work");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_52192c36._.js.map