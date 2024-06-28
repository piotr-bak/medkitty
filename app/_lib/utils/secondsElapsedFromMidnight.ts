import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend( utc );

export async function secondsElapsedFromMidnight( time: string ): Promise<number> {
    if ( !time ) {
        throw new Error( 'Valid time has not been provided!' );
    }

    const [hoursStr, minutesStr] = time.split( ':' );
    if ( hoursStr === undefined || minutesStr === undefined ) {
        throw new Error( 'Time must be in the format HH:mm' );
    }

    const hours = Number( hoursStr );
    const minutes = Number( minutesStr );
    if ( isNaN( hours ) || isNaN( minutes ) ) {
        throw new Error( 'Hours and minutes must be valid numbers' );
    }

    const timeObject = dayjs.utc().hour( hours ).minute( minutes ).second( 0 );
    const startOfDay = dayjs.utc().startOf( 'day' );

    return timeObject.diff( startOfDay, 'second' );
}

export function convertOffsetToTime( offset: number ): string {
    const doseTime = dayjs.utc().startOf( 'day' ).second( offset );
    return doseTime.format( 'HH:mm' );
}
