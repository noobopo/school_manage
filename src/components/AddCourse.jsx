import React, { useContext, useEffect, useState } from 'react';
import context from '../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [loading, setLoading] = useState(false); 
  
  const auth = useContext(context);
  const navigate = useNavigate();
  const location = useLocation();

  const toISODate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return ''; 
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (location.state?.course) {
      const c = location.state.course;
      setIsUpdate(true);
      setCourseId(c._id);
      setTitle(c.title);
      setDescription(c.description);
      setPrice(c.price);
      setStartDate(toISODate(c.startDate));
      setEndDate(toISODate(c.endDate));
      setPreviewImage(c.imageUrl || null);
      setImage(null);
    }
  }, []);

  const handleImageChange = (file) => {
    setImage(file);
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCourse = async (e) => {
    e.preventDefault();
    setLoading(true); 

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('image', image);

    let res;
    if (isUpdate) {
      res = await auth.updateCourse(courseId, formData);
      if (res) {
        navigate('/dashboard/course');
      }
    } else {
      res = await auth.addCourse(formData);
      if (res) {
        navigate('/dashboard/course');
      }
    }

    setLoading(false); 
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600"></div>
        <span className="ml-3">{isUpdate ? 'Updating course...' : 'Adding course...'}</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-3 md:py-4 bg-white rounded-xl md:shadow-md mt-1 md:mt-3">
      <h1 className="text-2xl font-semibold text-gray-800 mb-2 md:mb-4">
        {isUpdate ? 'Update Course' : 'Add New Course'}
      </h1>

      <form onSubmit={handleCourse} className="grid grid-cols-1 gap-2 md:gap-5">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter course title"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Enter course price"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="2"
            placeholder="Enter course description"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          ></textarea>
        </div>

        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            type="date"
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            type="date"
            min={startDate}
            className="w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          {previewImage && (
            <img
              src={previewImage}
              alt="Course Preview"
              className="w-36 h-20 object-cover mb-2 rounded"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files[0])}
            className="w-full border border-gray-300 rounded-md p-2"
            required={!isUpdate}
          />
        </div>

        {/* Submit */}
        <div className="text-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 mb-5 md:mb-0 rounded-md hover:bg-blue-700 transition"
          >
            {isUpdate ? 'Update Course' : 'Add Course'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
