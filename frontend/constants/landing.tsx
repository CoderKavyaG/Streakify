import {
  IconArrowRightCircle,
  IconBellBolt,
  IconBrandGithubFilled,
  IconUserBolt,
} from "@tabler/icons-react";

export const heroConfig = {
  badge: "Never Lose Your GitHub Streak!",
  hero: "Daily GitHub",
  hero2: "Streak Reminders",
  para: "Connect your GitHub account and get notified if you haven't committed by the end of the day. Stay consistent, keep your streak alive, and never miss a day of progress.",

  cta: [
    {
      label: "GitHub",
      href: "https://github.com/harxhitbuilds/streakify-frontend",
      variant: "primary",
      icon: <IconBrandGithubFilled />,
    },
    {
      label: "Get Started",
      href: "/auth",
      variant: "secondary",
      icon: <IconArrowRightCircle />,
    },
  ],
};

export const demoConfig = {
  icon: {
    src: "/icons/github-icon.png",
    height: 70,
    width: 70,
    alt: "GitHub logo",
  },
  heading: "Integrate this morning",
  para: "See how easy it is to connect your GitHub account and start receiving daily streak reminders. Our seamless integration ensures you never miss a day of progress.",
  image: {
    src: "/assets/streakify-hero.png",
    width: 1000,
    height: 1000,
    alt: "Streakify dashboard demo",
  },
  cta: {
    label: "Try the Demo",
    href: "/demo",
    variant: "primary",
  },
};

export const featuresConfig = {
  heading: "Why Streakify?",
  para: "Everything you need to stay consistent on GitHub. Streakify makes it effortless to keep your streak alive and track your progress.",
  features: [
    {
      title: "One-click GitHub Connect",
      description:
        "Authorize with GitHub in seconds and start tracking your streak instantly.",
      icon: <IconUserBolt />,
    },
    {
      title: "Daily Reminder Notifications",
      description:
        "Get notified before the day ends if you haven’t committed yet.",
      icon: <IconBellBolt />,
    },
    {
      title: "Streak Progress Dashboard",
      description:
        "Visualize your current streak and progress with beautiful charts.",
      icon: <IconBrandGithubFilled />,
    },
  ],
};

export const faqConfig = {
  heading: "Frequently Asked Questions",
  para: "Find all your doubts and questions in one place. Still couldn't find what you're looking for?",
  items: [
    {
      question: "How does Streakify connect to my GitHub?",
      answer:
        "Streakify uses OAuth to securely connect to your GitHub account. You simply authorize the app and we handle the rest.",
    },
    {
      question: "Will Streakify access my code?",
      answer:
        "No, Streakify only checks your commit activity to track your streak. Your code and repositories remain private.",
    },
    {
      question: "How do I get daily reminders?",
      answer:
        "Once connected, Streakify will send you notifications if you haven’t committed by the end of the day.",
    },
    {
      question: "Is Streakify free?",
      answer: "Yes, Streakify is completely free for all users.",
    },
  ],
  cta: {
    label: "Contact Us",
    href: "",
  },
};

export const ctaConfig = {
  heading: "Ready to keep your streak alive?",
  cta: { label: "Start Saving Your Streaks", href: "/auth" },
};

export const developersMsg = {
  heading: "Message from Developers",
  para: "Streakify was built to make sure you never lose your streak and always feel encouraged to keep pushing forward. ",
  developers: [
    {
      name: "Harshit",
      twitter: "@harxhitbuilds",
      msg: "We're excited to help you stay consistent and never lose your GitHub streak again! Your feedback helps us improve Streakify every day.",
      avatar:
        "https://avatars.githubusercontent.com/u/179849373?s=400&u=84886ad64dc9716b2d96c4e03a6e5478f7409dab&v=4",
    },
    {
      name: "Kavi",
      twitter: "@goelsahhab",
      msg: "Thank you for trying Streakify! We built this to make your developer journey more fun and motivating. Happy coding!",
      avatar: "https://avatars.githubusercontent.com/u/147709304?v=4",
    },
  ],
};
