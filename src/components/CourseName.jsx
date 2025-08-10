import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import context from '../context/AppContext';
import toast from 'react-hot-toast';

const CourseName = ({ courseId }) => {
  const [name, setName] = useState('');
  const { endpoint } = useContext(context);

  useEffect(() => {
    if (!courseId) return;
  
    if (typeof courseId === 'object' && courseId.title) {
      setName(courseId.title);
      return;
    }

    const id = typeof courseId === 'object' ? courseId._id : courseId;

    const courseDetails = async () => {
      try {
        const res = await axios.get(`${endpoint}/course/coursedetail/${id}`, {
          withCredentials: true,
        });
        setName(res.data.course?.title || 'Unknown Course');
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to fetch course');
        setName('Error loading course');
      }
    };

    courseDetails();
  }, [endpoint, courseId]);

  return <span>{name}</span>;
};

export default CourseName;
