import Timeline from "@mui/lab/Timeline";
import TimelineItme from "@mui/lab/TimelineItem";
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

const items = [
    {}, {}, {}, {}
]

export function MedTimeline() {
    return (
        <>
            <Timeline>
                {items.map( ( item, index ) => {
                    return (
                        <TimelineItme>
                            <TimelineOppositeContent>
                                0{index}:00 am
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                Clopidogrel
                            </TimelineContent>
                        </TimelineItme>
                    )
                } )}
            </Timeline>
        </>
    )
}
