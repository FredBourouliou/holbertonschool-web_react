import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import App from './App';

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: '<strong>Urgent requirement</strong> - complete by EOD' },
];

const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

beforeEach(() => {
  mockAxios.get.mockImplementation((url) => {
    if (url === '/notifications.json') {
      return Promise.resolve({ data: mockNotifications });
    }
    if (url === '/courses.json') {
      return Promise.resolve({ data: mockCourses });
    }
    return Promise.reject(new Error(`Unexpected URL: ${url}`));
  });
});

afterEach(() => {
  mockAxios.reset();
});

async function renderApp() {
  render(<App />);
  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json');
  });
}

test('renders h1 with text School dashboard', async () => {
  await renderApp();
  const heading = screen.getByRole('heading', {
    name: /school dashboard/i,
  });
  expect(heading).toBeInTheDocument();
});

test('renders correct text in App-body and App-footer paragraphs', async () => {
  await renderApp();
  expect(
    screen.getByText(/login to access the full dashboard/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/copyright \d{4} - holberton school/i)
  ).toBeInTheDocument();
});

test('renders an img element with holberton logo alt text', async () => {
  await renderApp();
  const img = screen.getByAltText(/holberton logo/i);
  expect(img).toBeInTheDocument();
});

test('renders 2 input elements for email and password', async () => {
  await renderApp();
  const emailInput = screen.getByRole('textbox', { name: /email/i });
  expect(emailInput).toBeInTheDocument();
  const passwordInput = screen.getByLabelText(/password/i);
  expect(passwordInput).toBeInTheDocument();
});

test('renders 2 label elements with text Email and Password', async () => {
  await renderApp();
  expect(screen.getByText(/email/i)).toBeInTheDocument();
  expect(screen.getByText(/password/i)).toBeInTheDocument();
});

test('renders a button with the text OK', async () => {
  await renderApp();
  const button = screen.getByRole('button', { name: /ok/i });
  expect(button).toBeInTheDocument();
});

test('by default, renders the Login form (user is not logged in)', async () => {
  await renderApp();
  expect(
    screen.getByText(/login to access the full dashboard/i)
  ).toBeInTheDocument();
  expect(screen.queryByText(/available courses/i)).not.toBeInTheDocument();
});

test('notifications data is fetched when App loads initially', async () => {
  await renderApp();
  expect(mockAxios.get).toHaveBeenCalledWith('/notifications.json');
  fireEvent.click(screen.getByText(/your notifications/i));
  await waitFor(() => {
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
  expect(screen.getByText(/new course available/i)).toBeInTheDocument();
  expect(screen.getByText(/new resume available/i)).toBeInTheDocument();
  expect(screen.getByText(/urgent requirement/i)).toBeInTheDocument();
});

test('courses data is fetched when user state changes to logged in', async () => {
  const user = userEvent.setup();
  await renderApp();

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'longpassword');

  const submitButton = screen.getByRole('button', { name: /ok/i });
  await user.click(submitButton);

  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenCalledWith('/courses.json');
  });

  expect(screen.getByText(/available courses/i)).toBeInTheDocument();
});

test('after logging in, renders CourseList instead of Login', async () => {
  const user = userEvent.setup();
  await renderApp();

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'longpassword');

  const submitButton = screen.getByRole('button', { name: /ok/i });
  await user.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/available courses/i)).toBeInTheDocument();
  });
  expect(
    screen.queryByText(/login to access the full dashboard/i)
  ).not.toBeInTheDocument();
});

test('after logging in then logging out, renders Login form again', async () => {
  const user = userEvent.setup();
  await renderApp();

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'longpassword');

  const submitButton = screen.getByRole('button', { name: /ok/i });
  await user.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/available courses/i)).toBeInTheDocument();
  });

  await user.click(screen.getByText(/logout/i));

  expect(
    screen.getByText(/login to access the full dashboard/i)
  ).toBeInTheDocument();
  expect(screen.queryByText(/available courses/i)).not.toBeInTheDocument();
});

test('default state: displayDrawer is false, notification drawer is hidden', async () => {
  await renderApp();
  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
  expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
});

test('handleDisplayDrawer: clicking "Your notifications" opens the drawer', async () => {
  await renderApp();
  expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getByText(/your notifications/i));
  await waitFor(() => {
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });
  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});

test('handleHideDrawer: clicking close button hides the drawer', async () => {
  await renderApp();
  fireEvent.click(screen.getByText(/your notifications/i));
  await waitFor(() => {
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(screen.queryByText(/here is the list of notifications/i)).not.toBeInTheDocument();
});

test('clicking a notification removes it and logs the message', async () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  await renderApp();

  fireEvent.click(screen.getByText(/your notifications/i));
  await waitFor(() => {
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  fireEvent.click(screen.getByText(/new course available/i));

  expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.queryByText(/new course available/i)).not.toBeInTheDocument();

  consoleSpy.mockRestore();
});

test('logIn updates user state with email, password, and isLoggedIn', async () => {
  const user = userEvent.setup();
  await renderApp();

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'longpassword');

  const submitButton = screen.getByRole('button', { name: /ok/i });
  await user.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/available courses/i)).toBeInTheDocument();
  });
  expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
});

test('logOut resets user state: isLoggedIn false, email and password cleared', async () => {
  const user = userEvent.setup();
  await renderApp();

  const emailInput = screen.getByRole('textbox', { name: /email/i });
  const passwordInput = screen.getByLabelText(/password/i);

  await user.type(emailInput, 'test@example.com');
  await user.type(passwordInput, 'longpassword');

  const submitButton = screen.getByRole('button', { name: /ok/i });
  await user.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  await user.click(screen.getByText(/logout/i));

  expect(screen.getByText(/login to access the full dashboard/i)).toBeInTheDocument();
  expect(screen.queryByText(/test@example.com/i)).not.toBeInTheDocument();
});
