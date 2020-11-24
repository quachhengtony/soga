import { useState, useEffect } from 'react';
import Button from '@atlaskit/button';

import './Hiring.css';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function Hiring() {

    const [jobPosts, setJobPosts] = useState([]);

    const getJobPosts = () => {
        db.collection("jobs").onSnapshot((snapshot) => setJobPosts(snapshot.docs.map((doc) => doc.data())));
    }

    useState(() => {
        getJobPosts()
    })

    return (
        <div className="hiring">
            <div className="hiring_header">
                <h2>Talents</h2>
                <p>Hiring & recruiting talents from all over the world</p>
            </div>
            <div className="hiring_body">
                <div className="job_posts">
                    <div className="job_post">
                        <h2>12 Posts</h2>
                    </div>
                    <div className="job_post">
                        <h2>24 Applied</h2>
                    </div>
                    <div className="job_post">
                        <h2>02 Accepted</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hiring;
