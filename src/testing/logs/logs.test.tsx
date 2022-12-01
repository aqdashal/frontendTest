import React from 'react';
import LogsPage from '../../containers/logs';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('LoggerPage', () => {
    test('should render without crashing', () => {
        render(<LogsPage />);
    })

    test("snapshot", () => {
        const tree = renderer.create(<LogsPage />).toJSON();
        expect(tree).toMatchSnapshot();
    })
    
})