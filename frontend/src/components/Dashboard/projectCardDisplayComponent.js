import React from 'react';

/**
 * Represents the project card display container.
 * @function
 * @param {object} props - stores all the value of the ProjectCardDisplay.
 * @Description - this component displays the project card which includes an image of the
 * project and all the project details. it also serves as a link to a page that shows more
 * more details on the project 
 * @returns {JSX}
 */

export default function ProjectCardDisplay(props) {


    const { image, ObjectList } = props;
    return (
        //data test id is the id used to get elements passed as arguments to the test files
        <div className='flex justify-end w-[100%]'>
            <div className='w-[350px]'>
                <img className='w-[100%]' data-testid="project-image" src={image} />
            </div>
            <div className='ml-[40px] mt-[-10px] grid grid-cols-2 w-[800px]' data-testid="objectlist">
                {ObjectList.map((items, keys) => (
                    <div className='flex leading-[40px] w-[100%]' role="objectlists" key={items.id}>
                        <div className='font-bold'>{items.title}</div>
                        <div className='ml-[10px]'>{items.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
