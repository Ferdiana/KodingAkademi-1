import React, {useContext} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {AuthContext} from '../../controller/AuthContext';

const QRComponent = ({size}) => {
  const {user} = useContext(AuthContext);

  return (
    <QRCode
      value={JSON.stringify(user.full_name)}
      size={size}
      color="black"
      backgroundColor="white"
    />
  );
};

export default QRComponent;
