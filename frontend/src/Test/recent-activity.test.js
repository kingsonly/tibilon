import { render, screen } from '@testing-library/react';
import RecentActivities from '../components/RecentActivityCard/RecentActivities';
import RecentActivityPage from '../pages/recentActivityCard';



describe('RecentActivities />', () => {
    test('RecentActivities must have a mapped object', () => {
        // const ActivityList = [
        //     {
        //         id: "1",
        //         date: "19th Oct",
        //         activities: [
        //             {
        //                 id: "1",
        //                 activity: "A new proposal was submitted",
        //                 time: "02:30pm"
        //             },
        //             {
        //                 id: "2",
        //                 activity: "A new proposal was submitted",
        //                 time: "02:30pm"
        //             },
        //             {
        //                 id: "3",
        //                 activity: "A new proposal was submitted",
        //                 time: "02:30pm"
        //             },
        //             {
        //                 id: "4",
        //                 activity: "A new proposal was submitted",
        //                 time: "02:30pm"
        //             },
        //         ]
        //     },
        //     {
        //         id: "2",
        //         date: "19th Oct",
        //         activities: [
        //             {
        //                 id: "1",
        //                 activity: "A new proposal was submitted",
        //                 time: "02:30pm"
        //             },
        //             {
        //                 id: "2",
        //                 activity: "A new proposal was submitted",
        //                 time: "02:30pm"
        //             },
        //             {
        //                 id: "3",
        //                 activity: "A new proposal was submitted",
        //                 time: "02:30pm"
        //             },
        //             {
        //                 id: "4",
        //                 activity: "A new proposal was submitted",
        //                 time: "02:30pm"
        //             },
        //         ]
        //     }
        // ]

        // render(<RecentActivities
        //     date={ActivityList[0].date}
        //     activities={ActivityList[0].activities}
        // />);

        // var arrayList = screen.getAllByRole("recent-activity-lists")
        // expect(arrayList).toHaveLength(4);

        // ActivityList[0].activities.map((value, index) => {
        //     expect(arrayList[index]).toHaveTextContent(value.activity);
        //})
    });
});

// describe('RecentActivityPage />', () => {
//     test('that an array of objects is mapped properly', () => {

//         render(
//             <RecentActivityPage />
//         );

//         var arrayList = screen.getAllByRole("activity-lists")
//         expect(arrayList).toHaveLength(2);

//     });
// });


