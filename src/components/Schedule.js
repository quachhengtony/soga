// import './Schedule.css';
// import { ScheduleComponent, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective, Inject, TimelineViews, TimelineMonth } from '@syncfusion/ej2-react-schedule';
// import { SampleBase } from '../shared/SampleBase';

// export default class Schedule extends SampleBase {
//     constructor() {
//         super(...arguments);
//         this.employeeData = [
//             { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Content writer' },
//             { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Designer' },
//             { Text: 'Robert', Id: 3, GroupId: 3, Color: '#bbdc00', Designation: 'Software Engineer' },
//             { Text: 'Robson', Id: 4, GroupId: 4, Color: '#9e5fff', Designation: 'Support Engineer' },
//             { Text: 'Laura', Id: 5, GroupId: 5, Color: '#bbdc00', Designation: 'Human Resource' },
//             { Text: 'Margaret', Id: 6, GroupId: 6, Color: '#9e5fff', Designation: 'Content Analyst' }
//         ];
//     }
//     getEmployeeName(value) {
//         return value.resourceData[value.resource.textField];
//     }
//     getEmployeeImage(value) {
//         let resourceName = this.getEmployeeName(value);
//         return resourceName.toLowerCase();
//     }
//     getEmployeeDesignation(value) {
//         return value.resourceData.Designation;
//     }
//     resourceHeaderTemplate(props) {
//         return (<div className="template-wrap"><div className="employee-category"><div className={"employee-image " + this.getEmployeeImage(props)}></div><div className="employee-name">
//             {this.getEmployeeName(props)}</div><div className="employee-designation">{this.getEmployeeDesignation(props)}</div></div></div>);
//     }
//     render() {
//         return (
//             <div className='container'>
//                 <div className='schedule-control-section'>
//                     <div className='col-lg-12 control-section'>
//                         <div className='control-wrapper drag-sample-wrapper'>
//                             <div className="schedule-container">
//                                 <ScheduleComponent ref={schedule => this.scheduleObj = schedule} cssClass='block-events' width='100%' height='650px' currentView='TimelineDay' resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)} group={{ enableCompactView: false, resources: ['Employee'] }}>
//                                     <ResourcesDirective>
//                                         <ResourceDirective field='EmployeeId' title='Employees' name='Employee' allowMultiple={true} dataSource={this.employeeData} textField='Text' idField='Id' colorField='Color'>
//                                         </ResourceDirective>
//                                     </ResourcesDirective>
//                                     <ViewsDirective>
//                                         <ViewDirective option='TimelineDay'/>
//                                         <ViewDirective option='TimelineMonth'/>
//                                     </ViewsDirective>
//                                     <Inject services={[TimelineViews, TimelineMonth]}/>
//                                 </ScheduleComponent>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

import { useState, useEffect } from 'react';
import '../styles/Schedule.css';

export default function Schedule() {

    const [daysInMonth, setDaysInMonth] = useState([]);

    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
        setDaysInMonth(days);
    }

    useEffect(() => {
        getDaysInMonth(11, 2020);
    }, [])

    return (
        <div className="container">
            {daysInMonth.map(dayInMonth => (
                <p>{dayInMonth}</p>
            ))}
        </div>
    );
}
