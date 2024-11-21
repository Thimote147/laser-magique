type MenuItem = {
    icon: React.ReactNode;
    label: string;
};

type SubMenuItem = {
    image?: string;
    icon?: React.ReactNode;
    title: string;
    description?: string;
    tag?: string;
    link?: string;
};

type MenuItemContent = {
    items: SubMenuItem[];
};

export type { MenuItem, SubMenuItem, MenuItemContent };