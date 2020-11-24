import { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@atlaskit/button';
import Textfield from '@atlaskit/textfield';
import LikeIcon from '@atlaskit/icon/glyph/like';

import './JobPost.css';
import db from '../firebase';
import { useStateValue } from '../StateProvider';

function JobPost() {

    const [jobTitle, setJobTitle] = useState();
    const [jobField, setJobField] = useState();
    const [editorData, setEditorData] = useState();

    const [{ user }] = useStateValue();

    const postJob = () => {
        db.collection("jobs").add({
            title: jobTitle,
            field: jobField,
            description: editorData,
            user: user.displayName,
            email: user.email
        })
        alert('Job posted successfully!');
    }

    return (
        <div className="jobpost">
            <div className="jobpost_header">
                <h2>Hiring talents from all over the world</h2>
            </div>
            <div className="jobpost_body">
                <div className="input_container">
                    <h4>Title:</h4>
                    <Textfield value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="textfield" name="basic" />
                </div>
                <div className="input_container">
                    <h4>Field:</h4>
                    <Textfield value={jobField} onChange={e => setJobField(e.target.value)} className="textfield" name="basic" />
                </div>
                <h4>Description:</h4>
                <div className="editor_container">
                    <CKEditor
                        editor={ ClassicEditor }
                        className="ck-editor"
                        data=""
                        onReady={ editor => {
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setEditorData(data);
                            // console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            // console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            // console.log( 'Focus.', editor );
                        } }
                    />
                </div>
            </div>
            <div className="jobpost_footer">
                <Button iconAfter={<LikeIcon />} onClick={postJob} appearance="primary">Looks good!</Button>
            </div>
        </div>
    )
}

export default JobPost;
