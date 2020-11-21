import Button from '@atlaskit/button';
import FileIcon from '@atlaskit/icon/glyph/file';
import UploadIcon from '@atlaskit/icon/glyph/upload';

import './WorkDrive.css';

export default function WorkDrive() {
    return (
        <div className="workdrive">
            <div className="workdrive_header">
                <div className="info">
                    <h2>Quách Hêng Tôny's Work drive</h2>
                </div>
                <div className="uploadButton">
                    <Button iconBefore={<FileIcon />} appearance="primary">Upload a file</Button>
                </div>
            </div>
            <div className="workdrive_body">
                <UploadIcon label="Upload" size="xlarge" primaryColor="#0747A6" />
            </div>
        </div>
    )
}

