// import Button from '@atlaskit/button';
// import GsuiteIcon from '@atlaskit/icon/glyph/gsuite';

// import './Login.css';
// import { auth, provider } from '../adapters/firebase';
// import { useStateValue } from '../StateProvider';
// import { actionTypes } from '../reducer';
// import { useHistory } from 'react-router-dom';

// function SignUp() {

//     const history = useHistory();
//     const [state, dispatch] = useStateValue();
    
//     const signUp = () => {
//         auth
//             .createUserWithEmailAndPassword(email, password)
//             .then((result) => {
//                 console.log(result);
//                 dispatch({
//                     type: actionTypes.SET_USER,
//                     user: result.user,
//                 });
//             })
//             .catch((error) => {
//                 alert(error.message);
//             });
//         history.push("/account");
//     };

//     return (
//         <div className="login">
//             <div className="login_header">
//                 <h2><code>Soga</code></h2>
//                 <p className="bp3-ui-text">Your remote success</p>
//             </div>
//             <div className="login_body">
//                 <div>
//                     <Button appearance="primary" iconBefore={<GsuiteIcon />} shouldFitContainer onClick={signUp}>Sign Up with Google</Button>
//                 </div>
//                 <div>
//                     <Button shouldFitContainer>Sign Up with Email</Button>
//                 </div>
//                     Already have an account?<Button appearance="link" onClick={login}>Sign In</Button>
//             </div>
//         </div>
//     );
// }

// export default SignUp;