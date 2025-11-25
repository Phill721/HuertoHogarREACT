/// <reference types="vitest/globals" />
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// Run cleanup after each test automatically
afterEach(() => cleanup());
