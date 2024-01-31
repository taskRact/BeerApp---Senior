import { render } from '@testing-library/react';
import Beer from './index';

describe('Beer', () => {
    test('checks the type of Beer component', () => {
        render(<Beer />);
        expect(typeof Beer).toBe('function');
    });
});