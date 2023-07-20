import React from 'react';

/**
 * Represents the recent activity card container.
 * @param {object} props - stores all the value of the recent activity card component.
 * @Description - this component displays the recent activity card  which includes a date,
 * all the activities of that particular date, and the time each activity was logged.
 * @returns {JSX}
 */

export default function RecentActivities(props) {


    const { date, activities } = props;
    return (
        //data test id is the id used to get elements passed as arguments to the test files
        <div className='flex justify-between w-[400px] bg-[#fff] p-[10px] h-[full] mb-[5px]'>
            <div className=''>
                <h1 className='font-semibold text-[15px]'>{date}</h1>
            </div>
            <div className='mt-[-7px]' data-testid="arrayList">
                {activities.map((items, keys) => (
                    <div className='flex justify-between leading-10  w-[300px] text-base font-[400]' role="recent-activity-lists" key={items.id}>
                        <div className='text-left'>{items.title}</div>
                        <div className='font-[300]'> {items.created_at} </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
