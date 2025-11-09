// src/hooks/useDebounce.ts
import { useEffect, useState } from 'react';

/**
 * Debounce a value. Returns debouncedValue which updates only after delay ms.
 */
export function useDebounce<T>(value: T, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const id = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);

    return debouncedValue;
}
