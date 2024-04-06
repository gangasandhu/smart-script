import { render, screen } from '@testing-library/react'
import Header from '../Header'
import { BrowserRouter as Router } from 'react-router-dom';

test('Renders navigation links correctly', () => {
    render(
        <Router>
            <Header />
        </Router>
    )

    const brandElement = screen.getByText('SmartScript');
    expect(brandElement).toBeDefined();

    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeDefined();

    const askAILink = screen.getByText('Chat AI');
    expect(askAILink).toBeDefined();

    const docsLink = screen.getByText('Documentation');
    expect(docsLink).toBeDefined();

    const teamLink = screen.getByText('Team');
    expect(teamLink).toBeDefined();
})