import { CodeXml, Link } from "lucide-react";
import { MenuItemContent } from "./types";

const menuItemsContent: MenuItemContent[] = [
    {
        items: [],
    },
    {
        items: [
            {
                title: "Laser Game",
                tag: "Maximum 20 personnes",
                icon: <CodeXml size={20} />,
                link: "/#about-lg",
            },
            {
                title: "Réalité Virtuelle",
                tag: "Maximum 8 personnes",
                icon: <CodeXml size={20} />,
                link: "/#about-vr",
            },
            {
                title: "Cyber Trike",
                tag: "Maximum 6 personnes",
                icon: <CodeXml size={20} />,
            },
        ],
    },
    {
        items: [
            {
                title: "Laser Game",
                tag: "8€ par personne",
                icon: <Link size={20} />,
            },
            {
                title: "Réalité Virtuelle",
                tag: "10€ par personne",
                icon: <Link size={20} />,
            },
            {
                title: "Cyber Trike",
                tag: "20€ par personne*",
                icon: <Link size={20} />,
            },
            {
                title: "Anniversaire Laser Game",
                tag: "200€ pour 10 personnes*",
                icon: <Link size={20} />,
            },
            {
                title: "Anniversaire Trio Pack",
                tag: "280€ pour 8 personnes*",
                icon: <Link size={20} />,
            },
            {
                title: "Familly Trio Pack",
                tag: "35€ par personne*",
                icon: <Link size={20} />,
            },
            {
                title: "Salle pour événement",
                tag: "Prix sur demande",
                icon: <Link size={20} />,
            }
        ],
    },
    {
        items: [],
    },
    {
        items: [
            {
                title: "Votre invitation",
                icon: <Link size={20} />,
            },
        ],
    },
    {
        items: [],
    }
];

export default menuItemsContent;