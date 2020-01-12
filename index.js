"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var canvas_1 = require("canvas");
var fs = require("fs-extra");
var source_1 = require("./source");
var colors_1 = require("./colors");
var arg = process.argv.splice(2);
// console.log(parseInt(arguments[0]))
var WIDTH = 200;
var HEIGHT = 200;
var proDiv = [];
var output = [];
// 随机数发生器
var getRandom = function (max, min) {
    if (max === void 0) { max = 0; }
    if (min === void 0) { min = 0; }
    return Math.floor(Math.random() * (max - min)) + min;
};
var fillImage = function (ctx) {
    var proAll = [];
    var num = arg[1] ? Number(arg[1]) : 10;
    while (num-- > 0) {
        proAll.push(new Promise(function (resolve) {
            canvas_1.loadImage(source_1["default"][getRandom(source_1["default"].length - 1)]).then(function (image) {
                ctx.drawImage(image, getRandom(WIDTH), getRandom(HEIGHT), getRandom(WIDTH), getRandom(HEIGHT));
                resolve();
            });
        }));
    }
    return Promise.all(proAll);
};
var getImage = function (index) {
    return new Promise(function (resolve, reject) {
        // 建立canvas
        var canvas = canvas_1.createCanvas(WIDTH, HEIGHT);
        var ctx = canvas.getContext('2d');
        // 背景色
        ctx.fillStyle = typeof colors_1["default"] === 'object' ? colors_1["default"][getRandom(colors_1["default"].length - 1)].hex : '#000000';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        fillImage(ctx).then(function () {
            output[index] = canvas.toDataURL();
            resolve();
        });
    });
};
// const timer = (timeout=10000) => {
//     return new Promise((resolve, reject)=>{
//         setTimeout(()=>{ resolve() }, timeout)
//     })
// }
var main = function () {
    console.log('玩儿命生成中。。。');
    var num = arg[0] ? Number(arg[0]) : 1;
    while (num-- > 0) {
        proDiv.push(getImage(num));
    }
    Promise.all(proDiv).then(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // console.log(JSON.stringify(output))
                return [4 /*yield*/, fs.writeFileSync('./output.js', "var data = " + JSON.stringify(output))];
                case 1:
                    // console.log(JSON.stringify(output))
                    _a.sent();
                    console.log((arg[0] ? Number(arg[0]) : 1) + " \u5F20\u56FE\u7247\u5B8C\u6210\uFF0C\u4E0B\u73ED");
                    return [2 /*return*/];
            }
        });
    }); });
};
main();
