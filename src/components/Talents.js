import { useState, useEffect } from 'react';
import Button from '@atlaskit/button';

import './Talents.css';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import ListJobApplier from './ListJobApplier';

function Talents() {

    const [{ user }] = useStateValue();

    const [jobPosts, setJobPosts] = useState([]);

    const getJobPosts = () => {
        db.collection("jobs")
            .where("email", "==", user.email)
            .onSnapshot((snapshot) => setJobPosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }))));
    }


    useState(() => {
        getJobPosts();
    })

    return (
        <div className="hiring">
            <div className="hiring_header">
                <h2>Talents</h2>
                <p>Hiring & recruiting talents from all over the world</p>
            </div>
            <div className="hiring_body">
                <div className="stats">
                    <div className="stats_card">
                        <h2>12 Posts</h2>
                    </div>
                    <div className="stats_card">
                        <h2>24 Applied</h2>
                    </div>
                    <div className="stats_card">
                        <h2>02 Accepted</h2>
                    </div>
                </div>
                <div className="posts">
                    {jobPosts.map(jobPost => (
                        <div className="post_card">
                            <div>{jobPost.data.title} | {jobPost.data.field} | {jobPost.data.applied}</div>
                            <ListJobApplier jobId={jobPost.id} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Talents;
