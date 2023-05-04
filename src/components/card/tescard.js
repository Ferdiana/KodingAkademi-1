import React, {useContext, useEffect, useState} from 'react';
import {Box, Button, ScrollView, Text} from 'native-base';
import axios from 'axios';
import {API_KEY} from '@env';
import {AuthContext} from '../../controller/AuthContext';

const TestAPI = () => {
  const {user} = useContext(AuthContext);
  const [course, setCourse] = useState([]);

  const loadCourses = async () => {
    try {
      const response = await axios.get(`${API_KEY}/user/courses`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setCourse(response.data.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    if (user) {
      loadCourses();
    }
  });

  return (
    <ScrollView>
      {course
        .filter(item => item.discount_price == null) //ini filter untuk course gak ada diskon
        .map(item => {
          return (
            <Box key={item.id}>
              <Text fontWeight="bold">{item.id}</Text>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>{item.img_url}</Text>
              <Text>{item.price}</Text>
            </Box>
          );
        })}
    </ScrollView>
  );
};

export default TestAPI;
