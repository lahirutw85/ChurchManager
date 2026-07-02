import { createBrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { MembersListPage } from '../features/members/pages/MembersListPage';
import { MemberCreatePage } from '../features/members/pages/MemberCreatePage';
import { MemberDetailsPage } from '../features/members/pages/MemberDetailsPage';
import { EventsListPage } from '../features/events/pages/EventsListPage';
import { EventCreatePage } from '../features/events/pages/EventCreatePage';
import { EventDetailsPage } from '../features/events/pages/EventDetailsPage';
import DashboardPage from '../features/dashboard/pages/DashboardPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />,
            },
            {
                path: 'dashboard',
                element: <DashboardPage />,
            },
            {
                path: 'members',
                element: <MembersListPage />,
            },
            {
                path: 'members/new',
                element: <MemberCreatePage />,
            },
            {
                path: 'members/:id',
                element: <MemberDetailsPage />,
            },
            {
                path: 'events',
                element: <EventsListPage />,
            },
            {
                path: 'events/new',
                element: <EventCreatePage />,
            },
            {
                path: 'events/:id',
                element: <EventDetailsPage />,
            },
            // Placeholders for other sidebar links to avoid crashes
            { path: "households", element: <div>Families Placeholder</div> },
            { path: "groups", element: <div>Groups Placeholder</div> },
            { path: "ministries", element: <div>Ministries Placeholder</div> },
            { path: "attendance", element: <div>Attendance Placeholder</div> },
            { path: "reports", element: <div>Reports Placeholder</div> },
            { path: "settings", element: <div>Settings Placeholder</div> },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
        ],
    },
], {
    basename: '/ChurchManager'
});
