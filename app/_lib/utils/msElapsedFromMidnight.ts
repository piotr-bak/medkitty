export async function msElapsedFromMidnight( time: string ) {
    const [hoursStr, minutesStr] = time.split( ':' ).map( ( item ) => { return item } );
    const hours = Number( hoursStr );
    const minutes = Number( minutesStr );
    return ( hours * 60 * 60 * 1000 ) + ( minutes * 60 * 1000 );
}
