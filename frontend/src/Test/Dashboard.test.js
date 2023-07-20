import { render, screen } from '@testing-library/react';
import DashboardCard from '../components/Dashboard_card_component';

test('renders learn react link', () => {
    render(<DashboardCard
        title={"project"}
        total={"15"}
        completed={"10"}
        ongoing={"05"}
    />);
    expect(screen.getByTestId("dashboard-title")).toHaveTextContent("project");
    expect(screen.getByTestId("project-total")).toHaveTextContent("15");
    expect(screen.getByTestId("completed-project")).toHaveTextContent("10");
    expect(screen.getByTestId("ongoing-project")).toHaveTextContent("05");
});
