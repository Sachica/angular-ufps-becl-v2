export const routes_path = {
  AUTH: {
    DEFAULT: 'auth',
    LOGIN: 'login',
    REGISTER: 'register',
  },
  HOME: {
    HOME: 'home',
  },
  ACCOUNT: {
    DEFAULT: 'account',
    PROFILE: 'profile',
    SETTINGS: 'settings',
  },
  LOCKERS: {
    DEFAULT: 'lockers',
    LOCKERS: 'lockers',
    LOCKER_DETAIL: 'locker-detail',
  },
  IN_OUT: {
    DEFAULT: 'in-out',
    IN_OUT: 'in-out',
    IN_OUT_DETAIL: 'in-out-detail',
  },
  ADMIN: {
    DEFAULT: 'admin',
    DASHBOARD: 'dashboard',
    USERS: 'users',
    USER_DETAIL: 'user-detail',
    ROLES: 'roles',
    ROLE_DETAIL: 'role-detail',
    PERMISSIONS: 'permissions',
    PERMISSION_DETAIL: 'permission-detail',
  },
  NOT_FOUND: {
    DEFAULT: 'not-found',
    PAGE_404: 'page-404',
    PAGE_500: 'page-500',
  },
};

export const internal_path = {

  /**
   * Home
   */
  HOME_HOME: `${routes_path.HOME.HOME}`,

  /**
   * Authendication
   */
  AUTH_LOGIN: `${routes_path.AUTH.LOGIN}`,
  AUTH_REGISTER: `${routes_path.AUTH.REGISTER}`,

  /**
   * Account
   */
  ACCOUNT_PROFILE: `${routes_path.ACCOUNT.PROFILE}`,
  ACCOUNT_SETTINGS: `${routes_path.ACCOUNT.SETTINGS}`,

  /**
   * Lockers
   */
  LOCKERS_LOCKERS: `${routes_path.LOCKERS.LOCKERS}`,
  LOCKERS_LOCKER_DETAIL: `${routes_path.LOCKERS.LOCKER_DETAIL}`,

  /**
   * In-Out
   */
  IN_OUT_IN_OUT: `${routes_path.IN_OUT.IN_OUT}`,
  IN_OUT_IN_OUT_DETAIL: `${routes_path.IN_OUT.IN_OUT_DETAIL}`,

  /**
   * Admin
   */
  ADMIN_DASHBOARD: `${routes_path.ADMIN.DASHBOARD}`,
  ADMIN_USERS: `${routes_path.ADMIN.USERS}`,
  ADMIN_USER_DETAIL: `${routes_path.ADMIN.USER_DETAIL}`,
  ADMIN_ROLES: `${routes_path.ADMIN.ROLES}`,
  ADMIN_ROLE_DETAIL: `${routes_path.ADMIN.ROLE_DETAIL}`,
  ADMIN_PERMISSIONS: `${routes_path.ADMIN.PERMISSIONS}`,
  ADMIN_PERMISSION_DETAIL: `${routes_path.ADMIN.PERMISSION_DETAIL}`,

  /**
   * Not Found
   */
  NOT_FOUND_PAGE_404: `${routes_path.NOT_FOUND.PAGE_404}`,
  NOT_FOUND_PAGE_500: `${routes_path.NOT_FOUND.PAGE_500}`,

  /**
   * Redirect
   */
  REDIRECT_LOGIN: `${routes_path.AUTH.LOGIN}`,
};

export const internal_route = {

  AUTH_LOGIN: `/${routes_path.AUTH.DEFAULT}/${routes_path.AUTH.LOGIN}`,
  AUTH_REGISTER: `/${routes_path.AUTH.DEFAULT}/${routes_path.AUTH.REGISTER}`,

  HOME_HOME: `/${routes_path.HOME.HOME}`,


  ACCOUNT_PROFILE: `/${routes_path.ACCOUNT.DEFAULT}/${routes_path.ACCOUNT.PROFILE}`,
  ACCOUNT_SETTINGS: `/${routes_path.ACCOUNT.DEFAULT}/${routes_path.ACCOUNT.SETTINGS}`,


  LOCKERS_LOCKERS: `/${routes_path.LOCKERS.DEFAULT}/${routes_path.LOCKERS.LOCKERS}`,
  LOCKERS_LOCKER_DETAIL: `/${routes_path.LOCKERS.DEFAULT}/${routes_path.LOCKERS.LOCKER_DETAIL}`,


  IN_OUT_IN_OUT: `/${routes_path.IN_OUT.DEFAULT}/${routes_path.IN_OUT.IN_OUT}`,
  IN_OUT_IN_OUT_DETAIL: `/${routes_path.IN_OUT.DEFAULT}/${routes_path.IN_OUT.IN_OUT_DETAIL}`,


  ADMIN_DASHBOARD: `/${routes_path.ADMIN.DEFAULT}/${routes_path.ADMIN.DASHBOARD}`,
  ADMIN_USERS: `/${routes_path.ADMIN.DEFAULT}/${routes_path.ADMIN.USERS}`,
  ADMIN_USER_DETAIL: `/${routes_path.ADMIN.DEFAULT}/${routes_path.ADMIN.USER_DETAIL}`,
  ADMIN_ROLES: `/${routes_path.ADMIN.DEFAULT}/${routes_path.ADMIN.ROLES}`,
  ADMIN_ROLE_DETAIL: `/${routes_path.ADMIN.DEFAULT}/${routes_path.ADMIN.ROLE_DETAIL}`,
  ADMIN_PERMISSIONS: `/${routes_path.ADMIN.DEFAULT}/${routes_path.ADMIN.PERMISSIONS}`,
  ADMIN_PERMISSION_DETAIL: `/${routes_path.ADMIN.DEFAULT}/${routes_path.ADMIN.PERMISSION_DETAIL}`,
};
