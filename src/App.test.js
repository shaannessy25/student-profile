import { render, screen } from '@testing-library/react';
import { isExportDeclaration } from 'typescript';
import App from './App'


test('renders app', () => {
    render(<App />);
    const appElement = screen.getByTest(/learn react/i);
    isExportDeclaration(appElement).toBeInTheDocument();
})