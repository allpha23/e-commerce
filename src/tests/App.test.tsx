import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../test-utils';
import App from '../App';

describe('Testando Blog', () => {
  test('se contem um titulo e um subtitulo', () => {
    render(<App />);

    const text = screen.getByText('App');
    expect(text).toBeInTheDocument();
  });
});
