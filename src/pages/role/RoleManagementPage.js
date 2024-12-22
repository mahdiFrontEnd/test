import React, { useEffect, useState } from 'react';
import { Card, List } from 'antd';
import { useSelector } from 'react-redux';
import { hasPermission } from '../../permission/module';
import ComponentCard from '../../components/ComponentCard';
import CheckPermissionPage from '../../permission/CheckPermissionPage';
import UpdateCreateRole from './UpdateCreateRole';
import User from '../../api/http_request/Model/User/User';
import DeleteBox from '../../components/automation/AutomationFunctionButtons/DeleteBox';
import Permissions from '../../api/http_request/Model/permissions/Permissions';
import TitleBox from '../../components/TitleBox';

const RoleManagementPage = () => {
  const [roleList, setRoleList] = useState([]);
  const [roleListLoading, setRoleListLoading] = useState(false);
  const getAgain = useSelector((state) => state.loadingReducer.getAgain);
  const [permissionList, setPermissionList] = useState([]);

  useEffect(() => {
    if (!permissionList.length) {
      Permissions.request({
        success: ({ result }) => {
          setPermissionList(result);
        },
        final: () => {
        },
      }).permission();
    }
  }, []);

  useEffect(() => {
    setRoleListLoading(true);

    User.request({
      success: ({ result }) => {
        setRoleList(result.data);
      },
      final: () => {
        setRoleListLoading(false);
      },
    }).roleList();
  }, [getAgain]);
  return (
    <>


      <TitleBox title="نقش ها">
        {hasPermission('role', ['create']) && (
          <UpdateCreateRole permissionList={permissionList} />
        )}
      </TitleBox>


      <CheckPermissionPage module="user">
        <ComponentCard>
          <List
            loading={roleListLoading}
            grid={{
              gutter: 16,
              column: 4,
              xs: 2,
              sm: 3,
              md: 3,
            }}
            dataSource={roleList}
            renderItem={(item) => (
              <List.Item>
                <Card title={<p className="text-center">{item.name_fa}</p>}>
                  <div className="d-flex justify-content-end align-items-center gap-2">
                    {hasPermission('role', ['delete']) && (
                      <DeleteBox inDetail address="role" rowData={item} />
                    )}
                    {hasPermission('role', ['edit']) && (
                      <UpdateCreateRole permissionList={permissionList} rowData={item} />
                    )}
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </ComponentCard>
      </CheckPermissionPage>
    </>
  );
};

export default RoleManagementPage;
