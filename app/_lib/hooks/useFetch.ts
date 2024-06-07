import { useEffect, useState } from 'react';
import serverErrors from './httpErrorCodes';

interface FetchOptions extends RequestInit {
    logErrors?: boolean;
}

export function useFetch<T>(url: string, options?: FetchOptions) {
    const [data, setData] = useState<T | null | undefined>(undefined);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setData(undefined);
        setIsError(false);

        const controller = new AbortController();

        (async () => {
            try {
                const response = await fetch(url, {
                    signal: controller.signal,
                    ...options,
                });
                if (!response.ok) {
                    const message = `Invalid server response. Error ${response.status}: ${serverErrors.get(response.status)}`;
                    setData(null);
                    throw new Error(message);
                } else {
                    const json = await response.json();
                    setData(json);
                }
            } catch (error) {
                if (error instanceof Error) {
                    if ('AbortError' === error.name) return;
                    setIsError(true);
                    if (options?.logErrors !== false)
                        console.error(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        })();

        return () => controller.abort();
    }, [url, options]);

    return { data, isError, isLoading };
}
