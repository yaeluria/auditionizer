import React from 'react';
import {observer} from 'mobx-react-lite';
import { withStyles} from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { useAuthStore } from '../useAuthStore';
 
const LoginTooltip = observer((props) => {
  const authStore = useAuthStore();

  const openLoginDialog = () => {
    authStore.openLogin = true;
  }

  return (
    <Tooltip
    color="primary" 
    interactive
    title={
        <React.Fragment>
          You must 
          <Link onClick={openLoginDialog}> log in </Link>
           to use this feature
        </React.Fragment>
      }>
      <span>
        <Button disabled={!authStore.loggedIn} >{props.buttonText}</Button>
      </span>
    </Tooltip>
  );
})
export default LoginTooltip;