import { render, screen } from '@testing-library/react';
import Beer from './index';

describe('Beer', () => {

    test('renders Beer component', () => {
        render(<Beer />);
        expect(screen.getByText('Beer Details')).toBeInTheDocument();
    });

    test('checks the type of Beer component', () => {
        render(<Beer />);
        expect(typeof Beer).toBe('function');
    });
});