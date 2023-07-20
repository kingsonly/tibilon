import { render, screen } from '@testing-library/react';
// import DashboardCard from '../components/Dashboard_card_component';
import DashboardCard from '../components/Dashboard/Dashboard_card_component';

test('renders learn react link', () => {
    render(<DashboardCard
        title={"project"}
        total={"15"}
        completed={"10"}
        ongoing={"05"}
    />);
    expect(screen.getByTestId("dashboard-card-title")).toHaveTextContent("project");
    expect(screen.getByTestId("Dashboard-card-project-total")).toHaveTextContent("15");
    expect(screen.getByTestId("Dashboard-card-completed-project")).toHaveTextContent("10");
    expect(screen.getByTestId("Dashboard-card-ongoing-project")).toHaveTextContent("05");
});
