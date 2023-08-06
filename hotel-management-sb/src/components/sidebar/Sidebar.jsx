/**

Sidebar Component
The Sidebar component displays a navigation menu with links based on the user's role.
It uses the React Router to handle navigation and retrieves the sidebar menu items
from the sidebar routes configuration. The menu items are filtered based on the user's role
and rendered accordingly.
@returns {JSX.Element} The Sidebar component.
*/
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { USER_ROLE } from "../../constants/APP_INFO";
import classNames from "../../helper/classNames";
import { sidebarRoutes } from "../../routes/sidebarUserMenus/sidebarRoutes";
import CopyTranslate from "../common/CopyTranslate";
const Sidebar = () => {
  const { pathname } = useLocation();

  /**

Renders the child navigation items.
@param {Array} nav - The navigation item.
@returns {Array} The rendered child navigation items.
*/
  const renderChildNavs = (nav) =>
    nav.child
      .filter((roleChild) => roleChild.roles.includes(USER_ROLE))
      .map((childNav, index) => (
        <li key={index}>
          <Link to={childNav.link} className="d-block">
            <i className="bi bi-circle"></i>
            <span
              className={
                pathname === childNav.link
                  ? "text-primary  text-capitalize"
                  : " text-capitalize"
              }
            >
              <CopyTranslate>{childNav.title}</CopyTranslate>
            </span>
          </Link>
        </li>
      ));
  /**

Renders the navigation item.

@param {Array} nav - The navigation item.

@param {number} index - The index of the navigation item.

@returns {JSX.Element} The rendered navigation item.
*/
  const renderNav = (nav, index) => {
    if (nav.child) {
      const navId = nav.title.replace(/\s/g, "");

      return (
        <li key={index}>
          <a
            className={classNames(
              "nav-item",
              "nav-link",
              "collapsed",
              "d-flex",
              "align-items-center"
            )}
            data-bs-target={`#${navId}-nav`}
            data-bs-toggle="collapse"
            href="#!"
          >
            <i className="bi bi-menu-button-wide"></i>
            <span className="text-capitalize">
              <CopyTranslate>{nav.title}</CopyTranslate>
            </span>
            <i className={`bi bi-chevron-down ms-auto`}></i>
          </a>
          <ul
            id={`${navId}-nav`}
            className={`nav-content collapse ${
              nav.child.map((childNav) => childNav.link).includes(pathname)
                ? "show"
                : "hide"
            }`}
            data-bs-parent="#sidebar-nav"
          >
            {renderChildNavs(nav)}
          </ul>
        </li>
      );
    } else {
      return (
        <li
          key={index + nav.title}
          className={classNames(
            pathname === nav.link && "text-primary",
            "nav-item"
          )}
        >
          <Link
            className="nav-link collapsed d-flex align-items-center"
            to={nav.link}
          >
            <i className="bi bi-grid"></i>
            <span
              className={classNames(pathname === nav.link && "text-primary")}
            >
              <CopyTranslate>{nav.title}</CopyTranslate>
            </span>
          </Link>
        </li>
      );
    }
  }; /**

Renders the sidebar navigation menu based on the user's role.
@returns {Array} The rendered sidebar navigation menu.
*/
  const renderSidebarNav = () =>
    sidebarRoutes
      .filter((role) => role.roles.includes(USER_ROLE))
      .map(renderNav);
  return (
    <aside id="sidebar" data-testid="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {renderSidebarNav()}
      </ul>
    </aside>
  );
};

export default Sidebar;
