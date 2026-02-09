import {
  IconBrandGithub,
  IconBrandTwitterFilled,
  IconChartBar,
  IconSettings,
} from "@tabler/icons-react";

export const user = {
  profile: "https://avatars.githubusercontent.com/u/124599?v=4",
  username: "@harxhitbuilds",
  name: "Harshit Parmar",
  email: "parmarharshit441@gmail.com",
  check_time: "18:00",
  timezone: "UTC",
  telegram_chat_id: false,
};

export const sidebarItems = [
  {
    label: "Dashboard",
    href: "/home",
    icon: IconChartBar,
  },
  {
    label: "Settings",
    href: "/home/settings",
    icon: IconSettings,
  },
];

export const topbarConfig = {
  btn: {
    label: "Follow on Twitter",
    href: "https://x.com/harxhitbuilds",
  },
  socialLinks: [
    {
      label: "Github",
      icon: <IconBrandGithub />,
    },
    {
      label: "Twitter",
      icon: <IconBrandTwitterFilled />,
    },
  ],
};
