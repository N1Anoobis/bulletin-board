import { connect } from 'react-redux';
import LoginButton from './LoginButton';
import { setGlobalStatus } from '../../redux/statusRedux';


const mapDispatchToProps = dispatch => ({
  setStatus: globalStatus => dispatch(setGlobalStatus(globalStatus)),
});

export default connect(null,mapDispatchToProps)(LoginButton);
