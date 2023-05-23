import React, {useContext} from 'react';
import QRCode from 'react-native-qrcode-svg';
import {AuthContext} from '../../controller/AuthContext';

const QRComponent = ({size}) => {
  const {user} = useContext(AuthContext);

  return (
    <QRCode
      value={user.qr_code}
      size={size}
      color="black"
      backgroundColor="white"
    />
  );
};

export default QRComponent;
