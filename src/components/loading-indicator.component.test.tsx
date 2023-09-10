import { render } from '@testing-library/react';
import React from 'react';

import LoadingIndicator from './loading-indicator.component';

describe('LoadingIndicator', () => {
  it('renders without errors', () => {
    render(<LoadingIndicator />);
  });

  it('has the correct class', () => {
    const { container } = render(<LoadingIndicator />);
    const indicator = container.querySelector('.indicator');
    expect(indicator).toBeNull();
  });

  it('matches snapshot', () => {
    const { container } = render(<LoadingIndicator />);
    expect(container).toMatchSnapshot();
  });
});
