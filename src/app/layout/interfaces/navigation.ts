export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}




export const NavigationItems: NavigationItem[] = [
  {
    id: 'sales',
    title: 'Dashboard',
    type: 'group',
    icon: 'dashboard',
  },
  {
    id: 'sales',
    title: 'Dashboard',
    type: 'group',
    icon: 'dashboard',
    children: [
      {
        id: 'sales-collapse',
        title: 'Dashboard',
        type: 'collapse',
        icon: 'dashboard', // collapse icon
        children: [
          {
            id: 'create-sales',
            title: 'Sales Dashboard',
            type: 'item',
            classes: 'nav-item',
            url: '/Sales/dashboard',
            icon: 'bar-chart', // create sales icon
            breadcrumbs: false
          },
        ]
      }
    ]
  },
  {
    id: 'sales',
    title: 'Sales',
    type: 'group',
    icon: 'icon-sales', // sales icon
    children: [
      {
        id: 'sales-collapse',
        title: 'Sales',
        type: 'collapse',
        icon: 'shopping-cart', // collapse icon
        children: [
          {
            id: 'create-sales',
            title: 'Create Sales',
            type: 'item',
            classes: 'nav-item',
            url: '/Sales/Created',
            icon: 'plus', // create sales icon
            breadcrumbs: false
          },
          {
            id: 'sales-dashboard',
            title: 'List',
            type: 'item',
            classes: 'nav-item',
            url: '/Sales/List',
            icon: 'unordered-list', // create sales icon
            breadcrumbs: false
          },
        ]
      }
    ]
  },
  {
    id: 'sales',
    title: 'Order',
    type: 'group',
    icon: 'icon-sales', // sales icon
    children: [
      {
        id: 'sales-collapse',
        title: 'Order',
        type: 'collapse',
        icon: 'shopping-cart', // collapse icon
        children: [
          {
            id: 'create-sales',
            title: 'Create Order',
            type: 'item',
            classes: 'nav-item',
            url: '/Order/Created',
            icon: 'plus', // create sales icon
            breadcrumbs: false
          },
          {
            id: 'sales-dashboard',
            title: 'List Order',
            type: 'item',
            classes: 'nav-item',
            url: '/Order/List',
            icon: 'solution', // create sales icon
            breadcrumbs: false
          },
        ]
      }
    ]
  },
  {
    id: 'sales',
    title: 'Order',
    type: 'group',
    icon: 'icon-sales', // sales icon
    children: [
      {
        id: 'sales-collapse',
        title: 'Item',
        type: 'collapse',
        icon: 'database', // collapse icon
        children: [
          {
            id: 'create-sales',
            title: 'Create Item',
            type: 'item',
            classes: 'nav-item',
            url: '/Item/Created',
            icon: 'plus', // create sales icon
            breadcrumbs: false
          },
          {
            id: 'sales-dashboard',
            title: 'List Item',
            type: 'item',
            classes: 'nav-item',
            url: '/Item/List',
            icon: 'tags', // create sales icon
            breadcrumbs: false
          },
        ]
      }
    ]
  },
];






