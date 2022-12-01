import React from 'react';
import LoggerPage from '../../containers/logger';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('LoggerPage', () => {
    test('should render without crashing', () => {
        render(<LoggerPage />);
    })

    test("snapshot", () => {
        const tree = renderer.create(<LoggerPage />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    
})