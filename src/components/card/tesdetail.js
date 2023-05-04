import React, {useContext, useEffect, useState, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {API_KEY} from '../config';
import {AuthContext} from '../context/AuthContext';
import {Text, Button, Heading} from 'native-base';

const DetailCourse = () => {
  const {id} = useParams();
  const {user} = useContext(AuthContext);
  const [detailCourse, setDetailCourse] = useState(null);

  const loadDetailCourse = useCallback(async () => {
    try {
      const response = await axios.get(`${API_KEY}/user/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setDetailCourse(response.data.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }, [id, user.accessToken]);

  useEffect(() => {
    loadDetailCourse();
  }, [loadDetailCourse]);

  //   if (!detailCourse) {
  //     return <Spinner />;
  //   }

  return (
    <>
      <Heading>{detailCourse.name}</Heading>
      <Text>{detailCourse.description}</Text>
      <Text>{detailCourse.img_url}</Text>
      <Text>{detailCourse.price}</Text>
      {detailCourse.discount_price && (
        <Text>{detailCourse.discount_price}</Text>
      )}
      <Button>Buy Now</Button>
    </>
  );
};

export default DetailCourse;
