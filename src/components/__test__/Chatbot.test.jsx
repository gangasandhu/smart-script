import { render } from '@testing-library/react';
import Chat from '../../pages/Chat';

describe("Chatbot - Unit Test", () => {
    it("should initialize with the correct initial message", async () => {
        const renderChat = render(<Chat />);
        const initialMessage = await renderChat.getByText("Hello, I'm ChatGPT. Feel free to ask me anything!");
        expect(initialMessage).toBeDefined();
    });

    it("should render all messages properly", async () => {
        const renderedChat = render(<Chat />);
        const message = await renderedChat.findAllByTestId(/^message/);
        expect(message.length).toEqual(1);
    });
});