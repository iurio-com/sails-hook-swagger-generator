"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
/* eslint-disable @typescript-eslint/no-empty-function */
var chai_1 = require("chai");
var parsers_1 = require("../lib/parsers");
var interfaces_1 = require("../lib/interfaces");
var utils_1 = require("../lib/utils");
var path_1 = __importDefault(require("path"));
// eslint-disable-next-line @typescript-eslint/no-var-requires
var userModel = require('../../api/models/User');
// eslint-disable-next-line @typescript-eslint/no-var-requires
var routes = require('../../config/routes');
var sailsConfig = {
    paths: {
        models: path_1.default.resolve('./api/models'),
        controllers: path_1.default.resolve('./api/controllers')
    },
    routes: routes.routes,
    appPath: ''
};
var sails = {
    log: {
        warn: function () { },
        error: function () { }
    },
    config: sailsConfig
};
describe('Parsers', function () {
    var models = {
        user: __assign({ globalId: 'User' }, userModel),
        dummy: {
            attributes: {}
        },
        archive: {
            globalId: 'Archive'
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sails.models = models;
    var boundRoutes = [
        {
            "path": "/user",
            "verb": "get",
            "options": {
                "model": "user",
                "associations": [],
                "detectedVerb": {
                    "verb": "",
                    "original": "/user",
                    "path": "/user"
                },
                "action": "user/find",
                "_middlewareType": "BLUEPRINT: find",
                "skipRegex": []
            }
        },
        {
            "path": "/user/:id",
            "verb": "get",
            "options": {
                "model": "user",
                "associations": [],
                "autoWatch": true,
                "detectedVerb": {
                    "verb": "",
                    "original": "/user/:id",
                    "path": "/user/:id"
                },
                "action": "user/findone",
                "_middlewareType": "BLUEPRINT: findone",
                "skipRegex": [
                    {}
                ],
                "skipAssets": true
            }
        },
        {
            "path": "/user/:id",
            "verb": "put",
            "options": {
                "associations": [],
                "autoWatch": true,
                "detectedVerb": {
                    "verb": "",
                    "original": "/user/:id",
                    "path": "/user/:id"
                },
                "action": "user/update",
                "_middlewareType": "BLUEPRINT: update",
                "skipRegex": [
                    {}
                ],
                "skipAssets": true
            }
        },
        {
            "path": "/actions2",
            "verb": "get",
            "options": {
                "detectedVerb": {
                    "verb": "",
                    "original": "/actions2",
                    "path": "/actions2"
                },
                "action": "subdir/actions2",
                "_middlewareType": "ACTION: subdir/actions2",
                "skipRegex": []
            }
        },
        {
            path: /^\/app\/.*$/,
            target: '[Function]',
            verb: 'get',
            options: {
                detectedVerb: { verb: '', original: 'r|^/app/.*$|', path: 'r|^/app/.*$|' },
                skipAssets: true,
                view: 'pages/homepage',
                locals: { layout: false },
                skipRegex: [/^[^?]*\/[^?/]+\.[^?/]+(\?.*)?$/]
            },
            originalFn: { /* [Function: serveView] */ _middlewareType: 'FUNCTION: serveView' }
        }
    ];
    describe('parseModels', function () {
        it("should only consider all models except associative tables and 'Archive' model special case", function () { return __awaiter(void 0, void 0, void 0, function () {
            var parsedModels;
            return __generator(this, function (_a) {
                parsedModels = (0, parsers_1.parseModels)(sails);
                (0, chai_1.expect)(Object.keys(parsedModels).length).to.equal(1);
                (0, chai_1.expect)(parsedModels['user'], 'key parsed models with their globalId').to.be.ok;
                return [2 /*return*/];
            });
        }); });
        it('should load and merge swagger specification in /models/{globalId} with the model.swagger attribute', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parsedModels, expectedTags;
            return __generator(this, function (_a) {
                parsedModels = (0, parsers_1.parseModels)(sails);
                expectedTags = [
                    {
                        "name": "User (ORM duplicate)",
                        "externalDocs": {
                            "url": "https://somewhere.com/alternate",
                            "description": "Refer to these alternate docs"
                        }
                    }
                ];
                (0, chai_1.expect)(parsedModels.user.swagger.tags, 'should merge tags from swagger doc with Model.swagger.tags').to.deep.equal(expectedTags);
                (0, chai_1.expect)(parsedModels.user.swagger.components, 'should merge components from swagger doc with Model.swagger.components').to.deep.equal({ parameters: [] });
                (0, chai_1.expect)(parsedModels.user.swagger.actions, 'should convert and merge swagger doc path param to actions').to.contains.keys('findone');
                return [2 /*return*/];
            });
        }); });
    });
    describe('parseModelsJsDoc', function () {
        var parsedModels;
        var modelsJsDoc;
        before(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parsedModels = (0, parsers_1.parseModels)(sails);
                        return [4 /*yield*/, (0, parsers_1.parseModelsJsDoc)(sails, parsedModels)];
                    case 1:
                        modelsJsDoc = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('should parse `tags` from model JSDoc', function () {
            var expected = [{
                    name: 'User (ORM)',
                    description: 'A longer, multi-paragraph description\nexplaining how this all works.\n\nIt is linked to more information.\n',
                    externalDocs: { url: 'https://somewhere.com/yep', description: 'Refer to these docs' }
                }];
            (0, chai_1.expect)(modelsJsDoc.user.tags).to.deep.equal(expected);
        });
        it('should parse `components` from model JSDoc', function () {
            var expected = { examples: { modelDummy: { summary: 'A model example example', value: 'dummy' } } };
            (0, chai_1.expect)(modelsJsDoc.user.components).to.deep.equal(expected);
        });
        it('should parse model JSDoc for blueprint actions', function () {
            var expected = {
                find: { description: '_Alternate description_: Find a list of **User** records that match the specified criteria.\n' },
                allactions: { externalDocs: { description: 'Refer to these docs for more info', url: 'https://somewhere.com/yep' } },
            };
            (0, chai_1.expect)(modelsJsDoc.user.actions).to.deep.equal(expected);
        });
    });
    describe('parseBoundRoutes: sails router:bind events', function () {
        it('Should only parse blueprint and action routes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parsedModels, actual, expectedPaths;
            return __generator(this, function (_a) {
                parsedModels = (0, parsers_1.parseModels)(sails);
                actual = (0, parsers_1.parseBoundRoutes)(boundRoutes, parsedModels, sails);
                expectedPaths = ['/user', '/user/:id', '/user/:id', '/actions2'];
                (0, chai_1.expect)(actual.map(function (r) { return r.path; })).to.deep.equal(expectedPaths);
                (0, chai_1.expect)(actual.every(function (route) {
                    if (route.middlewareType === interfaces_1.MiddlewareType.BLUEPRINT) {
                        return utils_1.blueprintActions.includes(route.blueprintAction);
                    }
                    else {
                        return route.middlewareType === interfaces_1.MiddlewareType.ACTION;
                    }
                })).to.be.true;
                return [2 /*return*/];
            });
        }); });
        it('Should contain route model for all blueprint routes', function () { return __awaiter(void 0, void 0, void 0, function () {
            var parsedModels, actual, expectedPaths, updateUserRoute;
            return __generator(this, function (_a) {
                parsedModels = (0, parsers_1.parseModels)(sails);
                actual = (0, parsers_1.parseBoundRoutes)(boundRoutes, parsedModels, sails);
                expectedPaths = ['/user', '/user/:id', '/user/:id'];
                (0, chai_1.expect)(actual.filter(function (route) { return route.middlewareType == interfaces_1.MiddlewareType.BLUEPRINT && !!route.model; }).map(function (r) { return r.path; }), 'should return model for all blueprint routes').to.deep.equal(expectedPaths);
                updateUserRoute = actual.find(function (route) { return route.blueprintAction === 'update'; });
                (0, chai_1.expect)(!!(updateUserRoute === null || updateUserRoute === void 0 ? void 0 : updateUserRoute.model), 'should parse blueprint routes and auto add model to routes without model (based on action)').to.be.true;
                return [2 /*return*/];
            });
        }); });
    });
    describe('parseControllers', function () {
        var parsedControllers;
        before(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, parsers_1.parseControllers)(sails)];
                    case 1:
                        parsedControllers = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('load and parse `swagger` element exports in controller files', function () {
            it('should parse `tags` from controller swagger element', function () {
                var expected = [{ name: 'User List', description: 'Group just for user list operation', }];
                (0, chai_1.expect)(parsedControllers.controllerFiles.user.swagger.tags).to.deep.equal(expected);
            });
            it('should parse `components` from controller swagger element', function () {
                (0, chai_1.expect)(parsedControllers.controllerFiles.user.swagger.components).to.deep.equal({ parameters: [] });
            });
            it('should parse controller swagger element for actions', function () {
                (0, chai_1.expect)(parsedControllers.controllerFiles.user.swagger.actions).to.contains.keys('list');
            });
        });
        describe('load and parse `swagger` element expoerts in actions2 files', function () {
            it('should parse `tags` from actions2 action swagger element', function () {
                var expected = [{ name: 'Actions2 Group', description: 'A test actions2 group', }];
                (0, chai_1.expect)(parsedControllers.controllerFiles['subdir/actions2'].swagger.tags).to.deep.equal(expected);
            });
            it('should parse `components` from actions2 action swagger element', function () {
                (0, chai_1.expect)(parsedControllers.controllerFiles['subdir/actions2'].swagger.components).to.deep.equal({ parameters: [] });
            });
            it('should parse actions2 action swagger element for actions', function () {
                (0, chai_1.expect)(parsedControllers.controllerFiles['subdir/actions2'].swagger.actions).to.contains.keys('actions2');
            });
        });
    });
    describe('parseControllerJsDoc', function () {
        var parsedControllers;
        var controllersJsDoc;
        before(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, parsers_1.parseControllers)(sails)];
                    case 1:
                        parsedControllers = _a.sent();
                        return [4 /*yield*/, (0, parsers_1.parseControllerJsDoc)(sails, parsedControllers)];
                    case 2:
                        controllersJsDoc = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('load and parse JSDoc comments in controller files', function () {
            it('should parse `tags` from controller JSDoc', function () {
                var expected = [{ name: 'Auth Mgt', description: 'User management and login' }];
                (0, chai_1.expect)(controllersJsDoc.user.tags).to.deep.equal(expected);
            });
            it('should parse `components` from controller JSDoc', function () {
                var expected = { examples: { dummy: { summary: 'An example example', value: 3.0 } } };
                (0, chai_1.expect)(controllersJsDoc.user.components).to.deep.equal(expected);
            });
            it('should parse controller JSDoc for actions', function () {
                (0, chai_1.expect)(controllersJsDoc.user.actions).to.contains.keys('logout');
            });
        });
        describe('load and parse JSDoc comments in actions2 files', function () {
            it('should parse `tags` from actions2 JSDoc', function () {
                var expectedTagsActions2 = [
                    { name: 'Actions2 Mgt', description: 'Actions2 testing' },
                ];
                (0, chai_1.expect)(controllersJsDoc['subdir/actions2'].tags).to.deep.equal(expectedTagsActions2);
            });
            it('should parse `components` from actions2 JSDoc', function () {
                var expected = { examples: { dummyA2: { summary: 'Another example example', value: 4 } } };
                (0, chai_1.expect)(controllersJsDoc['subdir/actions2'].components).to.deep.equal(expected);
            });
            it('should parse actions2 JSDoc', function () {
                (0, chai_1.expect)(controllersJsDoc['subdir/actions2'].actions).to.contains.keys('actions2');
            });
        });
    });
});
