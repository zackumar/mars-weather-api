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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var puppeteer_1 = __importDefault(require("puppeteer"));
var app = express_1.default();
var port = 3271;
app.all('/', function (req, res) {
    res.json('Mars Weather');
});
var weatherMock = {
    date: '2021-03-18',
    sol: 3062,
    max_c: -15,
    min_c: -73,
    pressure: 838,
    atm_opacity: 'Sunny',
    uv: 'moderate',
    sunrise: '06:31',
    sunset: '18:25',
    location: 'Elysium Planitia',
};
app.get('/mars', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, date, sol, max, min, pressure, atmOpacity, uv, sunrise, sunset, weatherInfo, _a, _b, _c, _d;
    var _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0: return [4 /*yield*/, puppeteer_1.default.launch()];
            case 1:
                browser = _f.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _f.sent();
                return [4 /*yield*/, page.goto('http://cab.inta-csic.es/rems/marsweather.html')];
            case 3:
                _f.sent();
                return [4 /*yield*/, page.waitForTimeout(2000)];
            case 4:
                _f.sent();
                return [4 /*yield*/, page.$('[id=mw-terrestrial_date]')];
            case 5:
                date = _f.sent();
                return [4 /*yield*/, page.$('[id=mw-sol]')];
            case 6:
                sol = _f.sent();
                return [4 /*yield*/, page.$('[id=mw-max_temp]')];
            case 7:
                max = _f.sent();
                return [4 /*yield*/, page.$('[id=mw-min_temp]')];
            case 8:
                min = _f.sent();
                return [4 /*yield*/, page.$('[id=mw-pressure]')];
            case 9:
                pressure = _f.sent();
                return [4 /*yield*/, page.$('[id=mw-atmo_opacity]')];
            case 10:
                atmOpacity = _f.sent();
                return [4 /*yield*/, page.$('span[title^="UV Radiation level"]')];
            case 11:
                uv = _f.sent();
                return [4 /*yield*/, page.$('[id=mw-sunrise]')];
            case 12:
                sunrise = _f.sent();
                return [4 /*yield*/, page.$('[id=mw-sunset]')];
            case 13:
                sunset = _f.sent();
                _e = {};
                return [4 /*yield*/, getText(page, date)];
            case 14:
                _e.date = _f.sent();
                _a = parseInt;
                return [4 /*yield*/, getText(page, sol)];
            case 15:
                _e.sol = _a.apply(void 0, [_f.sent()]);
                _b = parseInt;
                return [4 /*yield*/, getText(page, max)];
            case 16:
                _e.max_c = _b.apply(void 0, [_f.sent()]);
                _c = parseInt;
                return [4 /*yield*/, getText(page, min)];
            case 17:
                _e.min_c = _c.apply(void 0, [_f.sent()]);
                _d = parseInt;
                return [4 /*yield*/, getText(page, pressure)];
            case 18:
                _e.pressure = _d.apply(void 0, [_f.sent()]);
                return [4 /*yield*/, getText(page, atmOpacity)];
            case 19:
                _e.atm_opacity = _f.sent();
                return [4 /*yield*/, getText(page, uv)];
            case 20:
                _e.uv = _f.sent();
                return [4 /*yield*/, getText(page, sunrise)];
            case 21:
                _e.sunrise = _f.sent();
                return [4 /*yield*/, getText(page, sunset)];
            case 22:
                weatherInfo = (_e.sunset = _f.sent(),
                    _e);
                res.json(weatherInfo);
                return [2 /*return*/];
        }
    });
}); });
function getText(page, element) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (element == null)
                        return [2 /*return*/, '-1'];
                    return [4 /*yield*/, page.evaluate(function (el) { return el.textContent; }, element)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
var server = app.listen(port, function () {
    console.log("Server listening at on port " + port);
});
