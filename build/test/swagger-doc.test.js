"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var generatedSwagger_json_1 = __importDefault(require("./fixtures/generatedSwagger.json"));
var fs = __importStar(require("fs"));
var chai_1 = require("chai");
var normalizeSwagger = function (value) {
    if (Array.isArray(value)) {
        return value.map(normalizeSwagger);
    }
    if (value && typeof value === 'object') {
        var valueMap_1 = value;
        var normalized = Object.keys(valueMap_1).reduce(function (ret, key) {
            ret[key] = normalizeSwagger(valueMap_1[key]);
            return ret;
        }, {});
        if (Array.isArray(normalized.tags)) {
            normalized.tags = __spreadArray([], normalized.tags, true).sort(function (a, b) {
                var aTag = a;
                var bTag = b;
                var aName = typeof aTag.name === 'string' ? aTag.name : '';
                var bName = typeof bTag.name === 'string' ? bTag.name : '';
                return aName.localeCompare(bName);
            });
        }
        return normalized;
    }
    return value;
};
// kinda integration test that covers generatePath to
// an extent before we break the function and test each unit
// imported in bootstrap.test.ts
exports.default = (function () {
    describe('generate correct Swagger / OpenAPI 3 output (integration test)', function () {
        it('should generate expected JSON', function (done) {
            var generated = JSON.parse(fs.readFileSync('./swagger/swagger.json', 'utf8'));
            (0, chai_1.expect)(normalizeSwagger(generated)).to.deep.equal(normalizeSwagger(generatedSwagger_json_1.default));
            done();
        });
    });
});
