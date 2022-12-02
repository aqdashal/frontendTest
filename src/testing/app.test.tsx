import React from 'react';
import { render, act } from '@testing-library/react';
import App from '../App';

test('should render without crashing', async () => {
    await act(async () => render(<App />));

});