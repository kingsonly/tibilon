import { render, screen, wrapper, instance, equal } from '@testing-library/react';
import ProjectCardDisplay from '../components/Dashboard/projectCardDisplayComponent';
import ProjectCardPage from '../pages/projectCardDisplay';
import { BrowserRouter } from 'react-router-dom'


describe('<ProjectCardDisplay />', () => {
    test('ProjectCardDisplay must have src = "Untitled.jpeg"', () => {
        const ProjectObject = [
            {
                id: "1",
                image: "Untitled.jpeg",
                propertydetails: [
                    {
                        id: "1",
                        title: "Project Name :",
                        value: "Mabushi Project"
                    },
                    {
                        id: "2",
                        title: "Project Manager :",
                        value: "Victor Ugwu"
                    },

                    {
                        id: "3",
                        title: "Site Location :",
                        value: "Mabushi Abuja"
                    },

                    {
                        id: "4",
                        title: "Project Desc :",
                        value: "8 Unit of 5 Bedroom Duplex"
                    },
                    {
                        id: "5",
                        title: "Project Owner :",
                        value: "Tibilon Construction LTD"
                    },
                    {
                        id: "6",
                        title: "Actual Start Date :",
                        value: "21/12/2021"
                    },

                    {
                        id: "7",
                        title: "Project Finnish :",
                        value: "23/12/2022"
                    },
                    {
                        id: "8",
                        title: "Duration :",
                        value: "366 Days"
                    },

                    {
                        id: "9",
                        title: "Stage :",
                        value: "Course of Construction"
                    },

                    {
                        id: "10",
                        title: "Status :",
                        value: "Ongoing"
                    },


                ]
            },
        ];

        render(<ProjectCardDisplay
            image={ProjectObject[0].image}
            ObjectList={ProjectObject[0].propertydetails}
        />);

        var objectList = screen.getAllByRole("objectlists")
        expect(objectList).toHaveLength(10);

        ProjectObject[0].propertydetails.map((value, index) => {
            expect(objectList[index]).toHaveTextContent(value.title);
        })

        const Image = screen.getByRole('img');
        expect(Image).toHaveAttribute('src', 'Untitled.jpeg');

    });
});

describe('<ProjectCardPage />', () => {
    test('that there is an active link that works', () => {

        render(
            <BrowserRouter>
                <ProjectCardPage />
            </BrowserRouter>);

        const links = screen.getAllByRole("link");
        expect(links[0].href).toContain("/project/1");
        expect(links[1].href).toContain("/project/2");
        expect(links[2].href).toContain("/project/3");

    });


});
