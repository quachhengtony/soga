import { memo } from 'react';
import { ScheduleComponent, HeaderRowDirective, HeaderRowsDirective, TimelineMonth, Inject, ViewsDirective, ViewDirective, DragAndDrop, Resize } from '@syncfusion/ej2-react-schedule';
import '../styles/Timeline.css';

function Timeline() {
    return (
        <div className='timeline'>
            <ScheduleComponent width='100%' height='100%' allowDragAndDrop={true}>
                <HeaderRowsDirective>
                    <HeaderRowDirective option='Month'/>
                    <HeaderRowDirective option='Date'/>
                </HeaderRowsDirective>
                <ViewsDirective>
                    <ViewDirective option='TimelineMonth' interval={12}/>
                </ViewsDirective>
                <Inject services={[TimelineMonth, Resize, DragAndDrop]}/>
            </ScheduleComponent>
        </div>
    );
}

export default memo(Timeline);