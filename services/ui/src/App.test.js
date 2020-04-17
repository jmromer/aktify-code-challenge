import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

test('renders campaign management link', () => {
    const {getAllByText} = render(<App />);
    const nodes = getAllByText(/Campaigns/i);

    for (let node of nodes) {
        expect(node).toBeInTheDocument();
    }
});
