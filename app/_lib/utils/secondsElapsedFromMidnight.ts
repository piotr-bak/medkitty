import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend( utc );

export async function secondsElapsedFromMidnight( time: string ): Promise<number> {
    const [hoursStr, minutesStr] = time.split( ':' );

    const hours = Number( hoursStr );
    const minutes = Number( minutesStr );

    const timeObject = dayjs.utc().hour( hours ).minute( minutes ).second( 0 );
    const startOfDay = dayjs.utc().startOf( 'day' );

    return timeObject.diff( startOfDay, 'second' );
}

export function convertOffsetToTime( offset: number ): string {
    const doseTime = dayjs.utc().startOf( 'day' ).second( offset );
    return doseTime.format( 'HH:mm' );
}
