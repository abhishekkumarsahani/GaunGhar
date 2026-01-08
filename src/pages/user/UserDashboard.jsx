import { Card, Typography } from "@mui/material";
import UserLayout from "../../components/user/UserLayout";

const UserDashboard = () => {
  return (
    <UserLayout>
      <Card sx={{ p: 3 }}>
        <Typography variant="h5" fontWeight={600}>
          Welcome to User Dashboard
        </Typography>
        <Typography color="text.secondary">
          View your activities and account summary
        </Typography>
      </Card>
    </UserLayout>
  );
};

export default UserDashboard;
