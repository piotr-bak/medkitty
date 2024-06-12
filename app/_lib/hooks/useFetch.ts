import useSWR, { mutate } from 'swr';
import type { SWRConfiguration } from 'swr';
import serverErrors from './httpErrorCodes';

interface FetchOptions extends RequestInit {
    logErrors?: boolean;
}

const fetcher = async ( url: string, options?: FetchOptions ) => {
    try {
        const response = await fetch( url, options );

        if ( !response.ok ) {
            const message = `Invalid server response. Error ${response.status}: ${serverErrors.get( response.status )}`;
            throw new Error( message );
        }

        const data = await response.json();
        return data !== undefined ? data : null; // Ensure null if no data is received
    } catch ( error ) {
        if ( options?.logErrors !== false && error instanceof Error ) {
            console.error( error.message );
        }
        throw error;
    }
};

export function useFetch<T>( url: string, options?: FetchOptions & SWRConfiguration ) {
    const { data, error, isValidating } = useSWR<T>( url, () => fetcher( url, options ), { ...options, shouldRetryOnError: false } );

    // Undefined while fetching, null if fetch complete but no data received
    let formattedData: T | null | undefined = data;

    if ( isValidating && formattedData === undefined ) {
        formattedData = undefined;
    } else if ( !isValidating && data === undefined ) {
        formattedData = null;
    }

    return {
        data: formattedData,
        isError: !!error,
        isLoading: isValidating && !formattedData,
    };
}

export function revalidateFetch( url: string ) {
    mutate( url );
}
