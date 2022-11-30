import { ISidebar } from "@data/interfaces";
import { ROLE } from "@data/enums/role.enum";

export const MENU_ITEMS: ISidebar[] = [
    {
        title: "Principal",
        children: [
            {
                title: "Dashboard",
                icon: "fas fa-home",
                link: "/admin/dashboard",
                roles: [ROLE.ADMIN],
                expanded: false,
            },
        ],
    },
    {
        title: "Modulos",
        children: [
            {
                title: 'Lockers',
                icon: 'fas fa-columns',
                roles: [ROLE.ADMIN],
                expanded: true,
                children: [
                    {
                        title: 'Gestionar lockers',
                        link: '/lockers/manage-lockers',
                        roles: [ROLE.ADMIN]
                    },
                    {
                        title: 'Lockers',
                        link: '/lockers/lockers',
                        roles: [ROLE.LOCKER]
                    },
                ],
            },
            {
                title: 'Carnets',
                icon: 'fas fa-columns',
                roles: [ROLE.QR_ENTRANCE, ROLE.QR_EXIT],
                expanded: false,
                children: [
                    {
                        title: 'Entrada',
                        link: '/in-out/qr-input',
                        roles: [ROLE.QR_ENTRANCE]
                    },
                    {
                        title: 'Salida',
                        link: '/in-out/qr-output',
                        roles: [ROLE.QR_EXIT]
                    },
                ],
            },
            {
                title: 'Usuarios',
                icon: 'fas fa-users',
                link: '/users/users-list',
                expanded: false,
                roles: [ROLE.ADMIN]
            }
        ]
    }
];