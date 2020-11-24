import { useState, useEffect } from 'react';
import Textfield from '@atlaskit/textfield';

import './JobList.css';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function JobList() {

    const [{ user }] = useStateValue();

    const [jobs, setJobs] = useState([]);

    const getJobs = () => {
        db.collection('jobs').onSnapshot((snapshot) => setJobs(snapshot.docs.map((doc) => doc.data())));
    }

    useEffect(() => {
        getJobs();
    })

    return (
        <div className='joblist'>
            <div className="joblist_sidebar">
                <Textfield className="joblist_content_textfield" name="basic" />
            </div>
            <div className="joblist_content">
                {jobs.map(job => (
                    <div className="joblist_post">
                        <div className="joblist_post_avatar">
                            <img src="https://www.fgvholdings.com/wp-content/uploads/2019/11/placeholder-logo.png" alt="Avatar" className="joblist_post_img"></img>
                        </div>
                        <div className="joblist_post_content">
                            <div><b>{job.title}</b></div>
                            <div>{job.field}</div>
                            <div>{job.user}</div>
                            <div>11:44 23-11-2020</div>
                            <div>6 Applied</div>
                            {user && <div>
                                <div><a href="#">Details</a></div>
                                <div><a href="#">Save</a></div>
                            </div>}
                            {/* <div dangerouslySetInnerHTML={{__html: job.description}} /> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default JobList;