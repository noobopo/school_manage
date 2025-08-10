import React, { useContext } from 'react'
import context from '../context/AppContext'

const LatestCourse = () => {
    const auth = useContext(context)
    return (
        <div className=' flex flex-wrap gap-4'>
            {
                auth.latestCourse.map((course) =>
                    <div  className=' w-2xs'>
                        <img src={course.imageUrl} alt="" />
                        <div>
                            <h2>{course.title}</h2>
                            <h2>{course.price}</h2>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default LatestCourse