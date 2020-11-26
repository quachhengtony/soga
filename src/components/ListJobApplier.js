import { useState, useEffect } from 'react';
import db from '../firebase';

export default function ListJobApplier({ jobId }) {

    const [jobAppliers, setJobAppliers] = useState([]);
    
    useEffect(() => {
        db.collection("jobs")
            .doc(jobId)
            .collection("appliers")
            .onSnapshot((snapshot) => setJobAppliers(snapshot.docs.map((doc) => doc.data())));
    })

    return (
        <div className="listjobapplier">
            {jobAppliers.map(jobApplier => (
                <div>{jobApplier.user} | <a href="#">Schedule an interview</a></div>
            ))}
        </div>
    )
}
