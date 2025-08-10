import LandingPage from './components/LandingPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import { Toaster } from 'react-hot-toast'
import Students from './components/Students'
import Courses from './components/Courses'
import AddStudent from './components/AddStudent'
import AddCourse from './components/AddCourse'
import AddPayment from './components/AddPayment'
import Home from './components/Home'
import CourseDetails from './components/CourseDetails'
import StudentDetails from './components/StudentDetails'
import PaymentDetails from './components/PaymentDetails'
import PamentHistory from './components/PamentHistory'

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} >
            <Route index element={<Home />} />
            <Route path='student' element={<Students />} />
            <Route path='student/:id' element={<StudentDetails />} />
            <Route path='course' element={<Courses />} />
            <Route path='course/:id' element={<CourseDetails />} />
            <Route path='addcourse' element={<AddCourse />} />
            <Route path='addstudent' element={<AddStudent />} />
            <Route path='addpayment' element={<AddPayment />} />
            <Route path='payment' element={<PaymentDetails />} />
            <Route path='history' element={<PamentHistory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
