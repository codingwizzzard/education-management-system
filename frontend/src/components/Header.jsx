import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userRole = localStorage.getItem('role');
  const menuItems = [
    { path: '/', label: 'Home', roles: ['Admin'] },
    { path: '/add-courses', label: 'Add Courses', roles: ['Admin'] },
    { path: '/view-courses', label: 'View Courses', roles: ['Admin', 'Student', 'Teacher'] },
    { path: '/my-courses', label: 'My Enrollments', roles: ['Student'] },
    { path: '/enroll-students', label: 'Enroll Student', roles: ['Admin'] },
    { path: '/view-grades', label: 'View Grades', roles: ['Student'] },
    { path: '/grade-students/:courseId', label: 'Give Grades', roles: ['Teacher'] },
    { path: '/teacher-dashboard', label: 'Teacher Dashboard', roles: ['Teacher'] },
    { path: '/create-quiz', label: 'Student Quiz', roles: ['Teacher'] },
    { path: '/available-quiz', label: 'available Quiz', roles: ['Student'] },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };
  return (
    <>
      <nav className="pc-sidebar">
        <div className="navbar-wrapper">

          <div className="navbar-content h-[calc(100vh_-_74px)] py-2.5">
            <ul className="pc-navbar">
              {menuItems
                .filter((item) => item.roles.includes(userRole))
                .map((item, index) => (
                  <li
                    key={index}
                    className={`pc-item ${location.pathname === item.path ? 'active' : ''}`}
                  >
                    <a onClick={() => navigate(item.path)} className="pc-link">
                      <span className="pc-mtext">{item.label}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>
      <header className="pc-header">
        <div className="header-wrapper flex max-sm:px-[15px] px-[25px] grow">
          <div className="me-auto pc-mob-drp">
            <ul className="inline-flex *:min-h-header-height *:inline-flex *:items-center">
              <li className="pc-h-item pc-sidebar-popup lg:hidden">
                <a href="#" className="pc-head-link ltr:!ml-0 rtl:!mr-0" id="mobile-collapse">
                  <i className="ti ti-menu-2 text-2xl leading-none" />
                </a>
              </li>
            </ul>
          </div>

          <div className="ms-auto">
            <ul className="inline-flex *:min-h-header-height *:inline-flex *:items-center">
              <li>
                <div className="grid">
                  <button className="btn btn-primary flex items-center justify-center" onClick={handleLogout}>
                    <svg className="pc-icon me-2 w-[22px] h-[22px]">
                      <use xlinkHref="#custom-logout-1-outline" />
                    </svg>
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
