import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Home from '../../pages/Home';
import Chat from '../../pages/Chat';
import { BrowserRouter } from 'react-router-dom';

const MockHome = () => {
    return (
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    )
}

const MockChat = () => {
    return (
        <BrowserRouter>
            <Chat />
        </BrowserRouter>
    )
}

describe("Multiple Language Flexibility - Unit Tests", () => {
    it("should render the language selection dropdown properly", async () => {
        const renderLanguage = render(
            <MockHome />
        );

        const language = await renderLanguage.findByTestId('language');
        expect(language).toBeDefined();
    });

    it("", async () => {

    });
});

describe("Instant Compilation - Unit Tests", () => {
    it("should render the code editor properly", async () => {
        const renderEditor = render(
            <MockHome />
        );

        // check if text for parts of code editor appear
        expect(renderEditor.getByText('Code Editor')).toBeInTheDocument();
        expect(renderEditor.getByText('Run')).toBeInTheDocument();
        expect(renderEditor.getByText('AskAI')).toBeInTheDocument();
    });

    it("should render the compiler properly", async () => {
        const renderCompiler = render(
            <MockHome />
        );

        const compiler = await renderCompiler.findByTestId('compiler');
        expect(compiler).toBeDefined();
    })
});

describe("Multiple Themes - Unit Tests", () => {
    it("should render the theme select drop down properly", async () => {
        const renderThemeSelector = render(
            <MockHome />
        )

        const themeSelector = await renderThemeSelector.findByTestId('theme');
        expect(themeSelector).toBeDefined();
    });

    it("", async () => {

    });
});

describe("Code Suggestions - Unit Tests", () => {
    it("should render the askai button properly", async () => {
        const renderAskAI = render(
            <MockHome />
        )

        const askAI = await renderAskAI.findByTestId("askai");
        expect(askAI).toBeDefined();
    });

    it("should render the ai code suggestion properly", async () => {
        const renderCodeSuggestion = render(
            <MockHome />
        )

        fireEvent.click(renderCodeSuggestion.getByText(/AskAI/i));
        const codeSuggestion = await renderCodeSuggestion.findByTestId("code-suggestion");
        expect(codeSuggestion).toBeDefined();
    });
});

describe("Error Suggestions - Unit Test", () => {
    it("should display the status of the compiler after running", async () => {
        const renderCorrect = render(
            <MockHome />
        )

        fireEvent.click(renderCorrect.getByText(/Run/i));
        const status = await renderCorrect.findByTestId("status");
        expect(status).toBeDefined();
    });

    it("", async () => {

    });
});

describe("Chatbot Integration - Unit Tests", () => {
    it("should initialize with the correct initial message", async () => {
        const renderChat = render(<MockChat />);
        const initialMessage = renderChat.getByText("Hello, I'm your personal AI Assistant. Feel free to ask me anything!");
        expect(initialMessage).toBeDefined();
    });

    it("should render all messages properly", async () => {
        const renderedMessages = render(<MockChat />);
        const message = await renderedMessages.findAllByTestId(/^message/);
        expect(message.length).toEqual(1);
    });

    it("should render the chatbox properly", async () => {
        const renderedChatbox = render(<MockChat />);
        const chatBox = await renderedChatbox.findByTestId('input')
        expect(chatBox).toBeDefined();
    });
});