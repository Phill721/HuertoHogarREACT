/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Run cleanup after each test automatically
afterEach(() => cleanup());

// Mock completo de localStorage para Vitest
const localStorageMock = (() => {
    let store: Record<string, string> = {};

    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = String(value);
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        },
    };
})();

Object.defineProperty(global, "localStorage", {
    value: localStorageMock,
});