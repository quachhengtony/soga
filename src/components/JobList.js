import { useState, useEffect } from 'react';

import './JobList.css';
import db from '../firebase';

function JobList() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getJobs();
    })

    const getJobs = () => {
        db.collection('jobs').onSnapshot((snapshot) => setJobs(snapshot.docs.map((doc) => doc.data())));
    }

    return (
        <div className='joblist'>
            {jobs.map(job => (
                <div className="job_post">
                    <p>{job.title}</p>
                    <p>{job.field}</p>
                    <p>{job.user}</p>
                    <div dangerouslySetInnerHTML={{__html: job.description}} />
                </div>
            ))}
        </div>
    );
}
export default JobList;