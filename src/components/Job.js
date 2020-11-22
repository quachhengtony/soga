import { useState, useEffect } from 'react';

import './Job.css';
import db from '../firebase';

function Job() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getJobs();
    })

    const getJobs = () => {
        db.collection('jobs').onSnapshot((snapshot) => setJobs(snapshot.docs.map((doc) => doc.data())));
    }

    return (
        <div className='job'>
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
export default Job;