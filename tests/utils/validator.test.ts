import { expect } from 'chai';
import { validate } from '../../src/utils/validator';

describe('Pruebas unitarias: validator', () => {
    it('debe exportar la función validate', () => {
        expect(validate).to.be.a('function');
    });
});
