
export const hasPermission = (module, permission = []) => {
  const cookiesPermissions = localStorage.getItem('permissions')
    ? JSON.parse(localStorage.getItem('permissions'))
    : [];

  let permissionsList = [];
  let status = false;
  cookiesPermissions.forEach((item) => {
    if (module === item.module) {
      permissionsList = item.permissions;
    }
  });

  // eslint-disable-next-line array-callback-return
  permission.map((x) => {
    if (permissionsList.includes(x)) {
      status = true;
    }
  });
  if (permissionsList.includes('all')) {
    status = true;
  }
  return status;
};



