import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import Home from '../../pages/Home';
import Chat from '../../pages/Chat';
import userEvent from '@testing-library/user-event';
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
    it("updates the code editor to reflect coding in python", async () => {
        render(<MockHome />);

        const languageDropdown = screen.getByTestId('language-tab');
        userEvent.click(languageDropdown);
        await waitFor(() => userEvent.type(languageDropdown, '{arrowdown}{enter}'));

        await waitFor(() => {
            const editor = screen.getByTestId('editor');
            expect(editor).toBeDefined();
        }, { timeout: 2000 });
    });

    it("updates the code editor to reflect coding in typescript", async () => {
        render(<MockHome />);

        const languageDropdown = screen.getByTestId('language-tab');
        userEvent.click(languageDropdown);
        await waitFor(() => userEvent.type(languageDropdown, '{arrowdown}{arrowdown}{enter}'));

        await waitFor(() => {
            const editor = screen.getByTestId('editor');
            expect(editor).toBeDefined();
        }, { timeout: 2000 });
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

    it('should retrieve the compilation output using token', async () => {
        const mockToken = 'mockToken';
        const mockTokenResponse = { data: { token: mockToken } };
        axios.request.mockResolvedValueOnce(mockTokenResponse);

        const mockOutput = 'Hello, world!';
        const mockStatusId = 3;
        const mockOutputResponse = {
            data: {
                stdout: btoa(mockOutput),
                status: { id: mockStatusId, description: "Accepted" }
            }
        };
        axios.request.mockResolvedValueOnce(mockOutputResponse);

        const sourceCode = 'console.log("Hello, world!");';
        const languageId = 1;
        const customInput = '';
        await getOutputToken(sourceCode, languageId, customInput);

        const response = await getOutputStatus(mockToken);
        const output = atob(response.data.stdout);

        expect(output).toBe(mockOutput);
        expect(response.data.status.id).toBe(mockStatusId);
        expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
            method: 'GET',
            url: expect.stringContaining(mockToken),
        }));
    });
});

describe("Multiple Themes - Integration Tests", () => {
    it("should correctly changes the theme to light when selected", async () => {
        render(<MockHome />);

        const themeDropdown = screen.getByTestId('theme-tab');
        userEvent.click(themeDropdown);
        fireEvent.keyDown(themeDropdown, { key: 'ArrowDown', code: 'ArrowDown' });
        await waitFor(() => userEvent.type(themeDropdown, '{arrowdown}{enter}'));

        await waitFor(() => {
            const backgroundColor = getComputedStyle(document.body).backgroundColor;
            expect(backgroundColor).toBe('rgba(0, 0, 0, 0)');
        }, { timeout: 2000 });
    });

    it("should correctly changes the theme to high contrast when selected", async () => {
        render(<MockHome />);

        const themeDropdown = screen.getByTestId('theme-tab');
        userEvent.click(themeDropdown);
        fireEvent.keyDown(themeDropdown, { key: 'ArrowDown', code: 'ArrowDown' });
        await waitFor(() => userEvent.type(themeDropdown, '{arrowdown}{arrowdown}{enter}'));

        await waitFor(() => {
            const backgroundColor = getComputedStyle(document.body).backgroundColor;
            expect(backgroundColor).toBe('rgba(0, 0, 0, 0)');
        }, { timeout: 2000 });
    });
});

describe("Code Suggestions - Integration Tests", () => {
    it("should provide code suggestions properly", async () => {
        const mockResponse = { data: { choices: [{ message: { content: "console.log('Hello, world!');" } }] } };
        axios.post.mockResolvedValue(mockResponse);

        const code = 'console.log("Hello, world!");';
        const language = 'JavaScript';
        const response = await getAiSuggestion(code, language);

        expect(response).toBe("console.log('Hello, world!');");
        expect(axios.post).toHaveBeenCalledWith(expect.any(String), expect.any(Object), expect.any(Object));
    });

    it("should log an error when retrieving code suggestions fails", async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        const errorMessage = "Network error: Unable to fetch code suggestions";
        axios.post.mockRejectedValue(new Error(errorMessage));
        const code = 'console.log("Hello, world!");';
        const language = 'JavaScript';
    
        await getAiSuggestion(code, language);
    
        expect(consoleSpy).toHaveBeenCalled();
        expect(consoleSpy).toHaveBeenCalledWith(
          "Error:",
          expect.objectContaining({ message: errorMessage })
        );
        consoleSpy.mockRestore();
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

    it('should correctly handles compilation errors', async () => {
        const mockErrorResponse = {
            data: {
                stderr: btoa("Syntax error on line 1"),
                status: { description: 'Compilation Error' }
            }
        };
        axios.request.mockResolvedValueOnce(mockErrorResponse);

        const token = 'errorToken';
        const response = await getOutputStatus(token);

        const errorMessage = atob(response.data.stderr);

        expect(errorMessage).toBe("Syntax error on line 1");
        expect(response.data.status.description).toBe('Compilation Error');
        expect(axios.request).toHaveBeenCalledWith(expect.objectContaining({
            method: 'GET',
            url: expect.stringContaining(token),
        }));
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

    it("should handle errors from the chatbot service", async () => {
        const mockErrorResponse = { data: { choices: null } };
        axios.post.mockRejectedValue(mockErrorResponse);

        let errorResponse;
        try {
            errorResponse = await processMessageToChatGPT(chatMessages);
        } catch (error) {
            console.error('Error during test:', error);
        }

        expect(errorResponse).toEqual(undefined);
    });
});