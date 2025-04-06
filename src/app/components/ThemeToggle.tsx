'use client';

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, resolvedTheme } = useTheme()

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const isDarkMode = resolvedTheme === 'dark';

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <button
            onClick={toggleTheme}
            className="px-3 py-1 border rounded dark:border-gray-600"
            aria-label="Toggle dark mode"
        >
            {isDarkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
    );
}