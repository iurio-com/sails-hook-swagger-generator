"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var transformations_1 = require("../lib/transformations");
var lodash_1 = require("lodash");
var generators_1 = require("../lib/generators");
var parsedRoutes_json_1 = __importDefault(require("./fixtures/parsedRoutes.json"));
var sails = {
    log: {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        warn: function () { },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        error: function () { }
    },
};
describe('Transformations', function () {
    describe('transformSailsPathsToSwaggerPaths', function () {
        it('should convert `/:id` paths to `/{id}` paths (for all such variables)', function () {
            var inputPaths = [
                '/user',
                '/actions2',
                '/user/login',
                '/user/logout',
                '/user/list',
                '/user/list2',
                '/user/upload',
                '/user/roles',
                '/user/test/:phoneNumber',
                '/clients/:client_id/user/:id',
                '/user',
                '/user/:id',
                '/user/:id',
                '/user/:id?'
            ];
            var expectedOutputPaths = [
                '/user',
                '/actions2',
                '/user/login',
                '/user/logout',
                '/user/list',
                '/user/list2',
                '/user/upload',
                '/user/roles',
                '/user/test/{phoneNumber}',
                '/clients/{client_id}/user/{id}',
                '/user',
                '/user/{id}',
                '/user/{id}',
                '/user/{id}'
            ];
            var routes = inputPaths.map(function (p) { return ({ path: p }); });
            (0, transformations_1.transformSailsPathsToSwaggerPaths)(routes);
            var paths = routes.map(function (r) { return r.path; });
            (0, chai_1.expect)(paths).to.deep.equal(expectedOutputPaths);
        });
    });
    describe('aggregateAssociationRoutes', function () {
        it('should aggreggate association-based blueprint routes', function () {
            var routes = parsedRoutes_json_1.default;
            var expectedOutputPaths = [
                '/user',
                '/user',
                '/actions2',
                '/twofind',
                '/twoclear',
                '/user/login',
                '/user/logout',
                '/user/list',
                '/user/list2',
                '/user/upload',
                '/user/roles',
                '/nomodel/deep-url/more/find',
                '/nomodel/deep-url/more/clear',
                '/nomodel/deep-url/more/should_be_excluded',
                '/user/test/{phoneNumber}',
                '/clients/{client_id}/user/{_id}',
                '/oldpet/find',
                '/oldpet/find/{_petID}',
                '/oldpet/create',
                '/oldpet/update/{_petID}',
                '/oldpet/destroy/{_petID}',
                '/pet/find',
                '/pet/find/{_petID}',
                '/pet/create',
                '/pet/update/{_petID}',
                '/pet/destroy/{_petID}',
                '/user/find',
                '/user/find/{_id}',
                '/user/create',
                '/user/update/{_id}',
                '/user/destroy/{_id}',
                '/user/{_id}/{association}/add/{childid}',
                '/user/{_id}/{association}/replace',
                '/user/{_id}/{association}/remove/{childid}',
                '/oldpet',
                '/oldpet/{_petID}',
                '/oldpet',
                '/oldpet/{_petID}',
                '/oldpet/{_petID}',
                '/oldpet/{_petID}',
                '/oldpet/{_petID}/{association}',
                '/pet',
                '/pet/{_petID}',
                '/pet',
                '/pet/{_petID}',
                '/pet/{_petID}',
                '/pet/{_petID}',
                '/pet/{_petID}/{association}',
                '/user',
                '/user/{_id}',
                '/user/{_id}',
                '/user/{_id}',
                '/user/{_id}',
                '/user/{_id}/{association}/{childid}',
                '/user/{_id}/{association}',
                '/user/{_id}/{association}/{childid}',
                '/user/{_id}/{association}',
            ];
            (0, transformations_1.transformSailsPathsToSwaggerPaths)(routes);
            routes = (0, transformations_1.aggregateAssociationRoutes)(routes);
            var paths = routes.map(function (r) { return r.path; });
            (0, chai_1.expect)(paths).to.deep.equal(expectedOutputPaths);
        });
    });
    var componentsFromConfiguration = {
        schemas: { existingSchema: {} }
    };
    var tagsFromConfiguration = [
        { name: 'existing' }
    ];
    var models = {
        user: {
            globalId: 'User',
            identity: 'user',
            primaryKey: 'id',
            attributes: {},
            swagger: {
                components: {
                    schemas: { modelSchema: {} }
                },
                tags: [{ name: 'modelTag' }]
            }
        }
    };
    var modelsJsDoc = {
        user: {
            tags: [{ name: 'modelsJsDocTag' }],
            components: {
                examples: { dummy: { summary: 'An example', value: 'dummy' } }
            },
            actions: {
                find: { description: 'Description', parameters: [], responses: {} }
            }
        }
    };
    var controllers = {
        controllerFiles: {
            user: {
                globalId: 'User',
                identity: 'user',
                actionType: 'controller',
                defaultTagName: 'User',
                swagger: {
                    components: {
                        schemas: { controllerSchema: {} }
                    },
                    tags: [{ name: 'controllerTag' }],
                    actions: {
                        upload: {
                            tags: ['controllerTag']
                        }
                    }
                }
            }
        },
        actions: {
            'user/upload': {
                actionType: 'controller',
                defaultTagName: 'User',
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                fn: function () { },
            }
        },
    };
    var controllersJsDoc = {
        user: {
            tags: [{ name: 'controllersJsDocTag' }],
            actions: {
                logout: {
                    summary: 'Perform Logout',
                    description: 'Logout of the application',
                    tags: ['Auth Mgt'],
                    parameters: [{
                            name: 'example-only',
                            description: 'Username to use for logout (dummy for test)',
                            in: 'path',
                            required: true,
                            schema: { type: 'string' }
                        }],
                    responses: { '200': { description: 'logout result' } }
                }
            }
        }
    };
    describe('mergeModelJsDoc', function () {
        it('should merge model JSDoc `actions` and `model` elements into model `swagger` element', function () {
            var destModels = (0, lodash_1.cloneDeep)(models);
            (0, transformations_1.mergeModelJsDoc)(destModels, modelsJsDoc);
            var expected = (0, lodash_1.cloneDeep)(models);
            (0, lodash_1.defaults)(expected.user.swagger, {
                actions: (0, lodash_1.cloneDeep)(modelsJsDoc.user.actions)
            });
            (0, chai_1.expect)(destModels).to.deep.equal(expected);
        });
    });
    describe('mergeControllerJsDoc', function () {
        it('should merge model JSDoc `actions` and `model` elements into model `swagger` element', function () {
            var destControllers = (0, lodash_1.cloneDeep)(controllers);
            (0, transformations_1.mergeControllerJsDoc)(destControllers, controllersJsDoc);
            var expected = (0, lodash_1.cloneDeep)(controllers);
            (0, lodash_1.defaults)(expected.controllerFiles.user.swagger.actions, (0, lodash_1.cloneDeep)(controllersJsDoc.user.actions));
            (0, chai_1.expect)(destControllers).to.deep.equal(expected);
        });
    });
    describe('mergeControllerSwaggerIntoRouteInfo', function () {
        it('should merge controller file Swagger/JSDoc into `routes` from controller files', function () {
            var routes = (0, lodash_1.cloneDeep)(parsedRoutes_json_1.default);
            var expected = (0, lodash_1.cloneDeep)(parsedRoutes_json_1.default);
            expected.map(function (route) {
                if (route.action === 'user/upload') {
                    route.actionType = 'controller';
                    route.defaultTagName = 'User';
                    route.swagger.tags = ['controllerTag'];
                }
            });
            // XXX TODO increase test data in controllers and controllersJsDoc
            (0, transformations_1.mergeControllerSwaggerIntoRouteInfo)(sails, routes, controllers, controllersJsDoc);
            (0, chai_1.expect)(routes).to.deep.equal(expected);
        });
    });
    describe('mergeComponents', function () {
        it("should merge component definitions from models and controllers", function () {
            var destComponents = (0, lodash_1.cloneDeep)(componentsFromConfiguration);
            (0, transformations_1.mergeComponents)(destComponents, models, modelsJsDoc, controllers, controllersJsDoc);
            (0, chai_1.expect)(Object.keys(destComponents.schemas)).to.deep.equal([
                'existingSchema', 'modelSchema', 'controllerSchema'
            ], 'merge of components props to existing components');
        });
    });
    describe('mergeTags', function () {
        it("should merge tags from models, controllers and default definitions", function () {
            var defaultModelTags = (0, generators_1.generateDefaultModelTags)(models);
            var destTags = (0, lodash_1.cloneDeep)(tagsFromConfiguration);
            var expectedDefaultModelTags = {
                description: 'Sails blueprint actions for the **User** model',
                name: 'User'
            };
            (0, transformations_1.mergeTags)(destTags, models, modelsJsDoc, controllers, controllersJsDoc, defaultModelTags);
            (0, chai_1.expect)(destTags).to.deep.equal([
                tagsFromConfiguration[0],
                models.user.swagger.tags[0],
                modelsJsDoc.user.tags[0],
                controllers.controllerFiles.user.swagger.tags[0],
                controllersJsDoc.user.tags[0],
                expectedDefaultModelTags
            ], 'merge of tag definitions to existing tags');
        });
    });
});
