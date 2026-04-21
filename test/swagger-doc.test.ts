import swaggerJson from './fixtures/generatedSwagger.json';
import * as fs from 'fs';
import { expect } from 'chai';

const normalizeSwagger = (value: unknown): unknown => {
    if (Array.isArray(value)) {
        return value.map(normalizeSwagger);
    }

    if (value && typeof value === 'object') {
        const valueMap = value as Record<string, unknown>;
        const normalized = Object.keys(valueMap).reduce((ret, key) => {
            ret[key] = normalizeSwagger(valueMap[key]);
            return ret;
        }, {} as Record<string, unknown>);

        if (Array.isArray(normalized.tags)) {
            normalized.tags = [...normalized.tags].sort((a, b) => {
                const aTag = a as { name?: unknown };
                const bTag = b as { name?: unknown };
                const aName = typeof aTag.name === 'string' ? aTag.name : '';
                const bName = typeof bTag.name === 'string' ? bTag.name : '';
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
export default () => {
    describe('generate correct Swagger / OpenAPI 3 output (integration test)', () => {
        it('should generate expected JSON', done => {
            const generated = JSON.parse(fs.readFileSync('./swagger/swagger.json', 'utf8'));
            expect(normalizeSwagger(generated)).to.deep.equal(normalizeSwagger(swaggerJson));
            done();
        })
    })
}
