import { MenuItem } from "./types";

const menuItems: MenuItem[] = [
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
            </svg>
        ),
        label: "Accueil",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                />
            </svg>
        ),
        label: "Activités",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <rect x="2" y="6" width="20" height="12" rx="2" ry="2" strokeWidth={1.5} />
                <text
                    x="12"
                    y="16"
                    textAnchor="middle"
                    fontSize="10"
                    fill="currentColor"
                >
                    €
                </text>
            </svg>
        ),
        label: "Formules et Tarifs",
    },
    {
        icon: (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
        >
            <rect x="2" y="6" width="20" height="14" rx="2" ry="2" strokeWidth={1.5} />
            <circle cx="12" cy="13" r="4" strokeWidth={1.5} />
            <rect x="7" y="4" width="10" height="2" rx="1" strokeWidth={1.5} />
        </svg>
        ),
        label: "Photos",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={1.5} />
                <line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth={1.5} />
                <line x1="7" y1="4" x2="7" y2="2" stroke="currentColor" strokeWidth={1.5} />
                <line x1="17" y1="4" x2="17" y2="2" stroke="currentColor" strokeWidth={1.5} />
                <text x="12" y="19" textAnchor="middle" fontSize="10" fill="currentColor">15</text>
            </svg>
        ),
        label: "Réservations",
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
            >
                <rect
                    x="2.25"
                    y="4.5"
                    width="19.5"
                    height="15"
                    rx="2.25"
                    ry="2.25"
                    strokeWidth={1.5}
                />
                <path
                    d="M3 6l9 6 9-6"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ),
        label: "Contact",
    },
];

export default menuItems;
