import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import Home from '../../pages/Home';
import Chat from '../../pages/Chat';
import { processMessageToChatGPT, getAiSuggestion } from '../../services/ai';
import { getOutputToken, getOutputStatus } from '../../services/compileApi';
import { BrowserRouter } from 'react-router-dom';

vi.mock('axios');

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

describe("Multiple Language Flexibility - Integration Tests", () => {
    it("", async () => {

    });

    it("", async () => {

    });
});

describe("Instant Compilation - Integration Tests", () => {
    it('should submit source code and return a compilation token', async () => {
        const mockToken = 'mockToken';
        const mockResponse = { data: { token: mockToken } };

        axios.request.mockResolvedValue(mockResponse);

        const sourceCode = 'console.log("Hello, world!");';
        const languageId = 1;
        const customInput = '';

        const token = await getOutputToken(sourceCode, languageId, customInput);

        expect(token).toBe(mockToken);
        expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
            method: 'POST',
            url: expect.any(String),
            data: expect.objectContaining({
                language_id: languageId,
                source_code: expect.any(String),
                stdin: expect.any(String),
            }),
        }));
    });

    it("", async () => {

    });
});

describe("Multiple Themes - Integration Tests", () => {
    it("", async () => {

    });

    it("", async () => {

    });
});

describe("Code Suggestions - Integration Tests", () => {
    it("provides code suggestions properly", async () => {
        const mockResponse = { data: { choices: [{ message: { content: "console.log('Hello, world!');" } }] } };
        axios.post.mockResolvedValue(mockResponse);

        const code = 'console.log("Hello, world!");';
        const language = 'JavaScript';
        const response = await getAiSuggestion(code, language);

        expect(response).toBe("console.log('Hello, world!');");
        expect(axios.post).toHaveBeenCalledWith(expect.any(String), expect.any(Object), expect.any(Object));
    });

    it("", async () => {

    });
});

describe("Error Suggestions - Integration Tests", () => {
    it('should retrieve compilation status and output with the given token', async () => {
        const mockOutput = 'Hello, world!';
        const mockResponse = { data: { stdout: btoa(mockOutput), status: { description: 'Accepted' } } };

        axios.request.mockResolvedValue(mockResponse);

        const token = 'mockToken';
        const response = await getOutputStatus(token);

        expect(response.data).toHaveProperty('stdout', btoa(mockOutput));
        expect(response.data.status.description).toBe('Accepted');
        expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
            method: 'GET',
            url: expect.stringContaining(token),
        }));
    });

    it("", async () => {

    });
});

describe("Chatbot Integration - Integration Tests", () => {
    it("should process messages correctly", async () => {
        const mockResponse = { data: { choices: [{ message: { content: "This is how you can implement a useState." } }] } };
        axios.post.mockResolvedValue(mockResponse);

        const chatMessages = [
            { sender: 'User', message: 'How do I use a useState?' }
        ];
        const response = await processMessageToChatGPT(chatMessages);

        expect(response).toBe("This is how you can implement a useState.");
        expect(axios.post).toHaveBeenCalledWith(expect.any(String), expect.any(Object), expect.any(Object));
    });

    it("", async () => {

    });
});