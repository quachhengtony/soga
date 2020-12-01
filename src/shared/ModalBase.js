// import { useState } from 'react';
// import Modal, { ModalTransition } from '@atlaskit/modal-dialog';
// import Textfield from '@atlaskit/textfield';

// export default function ModalBase({ isOpen, textfieldLabelText, primaryActionText, secondaryActionText, headingText }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const open = () => setIsOpen(true);
//     const close = () => setIsOpen(false);

//     const CustomBody = () => (
//         <div style={{ margin: "0 25px 0" }}>
//             <label htmlFor="textfield">{textfieldLabelText}</label>
//             <Textfield name="textfield" onFocus />
//         </div>
//     )
//     return (
//         <div>
//             <ModalTransition>
//                 {isOpen && (
//                 <Modal
//                     actions={[
//                     { text: {primaryActionText}, onClick: null },
//                     { text: {secondaryActionText}, onClick: null },
//                     ]}
//                     components={{Body: CustomBody}}
//                     onClose={null}
//                     heading={headingText}>
//                 </Modal>
//                 )}
//             </ModalTransition>
//         </div>
//     )
// }