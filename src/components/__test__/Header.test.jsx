import { render, screen } from '@testing-library/react'
import Header from '../Header'
import { BrowserRouter as Router } from 'react-router-dom';

test('renders navigation links correctly', () => {
    render(
        <Router>
            <Header />
        </Router>
    )

    // Check if the brand logo is present and contains the correct text
    const brandElement = screen.getByText('SmartScript');
    expect(brandElement).toBeDefined();

    // Check if the navigation links are present and contain the correct text
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeDefined();

    const askAILink = screen.getByText('Ask AI');
    expect(askAILink).toBeDefined();

    const docsLink = screen.getByText('documentation');
    expect(docsLink).toBeDefined();

    const teamLink = screen.getByText('Team');
    expect(teamLink).toBeDefined();
})