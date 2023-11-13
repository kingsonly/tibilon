import React from 'react';

/**
 * Represents the dashboard card container.
 * @function
 * @param {object} props - stores all the value of the dashboard card.
 * @Description - this component displays the dasboard card which includes title(projects)
 * total(number of total projects), and a list that stores the value of both completed
 * projects and ongoing projects.
 * 
 * to use this component, take out the first <div> and dont forget the closing tag </div>
y * @returns {JSX}
 */

export default function DashboardCard(props) {
    
    const neufunc = (valeu) => {
        alert(valeu)
    }
    const { title, total, completed, ongoing,completedtitle,ongoingtitle } = props;
    return (
        //data test id is the id used to get elements passed as arguments to the test files

        <div onClick={()=>{alert(total)}} className="flex h-[110px] shadow-lg shadow-[#ccc] w-[100%] bg-white pt-[10px] pl-[13px]" data-testid="dashboard-card">
            <div className=' pr-[30px] before:absolute before:ml-[75px] before:mt-[25px] before:h-[60px] before:w-[5px] before:bg-gray-200'>
                <h3 className=' text-xl font-semibold mb-[20px]' data-testid="dashboard-title">{title}</h3>
                <h1 className=' text-4xl font-black text-zinc-500 ' data-testid="project-total">{total}</h1>
            </div>
            <div className=' mt-[30px]'>
                <div className='flex'>
                    <p className='font-medium text-amber-600' data-testid="completed-project">{completed}</p>
                    <p className='ml-[5px] text-[13px] font-normal pt-[3px]'>
                        {completedtitle ? completedtitle:"Completed" }
                        
                        </p>
                </div>
                <div className='flex mt-[10px]'>
                    <p className='font-medium text-amber-600' data-testid="ongoing-project">{ongoing}</p>
                    <p className='ml-[5px] text-[13px] font-normal pt-[3px]'>
                        {ongoingtitle ? ongoingtitle:"Ongoing" }
                        </p>
                </div>
            </div>
        </div>

    );
}
