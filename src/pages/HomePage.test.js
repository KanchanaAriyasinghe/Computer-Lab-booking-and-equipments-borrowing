import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage'; // Make sure you are importing from the correct location
import { BrowserRouter } from 'react-router-dom'; // This is necessary for routing to work in tests

describe('HomePage Sidebar', () => {
  
  // Helper function to render the component
  const renderHomePage = () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  };

  test('renders sidebar and tests the links', () => {
    renderHomePage();

    // Check if the sidebar is in the document
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toBeInTheDocument();

    // Check if all sidebar links are present
    const homeLink = screen.getByText(/Home/i);
    const noticesLink = screen.getByText(/Notices/i);
    const rescheduleLabLink = screen.getByText(/Reschedule Labs/i);
    const bookLabLink = screen.getByText(/Book Labs/i);
    const borrowEquipmentLink = screen.getByText(/Borrow Equipment/i);
    const logoutLink = screen.getByText(/Logout/i);

    // Assert that the links are visible in the sidebar
    expect(homeLink).toBeInTheDocument();
    expect(noticesLink).toBeInTheDocument();
    expect(rescheduleLabLink).toBeInTheDocument();
    expect(bookLabLink).toBeInTheDocument();
    expect(borrowEquipmentLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
  });

  test('checks sidebar links are clickable', () => {
    renderHomePage();

    // Get the links
    const homeLink = screen.getByText(/Home/i);
    const noticesLink = screen.getByText(/Notices/i);
    const rescheduleLabLink = screen.getByText(/Reschedule Labs/i);
    const bookLabLink = screen.getByText(/Book Labs/i);
    const borrowEquipmentLink = screen.getByText(/Borrow Equipment/i);
    const logoutLink = screen.getByText(/Logout/i);

    // Simulate clicks on links
    fireEvent.click(homeLink);
    fireEvent.click(noticesLink);
    fireEvent.click(rescheduleLabLink);
    fireEvent.click(bookLabLink);
    fireEvent.click(borrowEquipmentLink);
    fireEvent.click(logoutLink);

    // Test the result after click (You can use jest mocks or just check if the URL changes)
    // Here we just verify that clicking doesn't throw any error
    expect(homeLink).toBeInTheDocument();
    expect(noticesLink).toBeInTheDocument();
    expect(rescheduleLabLink).toBeInTheDocument();
    expect(bookLabLink).toBeInTheDocument();
    expect(borrowEquipmentLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
  });
});
