import type { Dose } from "@/app/_types";

export function sortDoseData( data: Dose[] ) {
    if ( typeof data !== undefined || data?.length !== 0 ) {
        const sortedData = data?.sort( ( a, b ) => a.offset - b.offset );
        const sortedDosesLength = sortedData.length;
        const result = [];

        for ( let i = 0; i < sortedDosesLength; i++ ) {
            const currentDoseTimeOffset = sortedData[i]?.offset;
            const nextDoseTimeOffset = sortedData[i + 1]?.offset;
            const subarray = [sortedData[i]];

            while ( i + 1 < sortedDosesLength && nextDoseTimeOffset === currentDoseTimeOffset ) {
                subarray.push( sortedData[i + 1] );
                i++
            }
            if ( subarray.length > 1 ) {
                result.push( subarray );
            } else {
                result.push( subarray[0] );
            }
        }
        return result;
    }
}
