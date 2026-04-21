"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var additionalConfig_json_1 = __importDefault(require("./fixtures/additionalConfig.json"));
var swagger_doc_test_1 = __importDefault(require("./swagger-doc.test"));
/**
 * Created by theophy on 02/08/2017.
 */
var Sails = require('sails').Sails;
// eslint-disable-next-line @typescript-eslint/no-var-requires
var swaggergenerator = require('../');
describe('Basic tests ::', function () {
    // Var to hold a running sails app instance
    var sails;
    // Before running any tests, attempt to lift Sails
    before(function (done) {
        // Hook will timeout in 10 seconds
        this.timeout(11000);
        process.env.PORT = String(15000 + (process.pid % 10000));
        // Attempt to lift sails
        Sails().lift({
            blueprints: {
                shortcuts: true,
            },
            hooks: {
                // Load the hook
                swaggergenerator: swaggergenerator,
                // Skip grunt (unless your hook uses it)
                grunt: false
            },
            log: { level: "silent" },
            swaggergenerator: __assign({}, additionalConfig_json_1.default),
        }, function (err, _sails) {
            if (err)
                return done(err);
            sails = _sails;
            return done();
        });
    });
    // After tests are complete, lower Sails
    after(function (done) {
        // Lower Sails (if it successfully lifted)
        if (sails) {
            return sails.lower(done);
        }
        // Otherwise just return
        return done();
    });
    // Test that Sails can lift with the hook in place
    it('sails does not crash on loading our hook', function () {
        return true;
    });
    (0, swagger_doc_test_1.default)();
});
