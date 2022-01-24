import { Icon } from "@iconify/react";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";

export default [
  {
    to: "/",
    text: "",
    icon: <CottageOutlinedIcon sx={{ color: "white" }} />,
  },
  {
    to: "/schedule",
    text: "",
    icon: <TodayOutlinedIcon sx={{ color: "white" }} />,
  },
  {
    to: "/dashboard",
    text: "",
    icon: <DashboardOutlinedIcon sx={{ color: "white" }} />,
  },
  {
    to: "/projects",
    text: "",
    icon: <FormatListBulletedOutlinedIcon sx={{ color: "white" }} />,
  },
];

const logo = {
  to: "/",
  text: "",
  icon: <Icon icon="logos:apiary" width="45px" height="45px" />,
};

export { logo };
